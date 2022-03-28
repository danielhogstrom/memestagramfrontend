import Login from "./components/Login/Login";
import SignUp from "./components/Login/Signup";


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
      
      <SignUp />
      
      
    </div>
  );
}

export default App;
