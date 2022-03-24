import Login from "./components/Login/Login";
import SignUpContainer from "./components/SignUp/SignUpContainer"
import CreateAccount from "./components/CreateAccount/CreateAccount"

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CreateAccount />
      <Login />
    </div>
  );
}

export default App;
