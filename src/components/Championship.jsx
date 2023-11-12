import winner from "../assets/winner.gif";
import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { getData } from "../utils/firebase";
import { useEffect, useState } from "react";

const Championship = () => {
  const [firstFive, setFirstFive] = useState([]);
  const [secondFive, setSecondFive] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChampionship = async () => {
      const data = await getData("championship/");
      const dataArr = Object.values(data)
        .sort((a, b) => {
          return b.result - a.result;
        })
        .slice(0, 10);

      console.log(dataArr);

      setFirstFive(dataArr.slice(0, 5));
      setSecondFive(dataArr.slice(5, 10));

      setLoading(false);
    };

    fetchChampionship();
  }, []);

  if (loading) return null;

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <CardContent>
        <Card
          style={{
            background:
              "linear-gradient(36deg, rgba(254,254,254,1) 0%, rgba(222,233,255,1) 100%)",
            position: "relative",
          }}
        >
          <CardMedia sx={{ height: 140 }} image={winner} title="winner" />
          <Typography
            style={{
              marginTop: "0.5rem",
              textAlign: "center",
              fontSize: "1.2rem",
              marginBottom: "1rem",
            }}
          >
            Toplista
          </Typography>
          <div className="flex flex-col xl:flex-row w-full xl:justify-between xl:px-4">
            <List style={{ marginTop: "-1rem" }}>
              {firstFive.map((item, index) => {
                return (
                  <ListItem key={`${item.name}-${index}`}>
                    <ListItemText>
                      <p>
                        <strong className="mr-2">{`${index + 1}. - ${
                          item.name
                        } `}</strong>
                        {`(${item.result} pont)`}
                      </p>
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
            <List style={{ marginTop: "-1rem" }}>
              {secondFive.map((item, index) => {
                return (
                  <ListItem key={`${item.name}-${index}`}>
                    <ListItemText>
                      <p>
                        <strong className="mr-2">{`${index + 6}. - ${
                          item.name
                        } `}</strong>
                        {`(${item.result} pont)`}
                      </p>
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Championship;
