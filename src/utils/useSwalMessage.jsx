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

  const showMessage = useCallback((message) => {
    return new Promise((resolve) => {
      Swal.fire({
        icon: "info",
        title: "Üzenet",
        text: message,
      }).then(() => {
        resolve();
      });
    });
  }, []);

  return { showErrorSwal, showSuccessSwal, showMessage };
};
