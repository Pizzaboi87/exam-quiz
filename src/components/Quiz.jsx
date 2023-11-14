import Question from "./Question";
import Timer from "./Timer";
import Lifes from "./Lifes";
import { Button } from "@mui/material";
import { UserContext } from "../context/user-context";
import { useContext, useEffect, useState } from "react";
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
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [isThereMore, setIsThereMore] = useState(true);
  const navigate = useNavigate();

  const fetchActualData = async () => {
    try {
      const userDatafromDB = await getUserData(currentUser.uid);
      setActualUserData(userDatafromDB);
      setUserData(userDatafromDB);
    } catch (error) {
      showErrorSwal("Hiba történt az adatok betöltése közben.");
      console.error(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await getData("question/");
      setQuestions(response);
      resetPoints();
    } catch (error) {
      showErrorSwal("Hiba történt a kérdések betöltése közben.");
      console.error(error);
    }
  };

  const nextQuestion = () => {
    if (questionIndex === randomQuestions.length - 2) setIsThereMore(false);
    setGuess(null);
    setQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
  };

  const uploadPoints = async () => {
    try {
      await fetchActualData();
      const updatedQuizDetails = {
        points: points,
        time: new Date().toLocaleString(),
      };

      const updatedQuizes = actualUserData.quizes
        ? [...actualUserData.quizes, updatedQuizDetails]
        : [updatedQuizDetails];

      await updateUserData(currentUser.uid, { quizes: updatedQuizes });
    } catch (error) {
      showErrorSwal("Hiba történt az adatok feltöltése közben.");
      console.error(error);
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

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
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

  useEffect(() => {
    if (questions.length > 0) {
      const shuffledQuestions = isRace
        ? shuffleArray(questions)
        : shuffleArray(questions).slice(0, 15);
      setRandomQuestions(shuffledQuestions);
    }
  }, [isRace, questions]);

  if (!randomQuestions.length) return null;

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
        question={randomQuestions[questionIndex]}
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
