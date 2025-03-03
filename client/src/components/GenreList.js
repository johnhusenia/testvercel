import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles

const GenreList = ({ data, category }) => {
  const groupByGenre = () => {
    const genreMap = {};

    data.forEach((data) => {
      data.genre.forEach((g) => {
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
          <Swiper
            spaceBetween={-20}
            slidesPerView={7}
            loop={true} // Enable loop mode
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 7,
              },
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className="genre-swiper"
          >
            {contentByGenre[genre].map((data) => (
              <SwiperSlide key={data._id} className="movie-item genre">
                <Link
                  to={`/${category ? `${category}/` : ''}data/${data._id}`}
                  className="movie-link"
                >
                  <img src={data.posterUrl} alt={data.title} />
                  <p>{data.title} ({data.releaseYear})</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default GenreList;
