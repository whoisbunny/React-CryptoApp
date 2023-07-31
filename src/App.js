import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Coin from './Components/Coin';
import Exchanges from './Components/Exchanges';
import CoinDetails from './Components/CoinDetails';


function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/'  element={<Home/>}/>
        <Route exact path='/coins'  element={<Coin/>}/>
        <Route exact path='/exchanges'  element={<Exchanges/>}/>
        <Route exact path='/coins/:id'  element={<CoinDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
      
    </>
  );
}

export default App;
