import { UserContext } from "../context/user-context";
import { useContext, useEffect, useState } from "react";

const Eye = () => {
  const { isCorrect, setIsCorrect } = useContext(UserContext);
  const [flash, setFlash] = useState(false);
  const [timeoutCount, setTimeoutCount] = useState(0);

  useEffect(() => {
    if (isCorrect !== null) {
      const timeout = setTimeout(() => {
        setFlash((prevFlash) => !prevFlash);
        setTimeoutCount((prevCount) => prevCount + 1);
      }, 250);

      if (timeoutCount === 6) {
        setIsCorrect(null);
        setTimeoutCount(0);
      }

      return () => clearTimeout(timeout);
    }
  }, [isCorrect, timeoutCount]);

  return (
    <div
      className={`${
        flash && isCorrect
          ? "before:border-[#3E8F55]"
          : flash && isCorrect == false
          ? "before:border-[#CC3F0C]"
          : "before:border-[#2B35F2]"
      } eyes relative w-[1.8rem] h-[1.8rem] rounded-full bg-[#FEFEFE]`}
    />
  );
};

const Eyes = () => {
  useEffect(() => {
    const eyeball = (event) => {
      const eyes = document.querySelectorAll(".eyes");
      eyes.forEach((eye) => {
        let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
        let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rotate = radian * (180 / Math.PI) * -1 + 270;
        eye.style.transform = `rotate(${rotate}deg)`;
      });
    };

    document.body.addEventListener("mousemove", eyeball);

    return () => {
      document.body.removeEventListener("mousemove", eyeball);
    };
  }, []);

  return (
    <div className="flex absolute bottom-0 justify-center gap-2 overflow-hidden">
      <Eye />
      <Eye />
    </div>
  );
};

export default Eyes;
