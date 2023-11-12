import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user-context";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase";

const SignUp = () => {
  const { setTempName } = useContext(UserContext);
  const { showErrorSwal, showSuccessSwal } = useSwalMessage();
  const navigate = useNavigate();

  const nameRegex = /^[-\p{L}\s]+$/u;
  const passwordRegex = /^[0-9,.\-()_;:?!%"@#$/€\p{L}\s]+$/u;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const displayName = data.get("nickName");
    const email = data.get("email");
    const password = data.get("password");

    switch (true) {
      case !displayName || !email || !password:
        showErrorSwal("Minden mező kitöltése kötelező.");
        break;

      case !nameRegex.test(displayName):
        showErrorSwal("A megadott név formátuma nem megfelelő.");
        break;

      case !passwordRegex.test(password):
        showErrorSwal("A megadott jelszó formátuma nem megfelelő.");
        break;

      case !emailRegex.test(email):
        showErrorSwal("A megadott email cím formátuma nem megfelelő.");
        break;

      default:
        try {
          const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password
          );

          await createUserDocumentFromAuth(user, displayName);
          setTempName(displayName);
          showSuccessSwal("Sikeres regisztráció.");
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            showErrorSwal("Ez az email cím már használatban van.");
          } else if ("auth/weak-password") {
            showErrorSwal("A jelszó túl gyenge.");
          } else {
            showErrorSwal("Valami hiba történt.");
            console.log(error);
          }
        }
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#090979" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Regisztráció
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nickName"
                label="Nicknév"
                name="nickName"
                autoComplete="nick"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email cím"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Jelszó"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Regisztráció
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="link" onClick={() => navigate("/signin")}>
                Már regisztráltál? Jelentkezz be!
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
