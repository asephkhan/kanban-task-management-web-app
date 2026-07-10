import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/boards").then((response) => {
      setBoards(response.data);
    });
  }, []);

  console.log(boards, "banana");

  return (
    <>
      {boards.map((board) => board.name)}
    </>
  );
}

export default App;
