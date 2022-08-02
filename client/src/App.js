import './App.css';
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import VideogameCreate from './components/Create/VideoGameCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <Routes>

        <Route exact path = "/" element = {<LandingPage/>}/>
        <Route path = "/home" element = {<Home/>}/>
        <Route path='/videogame' element = {<VideogameCreate/>}/>
        <Route exact path= '/home/:id' element ={<Detail/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
