import './App.css';
import Homepage from './pages/homepage/homepage';

import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Route exact path="/" component={Homepage} />
    </div>
  );
}

export default App;
