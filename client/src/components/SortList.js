import React from 'react';
import { Link } from 'react-router-dom';

const MovieDisplay = ({ data, setContent,category }) => {
  const sortDataByReleaseDate = () => {
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      return dateA - dateB; // Ascending order
    });
    setContent(sorted);
  };

  // Function to sort alphabetically by movie title
  const sortDataAlphabetically = () => {
    const sorted = [...data].sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setContent(sorted);
  };

  return (
    <div>

        <div className="button-container">
          <div className="sort-buttons">
            <button onClick={sortDataByReleaseDate} className="sort-button">
              Sort by Release
            </button>
            <button onClick={sortDataAlphabetically} className="sort-button">
              Sort by Name
            </button>
          </div>
        </div>

      <ul className="movie-list">
        {data.map((data, index) => (
            <li key={index} className="movie-item genre">
            <Link to={`/data/${data.id}`} className="movie-link">
                <img src={data.posterUrl} alt={data.title || 'No title'} />
                <div className="data-text">
                <p>{data.title} ({new Date(data.releaseDate).getFullYear()})</p>
                </div>
            </Link>
            </li>


        ))}
      </ul>
    </div>
  );
};

export default MovieDisplay;
