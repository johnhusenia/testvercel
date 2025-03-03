import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DisplayList3 = ({ category, sort, count }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from API
        axios.get('https://testvercel-drab-alpha.vercel.app/api/alldata')
            .then(response => {
                const fetchedData = response.data;
                
                // Filter the data based on category
                const filteredData = fetchedData.filter((item) => {

                        return item.category === category;  
         
                });

                // Sort the filtered data based on 'sort' prop (rating or date)
                const sortedData = filteredData.sort((a, b) => {
                    if (sort === "rating") {
                        return b.ratings.IMDb - a.ratings.IMDb;  // Sort by IMDb rating (highest to lowest)
                    } else if (sort === "date") {
                        return new Date(b.releaseDate) - new Date(a.releaseDate);  // Sort by release date (most recent first)
                    }
                    return 0;  // No sorting if neither 'rating' nor 'date' is passed
                });

                
                setData(sortedData);
            })
            .catch(error => {
                setError('Failed to load movie data');
                console.error('Error fetching movie data:', error);
            });
    }, [category, sort]);  

    if (error) {
        return <div>{error}</div>;
    }

 return (
        <div>

    
<ul className="movie-list">
  {data.slice(0, count).map((data, index) => (
    <li key={index} className="movie-item genre">
      <Link to={`/data/${data._id}`} className="movie-link">
        <img src={data.posterUrl} alt={data.title || "No title"} />
        <p>
          {data.title.length > 20 
            ? `${data.title.slice(0, 10)}...` 
            : data.title} 
        </p>
      </Link>
    </li>
  ))}
</ul>

        </div>
      );
};

export default DisplayList3;
