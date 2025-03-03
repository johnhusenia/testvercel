import React from 'react';
import { Link } from 'react-router-dom';

const DisplayList = ({ data,category }) => {

    return (
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: 'white' 

          }}>
            {category}</h1>
    
          <ul className="movie-list">
            {data.map((data, index) => (
              <li key={index} className="movie-item genre">
                <Link to={`/data/${data._id}`} className="movie-link">
                  <img src={data.posterUrl} alt={data.title || 'No title'} />
                  <div className="data-text">
                  <p>{data.title} ({new Date(data.releaseDate).getFullYear()})</p>
                  </div>
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
