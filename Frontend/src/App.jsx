import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState('a new board')

  const addBoard = (e) => {
    e.preventDefault();
    console.log("button clicked", e.target)
    const boardObj = {
      name: newBoard,
    };

    axios.post("http://localhost:3001/boards", boardObj).then((response) => {
      console.log(response, "response");
    });
  };

  const handleBoardChange = e => {
    console.log(event.target.value)
    setNewBoard(e.target.value)
  } 

  useEffect(() => {
    axios.get("http://localhost:3001/boards").then((response) => {
      setBoards(response.data);
    });
  }, []);

  console.log(boards, "boards")

  //  console.log(boards, "banana");

  return (
    <>
      {boards.map((board) => board.name)}

      <form onSubmit={addBoard}>
      <input value={newBoard} onChange={handleBoardChange} />
      <button type="submit">create board</button>

      </form>
    </>
  );
}

export default App;
