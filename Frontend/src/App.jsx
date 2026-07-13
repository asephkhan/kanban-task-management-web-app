import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("a new board");
  const [selectedBoard, setSelectedboard] = useState(null);

  const addBoard = (e) => {
    e.preventDefault();
    console.log("button clicked", e.target);
    const boardObj = {
      name: newBoard,
    };

    axios.post("http://localhost:3001/boards", boardObj).then((response) => {
      setBoards([...boards, response.data]);
    });
  };

  const handleBoardChange = (e) => {
    setNewBoard(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/boards").then((response) => {
      setBoards(response.data);
    });
  }, []);

  if (!selectedBoard) {
    return (
      <>
        {boards.map((board) => (
          <button onClick={() => setSelectedboard(board)}>{board.name}</button>
        ))}
      </>
    );
  }

  if (boards.length === 0) return <p>loading...</p>;

  const board = selectedBoard;

  const columns = board.columns.map((column) => column);

  const column = columns.map((column) => column.name);

  const todo = columns[0].tasks.map((todo) => todo.title);
  const doing = columns[1].tasks.map((doing) => doing.title);
  const done = columns[2].tasks.map((done) => done.title);



  return (
    <>
      <form onSubmit={addBoard}>
        <input value={newBoard} onChange={handleBoardChange} />
        <button type="submit">create board</button>
      </form>

      {boards.map((board) => (
        <button onClick={() => setSelectedboard(board)}>{board.name}</button>
      ))}
      {column}
      <p>todo: {todo.length}</p>
      <p>{todo}</p>
      <p>doing: {doing.length}</p>
      <p>{doing}</p>
      <p>done: {done.length}</p>
      <p>{done}</p>
    </>
  );
}

export default App;
