
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GraphPage from './components/GraphPage';
import CVPage from './pages/CVPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router basename="/dais">
      <Routes>
        <Route path="/" element={<GraphPage />} />
        <Route path="/cv" element={<CVPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
