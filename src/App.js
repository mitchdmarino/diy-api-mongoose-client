import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './components/pages/Home'
import Blog from './components/pages/Blog'
import './App.css';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route 
            path='/'
            element={<Home />}
          />
          <Route 
            path='/blog/:id'
            element={<Blog />}
          />
        </Routes>
      </main>
    </Router>
    
  );
}

export default App;
