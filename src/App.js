import "./App.css";
import MediaCard from "./card.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["cairo"],
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MediaCard />
      </ThemeProvider>
    </div>
  );
}

export default App;
