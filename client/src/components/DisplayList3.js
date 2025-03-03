import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayList3 = ({ category, sort, counter,title }) => {
    const getCount = useCallback(() => (window.innerWidth < 600 ? 3 : counter), [counter]);
    const [count, setCount] = useState(getCount);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from API
        axios
            .get("https://testvercel-drab-alpha.vercel.app/api/alldata")
            .then((response) => {
                const fetchedData = response.data;

                // Filter data by category
                const filteredData = fetchedData.filter((item) => item.category === category);

                // Sort filtered data
                const sortedData = [...filteredData].sort((a, b) => {
                    if (sort === "rating") {
                        return b.ratings.IMDb - a.ratings.IMDb; // Sort by IMDb rating (highest to lowest)
                    } else if (sort === "date") {
                        return new Date(b.releaseDate) - new Date(a.releaseDate); // Sort by release date (most recent first)
                    }
                    return 0; // Keep the original order if no sorting type is passed
                });

                setData(sortedData);
            })
            .catch((error) => {
                setError("Failed to load movie data");
                console.error("Error fetching movie data:", error);
            });
    }, [category, sort]);

    useEffect(() => {
        const handleResize = () => setCount(getCount);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [getCount]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="floating-box">
                                              <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
                                                  {title}
                                              </h1>
            <ul className="movie-list">

                {data.slice(0, count).map((movie, index) => (
                    <li key={index} className="movie-item genre">
                        <Link to={`/data/${movie._id}`} className="movie-link">
                            <img src={movie.posterUrl} alt={movie.title || "No title"} />
                            <p>
                                {movie.title.length > 20
                                    ? `${movie.title.slice(0, 20)}...`
                                    : movie.title}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayList3;
