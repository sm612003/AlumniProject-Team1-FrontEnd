import axios from 'axios';
import './App.css';
import AppRoute from './Routes/Router';
import {RouterProvider} from "react-router-dom"



function App() {
  axios.defaults.withCredentials =true;
  return (
    <div className="App">
      <div className="container">
     
          <AppRoute />
      
      </div>
    </div>
  );
}

export default App;
