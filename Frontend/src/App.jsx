import "./App.css";

function App() {
  const boards = [
    { name: "platform launch", id: 1 },
    { name: "marketing plan", id: 2 },
    { name: "roadmap", id: 3 },
  ];
  console.log(boards, "banana");
  return(
    <>
    {boards.map((board) =>
     <><div key={board.id}>{board.name} {board.id}</div></> 
    )}
    </>) 
}

export default App;
