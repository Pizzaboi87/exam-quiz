import Swal from "sweetalert2";
import { useCallback } from "react";

export const useSwalMessage = () => {
  const showErrorSwal = useCallback((error) => {
    return new Promise((resolve) => {
      Swal.fire({
        icon: "error",
        title: "Hiba történt!",
        text: error,
      }).then(() => {
        resolve();
      });
    });
  }, []);

  const showSuccessSwal = useCallback((message) => {
    return new Promise((resolve) => {
      Swal.fire({
        icon: "success",
        title: "A művelet sikeres!",
        text: message,
      }).then(() => {
        resolve();
      });
    });
  }, []);

  const showScore = useCallback((score) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Quiz vége",
        text: `Az elért pontszám: ${score}`,
      }).then(() => {
        resolve();
      });
    });
  }, []);

  const showImage = (image) => {
    return new Promise((resolve) => {
      Swal.fire({
        imageUrl: image,
        imageAlt: "image",
        showConfirmButton: false,
        showCloseButton: false,
        background: "#fff",
        padding: "1rem",
      }).then(() => {
        resolve();
      });
    });
  };

  return { showErrorSwal, showSuccessSwal, showScore, showImage };
};
