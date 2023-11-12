import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Paper } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/user-context";

const Question = ({ question, guess, setGuess, setLives }) => {
  const { correctAnswer, wrongAnswer } = useContext(UserContext);
  const { questionTitle, answers, correctAnswerIndex } = question;
  const guessRefs = useRef([null, null, null, null, null]);
  const passRef = useRef(null);

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
        wrongAnswer();
        guessRefs.current[correctAnswerIndex].style.backgroundColor = "#49DCB1";
        guessRefs.current[guess].style.backgroundColor = "#EF767A";
        setLives((prevLives) => prevLives - 1);
    }
  }, [guess]);

  return (
    <Paper className="xl:w-[50vw] w-full" variant="questionBox">
      <div className="mb-4">
        <Typography variant="question">{questionTitle}</Typography>
      </div>

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
