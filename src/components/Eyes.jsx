import { UserContext } from "../context/user-context";
import { useContext, useEffect, useState } from "react";

const Eye = ({ eyeIndex }) => {
  const { isCorrect, setIsCorrect } = useContext(UserContext);
  const [flash, setFlash] = useState(false);
  const [timeoutCount, setTimeoutCount] = useState(0);

  useEffect(() => {
    if (isCorrect !== null) {
      const timeout = setTimeout(() => {
        setFlash((prevFlash) => !prevFlash);
        setTimeoutCount((prevCount) => prevCount + 1);
      }, 100);

      if (timeoutCount === 6) {
        setIsCorrect(null);
        setTimeoutCount(0);
      }
      console.log("Flash: ", flash, "TimeoutCount: ", timeoutCount);

      return () => clearTimeout(timeout);
    }
  }, [isCorrect, timeoutCount, setIsCorrect]);

  useEffect(() => {
    const eyeball = (event) => {
      const eye = document.getElementById(`eye-${eyeIndex}`);
      if (eye) {
        let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
        let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rotate = radian * (180 / Math.PI) * -1 + 270;
        eye.style.transform = `rotate(${rotate}deg)`;
      }
    };

    document.body.addEventListener("mousemove", eyeball);

    return () => {
      document.body.removeEventListener("mousemove", eyeball);
    };
  }, [eyeIndex]);

  return (
    <div
      id={`eye-${eyeIndex}`}
      className={`${
        flash && isCorrect
          ? "before:border-[#3E8F55]"
          : flash && isCorrect === false
          ? "before:border-[#CC3F0C]"
          : "before:border-[#2B35F2]"
      } eyes relative w-[1.8rem] h-[1.8rem] rounded-full bg-[#FEFEFE]`}
    />
  );
};

const Eyes = () => {
  return (
    <div className="flex absolute bottom-0 justify-center gap-2 overflow-hidden">
      <Eye eyeIndex={1} />
      <Eye eyeIndex={2} />
    </div>
  );
};

export default Eyes;
