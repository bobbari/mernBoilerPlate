
import { Route } from "react-router-dom"
import './App.css';
import Login from "../login/login";
import Registeration from '../registeration/Registeration'

function App() {
  return (
    <div className="App">
      <Route path='/login' component={Login} />
      <Route path='/registeration' component={Registeration} />
    </div>
  );
}

export default App;
