import { useState } from "react";

const AddBoardForm = ({ onAddBoard }) => {
  const [name, setName] = useState("name");

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
        <input value={name} onChange={handleBoardChange} />
        <button type="submit">create board</button>
      </form>
    </>
  );
};

export default AddBoardForm;
