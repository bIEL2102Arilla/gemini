import React, { useState } from 'react';

/*
 * Gestor d'API Keys: afegeix, elimina i selecciona una clau activa.
 * L'estat real (llista de claus i clau activa) es controla des del pare.
 */
const ApiKeyManager = ({ apiKeys, activeKey, onAddKey, onRemoveKey, onSelectKey }) => {
  const [newKey, setNewKey] = useState('');

  const handleAdd = () => {
    const trimmed = newKey.trim();
    if (trimmed) {
      onAddKey(trimmed);
      setNewKey('');
    }
  };

  return (
    <div className="api-key-manager" style={{ marginBottom: '24px' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Configuració de API Keys</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="Afegeix una nova API Key"
          style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#4b5563', color: '#ffffff' }}
        />
        <button
          type="button"
          onClick={handleAdd}
          style={{ padding: '8px 12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Afegir
        </button>
      </div>

      {apiKeys.length === 0 ? (
        <p style={{ color: '#6b7280' }}>Encara no hi ha cap clau configurada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {apiKeys.map((key) => {
            const display = key.length > 12 ? `${key.slice(0, 4)}...${key.slice(-4)}` : key;
            return (
              <li key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="radio"
                  name="selectedKey"
                  value={key}
                  checked={key === activeKey}
                  onChange={() => onSelectKey(key)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ flex: 1, fontFamily: 'monospace' }}>{display}</span>
                <button
                  type="button"
                  onClick={() => onRemoveKey(key)}
                  style={{ marginLeft: '8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}
                >
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ApiKeyManager;
