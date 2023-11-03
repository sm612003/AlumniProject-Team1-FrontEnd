import './App.css';
import router from './Routes/Router';
import {RouterProvider} from "react-router-dom"



function App() {
  return (
    <div className="App">
    <div className='container'>
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
