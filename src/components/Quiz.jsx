import Question from "./Question";
import Timer from "./Timer";
import Lifes from "./Lifes";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user-context";
import { useNavigate } from "react-router-dom";
import { useSwalMessage } from "../utils/useSwalMessage";
import { storeResult } from "../utils/firebase";
import { getData, getUserData, updateUserData } from "../utils/firebase";

const Quiz = ({ isRace }) => {
  const { points, resetPoints, currentUser, setUserData } =
    useContext(UserContext);
  const { showScore, showErrorSwal } = useSwalMessage();
  const [playerLifes, setPlayerLifes] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [actualUserData, setActualUserData] = useState([]);
  const [guess, setGuess] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isThereMore, setIsThereMore] = useState(true);
  const navigate = useNavigate();

  const fetchActualData = async () => {
    const userDatafromDB = await getUserData(currentUser.uid);
    setActualUserData(userDatafromDB);
    setUserData(userDatafromDB);
  };

  const fetchQuestions = async () => {
    const response = await getData("question/");
    setQuestions(response);
    resetPoints();
  };

  const nextQuestion = () => {
    if (questionIndex === questions.length - 2) setIsThereMore(false);
    setGuess(null);
    setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
  };

  const uploadPoints = async () => {
    await fetchActualData();
    const updatedQuizDetails = {
      points: points,
      time: new Date().toLocaleString(),
    };

    try {
      if (actualUserData.quizes) {
        await updateUserData(currentUser.uid, {
          quizes: [...actualUserData.quizes, updatedQuizDetails],
        });
      } else {
        await updateUserData(currentUser.uid, {
          quizes: [updatedQuizDetails],
        });
      }
    } catch (error) {
      showErrorSwal("Hiba történt az adatok feltöltése közben.");
      console.log(error);
    }
  };

  const finish = () => {
    showScore(points).then(() => {
      if (!isRace) {
        uploadPoints();
      } else {
        storeResult(currentUser, points);
      }
      resetPoints();
      navigate("/");
    });
  };

  useEffect(() => {
    if (playerLifes === 0) setGameOver(true);
  }, [playerLifes]);

  useEffect(() => {
    if (gameOver) finish();
  }, [gameOver]);

  useEffect(() => {
    fetchQuestions();
    fetchActualData();
  }, []);

  if (!questions.length) return null;

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      <h1 className="absolute top-4 left-4 text-[1.5rem] font-[600] text-white">
        Pontszám: {points}
      </h1>
      {isRace ? (
        <Lifes playerLifes={playerLifes} />
      ) : (
        <Timer setGameOver={setGameOver} />
      )}
      <Question
        question={questions[questionIndex]}
        guess={guess}
        setGuess={setGuess}
        setPlayerLifes={setPlayerLifes}
        isRace={isRace}
      />
      <span className="flex gap-4">
        <Button variant="quiz" onClick={() => navigate("/")}>
          Vissza a főoldalra
        </Button>
        {isThereMore ? (
          <Button variant="quiz" onClick={nextQuestion}>
            Következő kérdés
          </Button>
        ) : (
          <Button variant="quiz" onClick={finish}>
            Quiz vége
          </Button>
        )}
      </span>
    </div>
  );
};

export default Quiz;
