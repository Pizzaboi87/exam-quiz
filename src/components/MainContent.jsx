import { Home, Loading, SignIn, SignUp, Quiz, Eyes } from ".";
import { AnimatePresence, motion } from "framer-motion";
import { Typography } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChangedListener, signOutUser } from "../utils/firebase";
import { useEffect, useState } from "react";

const MainContent = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        navigate("/");
        setSignedIn(true);
      } else if (location.pathname === "/signup") {
        setSignedIn(false);
      } else {
        navigate("/signin");
        setSignedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <Loading />;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-[100vh] flex items-center justify-center"
    >
      {signedIn && (
        <Typography
          className="absolute top-5 right-4 z-50"
          variant="signOut"
          onClick={signOutUser}
        >
          Kijelentkezés
        </Typography>
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/race" element={<Quiz isRace={true} />} />
          <Route path="/quiz" element={<Quiz isRace={false} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AnimatePresence>
      {location.pathname != "/signup" && location.pathname != "/signin" && (
        <Eyes />
      )}
    </motion.div>
  );
};

export default MainContent;
