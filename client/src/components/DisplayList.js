import React from 'react';
import { Link } from 'react-router-dom';

const DisplayList = ({ data,category }) => {

    return (
        <div>
          <h1>{category}</h1>
    
          <ul className="movie-list">
            {data.map((data, index) => (
              <li key={index} className="movie-item genre">
                <Link to={`/data/${data._id}`} className="movie-link">
                  <img src={data.posterUrl} alt={data.title || 'No title'} />
                  <p>{data.title} ({data.releaseDate})</p>
                </Link>
              </li>
            ))}
            <Link to={`/${category}`} className="movie-link">
            <li className="movie-item genre more-container">
            <div className="more-text">
              <p>More</p>
            </div>
          
        </li>
        </Link>
          </ul>
        </div>
      );
};

export default DisplayList;
