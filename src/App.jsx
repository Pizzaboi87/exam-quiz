import { UserProvider } from "./context/user-context.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { MainContent } from "./components";
import { theme } from "./style/theme.js";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <MainContent />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
