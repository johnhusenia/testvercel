import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidenav from './Sidenav';

const DataDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://testvercel-drab-alpha.vercel.app/api/data/${id}`)
            .then(response => {
                setData(response.data);  
            })
            .catch(error => {
                setError('Failed to load movie details');
                console.error('Error fetching movie data:', error);
            });
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex' }}>
    
        <Sidenav />
    
    
        <div className="main-content">
            <h1>{data.title} ({data.releaseYear})</h1>
            <img src={data.posterUrl} alt={`${data.title} poster`} />
            <p><strong>Genre:</strong> {data.genre.join(', ')}</p>
            <p><strong>Duration:</strong> {data.duration} minutes</p>
            <p><strong>Language:</strong> {data.language}</p>
            <p><strong>Description:</strong> {data.description}</p>
            <p><strong>Director(s):</strong> {data.director}</p>
            <p><strong>Writer(s):</strong> {data.writers.join(', ')}</p>
            <h4>Cast:</h4>
            <ul>
                {data.cast.map((actor, index) => (
                    <li key={index}>
                        <strong>{actor.name}</strong> as <em>{actor.role}</em>
                    </li>
                ))}
            </ul>
            <p><strong>Release Date:</strong> {data.releaseDate}</p>
            <p><strong>Production Company:</strong> {data.productionCompany}</p>
            <p><strong>Country:</strong> {data.country}</p>
            <p><strong>Budget:</strong> ${data.budget.toLocaleString()}</p>
            {data.boxOffice !== null && (
            <p><strong>Box Office:</strong> ${data.boxOffice.toLocaleString()}</p>
            )}
            <h4>Awards:</h4>
            <ul>
                {data.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default DataDetail;
