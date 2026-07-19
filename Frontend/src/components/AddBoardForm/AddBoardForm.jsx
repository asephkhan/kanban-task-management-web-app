import { useState } from "react";
import AddColumnForm from "../AddColumnForm/AddColumnForm";
//import Button from "../ButtonComponent/Button";

const AddBoardForm = ({ onAddBoard }) => {
  const [name, setName] = useState("");

  const handleBoardChange = (e) => {
    setName(e.target.value);
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
        <AddColumnForm />
        {/* <Button text='create new column' /> */}
        <button type="submit">Create new board</button>
      </form>
    </>
  );
};

export default AddBoardForm;
