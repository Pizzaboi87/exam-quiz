import { UserContext } from "../context/user-context";
import { useContext, useEffect, useRef, useState } from "react";
import { getQuestionImage } from "../utils/firebase";
import { useSwalMessage } from "../utils/useSwalMessage";
import {
  CardActionArea,
  Paper,
  Typography,
  CardContent,
  Card,
} from "@mui/material";

const Question = ({ question, guess, setGuess, setPlayerLifes, isRace }) => {
  const { correctAnswer, wrongAnswer } = useContext(UserContext);
  const { showImage } = useSwalMessage();
  const { questionTitle, answers, correctAnswerIndex } = question;
  const [imageLink, setImageLink] = useState(null);
  const guessRefs = useRef([null, null, null, null, null, null]);
  const passRef = useRef(null);

  useEffect(() => {
    const fetchImage = async () => {
      const link = await getQuestionImage(`${question.imageID}.webp`);
      setImageLink(link);
    };

    if (question.imageID) fetchImage();
    else setImageLink(null);
  }, [question]);

  const handleGuess = (answerIndex) => {
    if (guess == null) setGuess(answerIndex);
  };

  useEffect(() => {
    switch (guess) {
      case null:
        break;
      case -1:
        passRef.current.style.backgroundColor = "#EEB868";
        guessRefs.current[correctAnswerIndex].style.backgroundColor = "#49DCB1";
        break;
      case correctAnswerIndex:
        correctAnswer();
        guessRefs.current[correctAnswerIndex].style.backgroundColor = "#49DCB1";
        break;
      default:
        wrongAnswer(isRace);
        guessRefs.current[correctAnswerIndex].style.backgroundColor = "#49DCB1";
        guessRefs.current[guess].style.backgroundColor = "#EF767A";
        isRace && setPlayerLifes((prevPlayerLifes) => prevPlayerLifes - 1);
    }
  }, [guess]);

  return (
    <Paper className="xl:w-[75vw] w-full " variant="questionBox">
      <div className="mb-4">
        <Typography variant="question">{questionTitle}</Typography>
      </div>

      {imageLink && (
        <img
          src={imageLink}
          alt="question_image"
          className="mb-4 md:max-h-[25vh] cursor-zoom-in"
          onClick={() => showImage(imageLink)}
        />
      )}

      <div className="flex flex-col gap-4">
        {answers.map((answer, index) => (
          <Card
            key={index}
            ref={(el) => (guessRefs.current[index] = el)}
            style={{ backgroundColor: guess == null ? "white" : null }}
          >
            <CardActionArea onClick={() => handleGuess(index)}>
              <CardContent>
                <Typography variant="answer">{answer}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}

        <Card
          ref={passRef}
          style={{ backgroundColor: guess == null ? "white" : null }}
        >
          <CardActionArea onClick={() => handleGuess(-1)}>
            <CardContent>
              <Typography variant="answer">
                Még megtippelni se merem.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Paper>
  );
};

export default Question;
