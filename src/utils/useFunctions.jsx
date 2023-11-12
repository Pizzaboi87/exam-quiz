import { useContext, useState } from "react";
import { UserContext } from "../context/user-context";
import { useSwalMessage } from "./useSwalMessage";

export const useFunctions = () => {
  return {
    fetchActualData,
    nextQuestion,
    fetchQuestions,
    uploadPoints,
    setGuess,
    guess,
    questionIndex,
    questions,
    isThereMore,
  };
};
