import { Box } from "@mui/material";
import "./App.css";
import PaymentBrick from "./Components/PaymentBrick";

function App() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#ffffff",
        }}
      >
        <PaymentBrick />
      </Box>
    </>
  );
}

export default App;
