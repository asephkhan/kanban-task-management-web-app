import { useState } from "react";

const AddBoardForm = ({ onAddBoard, onAddColumn }) => {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([
    {
      name: "Todo",
    },
    { name: "Doing" },
  ]);
  //  const [todo, setTodo] = useState("Todo")
  //  const [doing, setDoing] = useState("Doing")

  const handleBoardChange = (e) => {
    setName(e.target.value);
  };
  console.log(" banana columns", columns);

  const handleColumnChange = (index, value) => {
    //setColumns(...columns, value);
  };

  console.log(" apple columns", columns);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBoard(name, columns);
    setName("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={name}
          placeholder="e.g Web Design"
          onChange={handleBoardChange}
        />
        <label>Columns</label>

        {columns.map((column, index) => {
          return (
            <input
              value={column.name}
              onChange={(e) => handleColumnChange(index, e.target.value)}
            />
          );
        })}
        {/* <button type="submit">create new column</button> */}

        <button type="submit">Create new board</button>
      </form>
    </>
  );
};

export default AddBoardForm;
