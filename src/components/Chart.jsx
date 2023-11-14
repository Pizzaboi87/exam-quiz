import { UserContext } from "../context/user-context";
import { useContext, useEffect, useState } from "react";
import { getUserData } from "../utils/firebase";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const { currentUser, userData } = useContext(UserContext);
  const [haveStatistics, setHaveStatistics] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchActualData = async () => {
    await getUserData(currentUser.uid).then((res) => {
      if (res.quizes) {
        setHaveStatistics(true);
        const userStatistics = res.quizes.map((quiz) => {
          return {
            time: quiz.time.slice(-8, -3),
            pont: quiz.points,
          };
        });
        setData(userStatistics);
      } else {
        setHaveStatistics(false);
      }
    });
  };

  useEffect(() => {
    fetchActualData();
  }, [userData]);

  if (!haveStatistics) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <p>Még nincs statisztikád.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer minHeight={"50vh"}>
      <BarChart
        width={500}
        height={300}
        data={data.slice(-15)}
        margin={{
          top: 5,
          right: windowWidth > 1000 ? 30 : 10,
          left: windowWidth > 1000 ? 0 : -30,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="time" angle={90} tick={{ dy: 20 }} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="pont" fill="#2284d8" activeBar={<Rectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
