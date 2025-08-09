import React, { useState } from 'react';

const TripForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    budget: '',
    interests: '',
    travelStyle: 'balanced', // valor per defecte
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="trip-form-container">
      <h2>Quines són les teves preferències de viatge?</h2>
      <form className="trip-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="destination">Destinació:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Ex: Barcelona, Tokyo, Nova York..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Durada (dies):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            min="1"
            max="30"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget">Pressupost (€):</label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opció</option>
            <option value="econòmic">Econòmic</option>
            <option value="moderat">Moderat</option>
            <option value="luxe">Luxe</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interests">Interessos:</label>
          <textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Ex: gastronomia, museus, senderisme, platges..."
            required
          />
        </div>

        <div className="form-group">
          <label>Estil de viatge:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="travelStyle"
                value="relaxat"
                checked={formData.travelStyle === 'relaxat'}
                onChange={handleChange}
              />
              Relaxat
            </label>
            <label>
              <input
                type="radio"
                name="travelStyle"
                value="balanced"
                checked={formData.travelStyle === 'balanced'}
                onChange={handleChange}
              />
              Equilibrat
            </label>
            <label>
              <input
                type="radio"
                name="travelStyle"
                value="intensiu"
                checked={formData.travelStyle === 'intensiu'}
                onChange={handleChange}
              />
              Intensiu
            </label>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Genera el meu itinerari
        </button>
      </form>
    </div>
  );
};

export default TripForm;
