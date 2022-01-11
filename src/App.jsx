import './App.css';
import Home from './pages/home/';

import { Route } from "react-router-dom";
import Shop from './pages/shop/';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/shop" component={Shop} />
    </div>
  );
}

export default App;
