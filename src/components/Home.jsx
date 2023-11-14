import { Button, Card, Paper, Typography } from "@mui/material";
import { Championship, Chart, Loading } from ".";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user-context";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { currentUser, tempName } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName);
    }
  }, [currentUser]);

  if (!currentUser) return <Loading />;

  return (
    <Paper
      className="xl:w-[80%] w-[95%] xl:h-[80vh] h-auto xl:mt-0 xl:mb-0 mt-16 mb-12 pt-4 flex flex-col"
      style={{ overflowY: "auto" }}
    >
      <Typography variant="title" className="xl:text-[2rem] text-[1.2rem]">
        Hello {name ? name : tempName}!
      </Typography>
      <Card className="flex xl:flex-row flex-col pt-4 h-full">
        <Chart />
        <Championship />
      </Card>
      <div className="flex xl:flex-row flex-col w-[90%] self-center justify-evenly">
        <Button variant="start" onClick={() => navigate("/quiz")}>
          Irány a kérdésekhez
        </Button>
        <Button variant="start" onClick={() => navigate("/race")}>
          Irány a versenyhez
        </Button>
      </div>
    </Paper>
  );
};

export default Home;
