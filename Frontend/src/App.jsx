import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("a new board");
//  const [columns, setColumns] = useState([])

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

    /*     axios.get("http://localhost:3001/boards").then((response) => {
      setBoards(response.data);
    }); */
  }, []);


   const columns = boards.map((board) => {
       return board.columns
      })

  console.log(
 columns.map(column => column.name)
  );

  return (
    <>
      {boards.map((board) => board.name)}

      <form onSubmit={addBoard}>
        <input value={newBoard} onChange={handleBoardChange} />
        <button type="submit">create board</button>
      </form>


{/*        {columns.map(column => column.name)}  */}
    </>
  );
}

export default App;
