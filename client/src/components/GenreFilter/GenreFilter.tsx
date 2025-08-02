import React from 'react';
import { NewsGenre } from '../../types';
import './GenreFilter.css';

interface GenreFilterProps {
    selectedGenre: string | null;
    onGenreChange: (genre: string | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onGenreChange }) => {
    // const GENRE_COLORS = {
    //     [NewsGenre.TECHNOLOGY]: { base: '#e74c3c', dark: '#c0392b' },
    //     [NewsGenre.BUSINESS]: { base: '#3498db', dark: '#2980b9' },
    //     [NewsGenre.HEALTH]: { base: '#27ae60', dark: '#229954' },
    //     [NewsGenre.OTHER]: { base: '#95a5a6', dark: '#7f8c8d' },
    //     'all': { base: '#6c757d', dark: '#495057' }
    // };

    // const getGenreColors = (genre: string | null) => {
    //     const key = genre || 'all';
    //     return GENRE_COLORS[key as keyof typeof GENRE_COLORS] || GENRE_COLORS['all'];
    // };

    const genres = [
        { value: null, label: 'All Genres', base: '#6c757d', active: '#495057' },
        { value: NewsGenre.TECHNOLOGY, label: 'Technology', base: '#e74c3c', active: '#c0392b' },
        { value: NewsGenre.BUSINESS, label: 'Business', base: '#3498db', active: '#2980b9' },
        { value: NewsGenre.HEALTH, label: 'Health', base: '#27ae60', active: '#229954' },
        { value: NewsGenre.OTHER, label: 'Other', base: '#95a5a6', active: '#7f8c8d' },
    ];

    return (
        <div className="genre-filter">
            <label className="genre-filter__label">Filter by genre:</label>
            <div className="genre-filter__buttons">
                {genres.map((genre) => {
                    const isActive = selectedGenre === genre.value;
                    
                    return (
                        <button
                            key={genre.value || 'all'}
                            onClick={() => onGenreChange(genre.value)}
                            className={`genre-filter__button ${
                                isActive ? 'genre-filter__button--active' : ''
                            }`}
                            style={{
                                backgroundColor: isActive ? genre.active : 'white',
                                borderColor: genre.base,
                                color: isActive ? 'white' : genre.base,
                            }}
                        >
                            {genre.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default GenreFilter;
