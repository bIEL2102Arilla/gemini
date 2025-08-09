import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TripForm from './components/TripForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateTripPlan } from './services/services.js';

function App() {
  const [itinerary, setItinerary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTripSubmit = async (tripDetails) => {
    setIsLoading(true);
    setError('');
    try {
      const generatedPlan = await generateTripPlan(tripDetails);
      setItinerary(generatedPlan);
    } catch (err) {
      setError(
        'Hi ha hagut un problema generant el teu itinerari. Si us plau, torna-ho a provar.'
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <TripForm onSubmit={handleTripSubmit} />
        {isLoading && <LoadingSpinner />}
        {error && <div className="error-message">{error}</div>}
        {itinerary && !isLoading && <ItineraryDisplay itinerary={itinerary} />}
      </main>
      <footer className="footer">
        <p>© 2025 Planificador de Viatges - Creat amb React i Gemini AI</p>
      </footer>
    </div>
  );
}

export default App;
