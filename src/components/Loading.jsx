import { Typography } from "@mui/material";
import loading from "../assets/loading.gif";

const Loading = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center">
      <img src={loading} alt="loading" className="xl:max-w-[20%]" />
      <Typography variant="loading">Loading...</Typography>
    </div>
  );
};

export default Loading;
