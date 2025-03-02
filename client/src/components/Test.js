import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container } from "@mui/material";

const Layout = () => {
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
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* First Container - 75% height */}
      <Container
        maxWidth={false}
        sx={{
          height: "75vh",
          backgroundColor: "lightblue",
          overflowY: "auto",
          padding: 3,
        }}
      >
        <h1>
          {data.title} ({data.releaseYear})
        </h1>
        <img
          src={data.posterUrl}
          alt={`${data.title} poster`}
          style={{ width: "200px", height: "auto", marginBottom: "10px" }}
        />
        <p>
          <strong>Genre:</strong> {data.genre.join(", ")}
        </p>
        <p>
          <strong>Duration:</strong> {data.duration} minutes
        </p>
        <p>
          <strong>Language:</strong> {data.language}
        </p>
        <p>
          <strong>Description:</strong> {data.description}
        </p>
        <p>
          <strong>Director(s):</strong> {data.director}
        </p>
        <p>
          <strong>Writer(s):</strong> {data.writers.join(", ")}
        </p>
        <h4>Cast:</h4>
        <ul>
          {data.cast.map((actor, index) => (
            <li key={index}>
              <strong>{actor.name}</strong> as <em>{actor.role}</em>
            </li>
          ))}
        </ul>
        <p>
          <strong>Release Date:</strong> {data.releaseDate}
        </p>
        <p>
          <strong>Production Company:</strong> {data.productionCompany}
        </p>
        <p>
          <strong>Country:</strong> {data.country}
        </p>
        <p>
          <strong>Budget:</strong> ${data.budget.toLocaleString()}
        </p>
        {data.boxOffice !== null && (
          <p>
            <strong>Box Office:</strong> ${data.boxOffice.toLocaleString()}
          </p>
        )}
        <h4>Awards:</h4>
        <ul>
          {data.awards.map((award, index) => (
            <li key={index}>{award}</li>
          ))}
        </ul>
      </Container>

      {/* Second Container - 25% height */}
      <Container
        maxWidth={false}
        sx={{
          height: "25vh",
          backgroundColor: "lightcoral",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Second Container (25% Height)
      </Container>
    </Box>
  );
};

export default Layout;
