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
    <div className="App">
      <h1>REST Countries</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="main-content">
        <CountryGrid
          countries={countries}
          searchTerm={searchTerm}
          onCountrySelect={handleCountrySelect}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
        {selectedCountry && (
          <CountryDetails
            country={selectedCountry}
            isFavorite={favorites.some(fav => fav.cca3 === selectedCountry.cca3)}
            toggleFavorite={toggleFavorite}
          />
        )}
      </div>
      <FavoritesList favorites={favorites} onCountrySelect={handleCountrySelect} />
    </div>
  );
}

export default App;