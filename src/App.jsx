import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateTemplates from './components/CreateTemplates';
import GetAllTemplates from './components/GetAllTemplates';

const App = () => {
  return (
    <Router>
      <div className="container_primary">
        <Routes> 
          <Route path="/create" element={<CreateTemplates />} />
          <Route path="/get" element={<GetAllTemplates />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
