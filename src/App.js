import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {useContext,useEffect} from 'react'
import { BrowserRouter,Routes ,Route} from 'react-router-dom';
import GeneralProvider, {GeneralContext} from './Context';
import Landing from './components/Landing';
import Transaction from './components/Transaction';
import Subscription from './components/subscriptions/Subsribtions';






function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <GeneralProvider>
        <BrowserRouter>
                    <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/transaction" element={<Transaction />} />
                    <Route path="/subscriptions" element={<Subscription />} />
                    </Routes>
                    </BrowserRouter>
        </GeneralProvider>

      </header>
    </div>
  );
}

export default App;
