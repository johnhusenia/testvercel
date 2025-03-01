import React from 'react';
import { Link } from 'react-router-dom';


const GenreList = ({ data,category }) => {
  const groupByGenre = () => {
    const genreMap = {};

    data.forEach(data => {
      data.genre.forEach(g => {
        if (!genreMap[g]) {
          genreMap[g] = [];
        }
        genreMap[g].push(data);
      });
    });
    return genreMap;
  };

  const contentByGenre = groupByGenre();

  return (
    <div>
      {Object.keys(contentByGenre).map((genre) => (
        <div key={genre} className="genre-container">
          <h2 className="genre-title">{genre}</h2>
          <div className="genre-list">
            {contentByGenre[genre].map((data) => (
              <li key={data._id} className="movie-item genre">
              <Link to={`/data/${data._id}`} className="movie-link">
                <img src={data.posterUrl} alt={data.title} />
                <p>{data.title} ({data.releaseYear})</p>
              </Link>
            </li>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenreList;
