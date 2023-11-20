// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen'; // Import Bookingscreen component
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';
import Adminscreen from './screens/Adminscreen';

function App() {
  return (
    <div className="App" >
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen/>} />
          {/* Ensure the correct rendering of Bookingscreen for room booking */}
          <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen />} />
          <Route path='/register' exact Component={Registerscreen}/>
          <Route path='/login' exact Component={Loginscreen}/>
          <Route path='/profile' exact Component={Profilescreen}/>
          <Route path='/' exact Component={Landingscreen}/>
          <Route path='/admin' exact Component={Adminscreen}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


