import { useState } from "react";

const AddBoardForm = ({ onAddBoard }) => {
  const [name, setName] = useState("");

  const handleBoardChange = (e) => {
    setNewBoard(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddBoard(name)
    setName(" ")
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={name} placeholder="e.g Web Design" onChange={handleBoardChange} />
        <label>Columns</label>
        <button type="submit">Create new board</button>
      </form>
    </>
  );
};

export default AddBoardForm;
