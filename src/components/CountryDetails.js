import React from 'react';

const CountryDetails = ({ country, isFavorite, toggleFavorite }) => {
    return (
        <div className="country-details">
            <h2>{country.name.common}</h2>
            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={{ width: '150px', marginBottom: '15px' }} />
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
            <p><strong>Currencies:</strong> {Object.values(country.currencies || {}).map(c => `${c.name} (${c.symbol})`).join(', ')}</p>
            <button className="favorite-button" onClick={() => toggleFavorite(country)}>
                {isFavorite ? '❤️ Remove from favorites' : '🤍 Add to favorites'}
            </button>
        </div>
    );
};

export default CountryDetails;