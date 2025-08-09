import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ItineraryDisplay = ({ itinerary }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([itinerary], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'el-meu-itinerari-de-viatge.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`itinerary-container ${isPrinting ? 'printing' : ''}`}>
      <div className="itinerary-header">
        <h2>El teu itinerari de viatge</h2>
        <div className="itinerary-actions">
          <button onClick={handlePrint} className="action-button print-button">
            Imprimir
          </button>
          <button onClick={handleDownload} className="action-button download-button">
            Descarregar
          </button>
        </div>
      </div>
      
      <div className="itinerary-content">
        <ReactMarkdown>{itinerary}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ItineraryDisplay;