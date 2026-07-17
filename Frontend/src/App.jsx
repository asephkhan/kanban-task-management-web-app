import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/logo-dark.svg";
import Button from "./components/ButtonComponent/Button";

function App() {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("a new board");
  const [selectedBoard, setSelectedboard] = useState(null);
  const [newColumn, setNewColumn] = useState("new");
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [viewtask, setViewtask] = useState(null);

  const addBoard = (e) => {
    e.preventDefault();
    const boardObj = {
      name: newBoard,
    };

    axios.post("http://localhost:3001/boards", boardObj).then((response) => {
      setBoards([...boards, response.data]);
    });
    setIsAddingBoard(false);
  };

  const addColumn = (e, boardId) => {
    e.preventDefault();
    const existingBoard = boards.find((board) => board.id === boardId);

    const updatedBoard = {
      name: existingBoard.name,
      id: existingBoard.id,
      columns: [
        ...(existingBoard.columns || []),
        { name: newColumn, tasks: [] },
      ],
    };

    axios
      .put(`http://localhost:3001/boards/${existingBoard.id}`, updatedBoard)
      .then((response) => {
        setSelectedboard(response.data);
        setNewColumn("new column");
      });
    setIsAddingColumn(false);
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
          <button key={board.id} onClick={() => setSelectedboard(board)}>
            {board.name}
          </button>
        ))}
      </>
    );
  }

  if (boards.length === 0) return <p>loading...</p>;

  const columns = selectedBoard.columns || [];

  return (
    <>
      <img className="logo_image" src={logo} alt="logo" />

      <div className="container">
        <div className="sidebar">
          <div className="sidebar__boards_list">
            <p key={boards.id} className="sidebar__list_info">
              ALL BOARDS ({boards.length})
            </p>
            {boards.map((board) => (
              <button
                className="sidebar__board_list_item"
                onClick={() => setSelectedboard(board)}
              >
                {board.name}
              </button>
            ))}

            {!isAddingBoard && (
              <button onClick={() => setIsAddingBoard(true)}>
                create new board
              </button>
            )}
            {isAddingBoard && (
              <form onSubmit={addBoard}>
                <input value={newBoard} onChange={handleBoardChange} />
                <button type="submit">create board</button>
              </form>
            )}
          </div>
        </div>

        <div className="board">
          {columns.map((col) => (
            <>
            <div className="board__element" key={col.id}>
              <h4>
                {col.name} {col.tasks ? col.tasks.length : 0}
              </h4>
              {col.tasks &&
                col.tasks.map((task) => (
                  <button
                    onClick={() => {
                      setViewtask(task);
                    }}
                    key={task.id}
                  >
                    {task.title}
                  </button>
                ))}
            </div>
            <div>
                {viewtask &&
                  viewtask.map((task) => {
                    return (
                      <div key={task.id}>
                        <h3>{task.title} </h3>
                        <p>{task.description}</p>
{/*                         <p>{task.subtasks ? task.subtasks : []}</p>
                        <p>{task.status}</p> */}
                      </div>
                    );
                  })}
            </div>
            </>
          ))}

          {!isAddingColumn && (
            <Button
              onClick={() => setIsAddingColumn(true)}
              text={"new column"}
            />
          )}

          <div className="board__element">
            {isAddingColumn && (
              <form
                onSubmit={(e) => addColumn(e, selectedBoard.id)}
                action="submit"
              >
                <input
                  value={newColumn}
                  onChange={(e) => setNewColumn(e.target.value)}
                ></input>
                <button type="onSubmit">add column</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
