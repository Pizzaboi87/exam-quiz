import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Lifes = ({ playerLifes }) => {
  const filledHearts = new Array(playerLifes)
    .fill(null)
    .map((_, index) => (
      <FavoriteIcon
        key={`filled-heart-${index}`}
        sx={{ color: "#EF767A", fontSize: "2rem" }}
        className="xl:mr-4"
      />
    ));

  const emptyHearts = new Array(3 - playerLifes)
    .fill(null)
    .map((_, index) => (
      <FavoriteBorderIcon
        key={`empty-heart-${index}`}
        sx={{ color: "#EF767A", fontSize: "2rem" }}
        className="xl:mr-4"
      />
    ));

  return <span className="mb-4">{[...filledHearts, ...emptyHearts]}</span>;
};

export default Lifes;
