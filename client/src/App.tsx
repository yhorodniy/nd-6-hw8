
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';
import PostFormPage from './pages/PostFormPage/PostFormPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/create" element={<PostFormPage />} />
          <Route path="/edit/:id" element={<PostFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
