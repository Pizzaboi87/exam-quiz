import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

const Timer = ({ setGameOver }) => {
  const initialTime = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [displayTime, setDisplayTime] = useState("15:00");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          const minutes = Math.floor(prevTime / 60);
          const seconds = prevTime % 60;
          const formattedTime = `${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`;
          setDisplayTime(formattedTime);
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setGameOver(true);
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progressValue = (timeLeft / initialTime) * 100;

  return (
    <div className="flex items-center justify-center relative mb-4 mt-16">
      <CircularProgress
        variant="determinate"
        value={progressValue}
        color="error"
        size={60}
        thickness={4}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {displayTime}
        </Typography>
      </Box>
    </div>
  );
};

export default Timer;
