import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/logo-dark.svg";

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

  const todos = columns[0].tasks;
  const doings = columns[1].tasks;
  const dones = columns[2].tasks;

  return (
    <>
      <img className="logo_image" src={logo} alt="logo" />

      <div className="container">
        <div className="sidebar">
          <div className="sidebar__boards_list">
          <p className="sidebar__list_info">ALL BOARDS ({boards.length})</p>
            {boards.map((board) => (
              <button
                className="sidebar__board_list_item"
                onClick={() => setSelectedboard(board)}
              >
                {board.name}
              </button>
            ))}
            <form onSubmit={addBoard}>
              <input value={newBoard} onChange={handleBoardChange} />
              <button type="submit">create board</button>
            </form>
          </div>
        </div>

        <div className="board">
          <div className="board__element">
            <h4>todo: {todos.length}</h4>
            {todos.map((todo) => (
              <p>{todo.title}</p>
            ))}
          </div>
          <div className="board__element">
            <h4>doing: {doings.length}</h4>
            {doings.map((doing) => (
              <p>{doing.title}</p>
            ))}
          </div>
          <div className="board__element">
            <h4>done: {dones.length}</h4>
            {dones.map((done) => (
              <p>{done.title}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
