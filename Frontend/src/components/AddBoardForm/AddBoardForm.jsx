import { useState } from "react";
import AddColumnForm from "../AddColumnForm/AddColumnForm";

const AddBoardForm = ({ onAddBoard, onAddColumn }) => {
  const [name, setName] = useState("");
  const [todo, setTodo] = useState("Todo")
  const [doing, setDoing] = useState("Doing")

  const handleBoardChange = (e) => {
    setName(e.target.value);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddBoard(name, todo, doing)
    setName(" ")
    setTodo("Todo")
    setDoing("Doing")
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={name} placeholder="e.g Web Design" onChange={handleBoardChange} />
        <label>Columns</label>
        <input value={todo} onChange={(e)=> setTodo(e.target.value)} />
        <input value={doing} onChange={(e)=> setDoing(e.target.value)} />

        <button type="submit">Create new board</button>
      </form>
    </>
  );
};

export default AddBoardForm;
