import {useState, useEffect} from 'react'
import './App.css';
import axios from "axios";





const fetchData = () => {

axios.get('http://localhost:8080/')

.then(result => {
    console.log(result);    
})

.catch(error => {
    console.log(error);
})
}

function App() {

  useEffect(() => {
    fetchData()
  })


  return (
    <div className="App">
      <header className="App-header">

      
        
      </header>
    </div>
  );
}

export default App;
