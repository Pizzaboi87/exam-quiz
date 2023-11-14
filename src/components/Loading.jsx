import loading from "../assets/loading.gif";
import { Typography } from "@mui/material";

const Loading = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <img src={loading} alt="loading" className="xl:max-w-[20%] max-w-[50%]" />
      <Typography variant="loading">Betöltés...</Typography>
    </div>
  );
};

export default Loading;
