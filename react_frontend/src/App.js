import React, { useState, useEffect } from 'react';
import { apiClient } from './config/api';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check API health
    apiClient.get('/health/')
      .then(data => {
        setHealth(data);
        return apiClient.get('/programs/');
      })
      .then(data => {
        setPrograms(data.programs || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏛️ TMS Foundation Portal</h1>
        {health && (
          <div>
            <p>Status: {health.status}</p>
            <p>{health.message}</p>
          </div>
        )}
        
        <h2>Programs</h2>
        <div className="programs-list">
          {programs.map(program => (
            <div key={program.id} className="program-card">
              <h3>{program.name}</h3>
              <p>Status: {program.status}</p>
            </div>
          ))}
        </div>
        
        <p>API URL: {process.env.REACT_APP_API_URL || 'Not configured'}</p>
      </header>
    </div>
  );
}

export default App;