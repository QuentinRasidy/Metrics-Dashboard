import { Routes, Route } from "react-router-dom"
import './App.css';
import './components/Dashboard'
import Dashboard from './components/Dashboard';

function App() {

    return (
      <div className="container">
        <Routes>
          <Route path="/:mac" element={ <Dashboard /> } />
        </Routes>
      </div>
    );

}

export default App;
