import logo from './logo.svg';
import './App.css';
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import { Route,Routes } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/task' element={<Home/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
     
    </div>
  );
}

export default App;
