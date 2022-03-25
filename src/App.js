import Login from "./components/Login/Login";

function App() {
  return (
    <div
    //full background styling
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "pink"
      }}
    >
      <Login />
    </div>
  );
}

export default App;
