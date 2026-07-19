import { useState } from "react";

const AddColumnForm = ({ onAddColumn, selectedBoard }) => {
  const [newColumn, setNewColumn] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
 //   setNewColumn(e.target.value)
    onAddColumn(selectedBoard.id)
    setNewColumn("")
  };
  return (
    <>
      <form onSubmit={handleSubmit} action="submit">
        <input
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
        ></input>
        <button type="onSubmit">add column</button>
      </form>
    </>
  );
};

export default AddColumnForm;
