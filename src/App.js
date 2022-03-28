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
        background: "#EAE7DC"
      //  background: "linear-gradient(to left top, #0F0E0E, #A5402D)",
      }}
    >
      <Login />
    </div>
  );
}

export default App;
