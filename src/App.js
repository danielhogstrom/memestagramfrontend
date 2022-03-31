import SignUp from "./components/Login/Signup"

function App() {
  return (
    <div
      //full background styling
      className="App"
      style={{
        backgroundColor: "#dae0e6",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //  background: "linear-gradient(to left top, #0F0E0E, #A5402D)"
      }}
    >
      <SignUp />
    </div>
  )
}
export default App
