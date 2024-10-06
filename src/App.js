import React, { useState, useEffect } from 'react';
import CountryGrid from './components/CountryGrid';
import CountryDetails from './components/CountryDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import { fetchAllCountries } from './services/api';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllCountries().then(setCountries);
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const toggleFavorite = (country) => {
    const newFavorites = favorites.some(fav => fav.cca3 === country.cca3)
        ? favorites.filter(fav => fav.cca3 !== country.cca3)
        : [...favorites, country];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
      <div className="app">
        <h1>World Countries Explorer</h1>
        <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
        />
        <div className="main-content">
          <div className="left-column">
            <CountryGrid
                countries={countries}
                searchTerm={searchTerm}
                onCountrySelect={setSelectedCountry}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
            />
          </div>
          <div className="right-column">
            {selectedCountry && (
                <CountryDetails
                    country={selectedCountry}
                    isFavorite={favorites.some(fav => fav.cca3 === selectedCountry.cca3)}
                    toggleFavorite={toggleFavorite}
                />
            )}
            <FavoritesList
                favorites={favorites}
                onCountrySelect={setSelectedCountry}
            />
          </div>
        </div>
      </div>
  );
}

export default App;