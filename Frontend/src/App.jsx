import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("a new board");

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


  if (boards.length === 0) return <p>loading...</p>

  const board = boards[0]
//  const todo = board.columns[0].tasks.map(task => task.title)

  const columns = board.columns.map(column => column)

const column = columns.map(column => column.name)

const todo = columns[0].tasks.map(todo => todo.title)
const doing = columns[1].tasks.map(doing => doing.title)
const done = columns[2].tasks.map(done => done.title)









  console.log("result", done );

  return (
    <>
      {boards.map((board) => board.name)}

      <form onSubmit={addBoard}>
        <input value={newBoard} onChange={handleBoardChange} />
        <button type="submit">create board</button>
      </form>

     
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
