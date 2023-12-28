import './App.css';
import AppRoute from './Routes/Router';
import {RouterProvider} from "react-router-dom"

// index.js or App.js
import { LicenseInfo } from '@mui/x-license-pro';

// Make sure to replace 'YOUR_LICENSE_KEY' with your actual license key
LicenseInfo.setLicenseKey('YOUR_LICENSE_KEY');


function App() {
  return (
    <div className="App">
      <div className="container">

          <AppRoute />
      
      </div>
    </div>
  );
}

export default App;
