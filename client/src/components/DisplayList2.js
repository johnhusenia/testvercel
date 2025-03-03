import React from 'react';
import { Link } from 'react-router-dom';

const DisplayList = ({ category, sort }) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://testvercel-drab-alpha.vercel.app/api/alldata')
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setError('Failed to load movie data');
                console.error('Error fetching movie data:', error);
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    const filteredData = data.filter((item) => {
        if (category === "Movies") {
            return item.type === "movie";  
        } else if (category === "Series") {
            return item.type === "series"; 
        }
        return true; 
    });

  
    useEffect(() => {
        const sortedData = [...filteredData].sort((a, b) => {
            if (sort === "rating") {
                return b.ratings.IMDb - a.ratings.IMDb; 
            } else if (sort === "date") {
                return new Date(b.releaseDate) - new Date(a.releaseDate); 
            }
            return 0; 
        });

        setData(sortedData);
    }, [filteredData, sort]); 

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
