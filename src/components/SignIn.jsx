import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signInAuthUserWithEmailAndPassword } from "../utils/firebase";
import { useSwalMessage } from "../utils/useSwalMessage";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { showErrorSwal } = useSwalMessage();
  const navigate = useNavigate();

  const passwordRegex = /^[0-9,.\-()_;:?!%"@#$/€\p{L}\s]+$/u;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    switch (true) {
      case !email || !password:
        showErrorSwal("Minden mező kitöltése kötelező.");
        break;

      case !passwordRegex.test(password):
        showErrorSwal("A megadott jelszó formátuma nem megfelelő.");
        break;

      case !emailRegex.test(email):
        showErrorSwal("A megadott email cím formátuma nem megfelelő.");
        break;

      default:
        try {
          const { user } = await signInAuthUserWithEmailAndPassword(
            email,
            password
          );
        } catch (error) {
          switch (error.code) {
            case "auth/wrong-password":
              showErrorSwal("Hibás jelszó.");
              break;
            case "auth/user-not-found":
              showErrorSwal("Nincs ilyen felhasználó.");
              break;
            case "auth/invalid-login-credentials":
              showErrorSwal("Érvénytelen bejelentkezési adatok.");
              break;
            default:
              showErrorSwal("Valami hiba történt.");
              console.log(error);
              break;
          }
        }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <KeyOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Bejelentkezés
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email cím"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Jelszó"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Belépés
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="link" onClick={() => navigate("/signup")}>
                Még nem regisztráltál?
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
