import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Travel from './components/Travel';
import ApiKeyManager from './components/ApiKeyManager.jsx';

function App() {
  // Claus d'API a nivell d'aplicació, persistides a localStorage
  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const stored = localStorage.getItem('apiKeys');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [activeKey, setActiveKey] = useState(() => {
    try {
      return localStorage.getItem('activeKey') || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try { localStorage.setItem('apiKeys', JSON.stringify(apiKeys)); } catch {}
  }, [apiKeys]);

  useEffect(() => {
    try {
      if (activeKey) localStorage.setItem('activeKey', activeKey);
      else localStorage.removeItem('activeKey');
    } catch {}
  }, [activeKey]);

  const addKey = (key) => {
    setApiKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
    if (!activeKey) setActiveKey(key);
  };
  const removeKey = (key) => {
    setApiKeys((prev) => prev.filter((k) => k !== key));
    if (key === activeKey) setActiveKey('');
  };
  const selectKey = (key) => setActiveKey(key);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <ApiKeyManager
          apiKeys={apiKeys}
          activeKey={activeKey}
          onAddKey={addKey}
          onRemoveKey={removeKey}
          onSelectKey={selectKey}
        />
        <Travel apiKey={activeKey} />
      </main>
      <footer className="footer">
        <p>© 2025 Planificador de Viatges - Creat amb React i Gemini AI</p>
      </footer>
    </div>
  );
}

export default App;
