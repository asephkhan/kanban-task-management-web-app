import { useState } from "react";

const AddColumnForm = ({ onAddColumn, selectedBoard }) => {
  const [newColumn, setNewColumn] = useState("");
  
  const handleSubmit = (e) => {    
    e.preventDefault();
    console.log(newColumn, "before submit");
    onAddColumn(selectedBoard.id, newColumn);
    setNewColumn("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
        ></input>
        <button type="submit">add column</button>
      </form>
    </>
  );
};

export default AddColumnForm;
