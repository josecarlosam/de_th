import React from 'react';

const FavoritesList = ({ favorites, onCountrySelect }) => {
    return (
        <div className="favorites-list">
            <h2>Favorite Countries</h2>
            {favorites.length === 0 ? (
                <p>No favorite countries yet.</p>
            ) : (
                <ul>
                    {favorites.map(country => (
                        <li key={country.cca3} onClick={() => onCountrySelect(country)}>
                            {country.name.common}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesList;