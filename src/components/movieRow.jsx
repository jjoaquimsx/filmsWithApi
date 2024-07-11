import "./movieRow.css";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

import { useEffect, useState } from "react";

const moviesUrl = import.meta.env.VITE_API_TOP_RATED;
const apiKey = import.meta.env.VITE_API_KEY;
const img = import.meta.env.VITE_IMG;
const netflix = import.meta.env.VITE_API_NETFLIX_ORIGINALS;

export default function MovieRow() {
  const [topMovies, setTopMovies] = useState([]);
  const [netflixOriginals, setNetflixOriginals] = useState([]);
  const [featuredData, setFeaturedData] = useState(null); // Alterado para null para inicialização correta
  const [scrollX, setScrollX] = useState(-400);
  const [moverX, setMoverX] = useState(-400);

  const handleRightArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleLeftArrow = () => {
    let x = scrollX - Math.round(window.innerWidth);
    let listW = netflixOriginals.length * 180;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };
  const handleRightArrowM = () => {
    let x = moverX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setMoverX(x);
  };

  const handleLeftArrowM = () => {
    let x = moverX - Math.round(window.innerWidth);
    let listW = netflixOriginals.length * 180;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setMoverX(x);
  };

  const getTopRated = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };

  const getNetflixOriginals = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    setNetflixOriginals(data.results);
    setFeaturedData(data.results[randomIndex]);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesUrl}?language=pt-BR&${apiKey}`;
    const netflixOriginalsUrl = `${netflix}&${apiKey}`;

    getTopRated(topRatedUrl);
    getNetflixOriginals(netflixOriginalsUrl);
  }, []);

  useEffect(() => {
    if (featuredData) {
      featuredData.first_air_date;
    }
  }, [featuredData]);

  return (
    <div className="contain">
      {featuredData && ( // Condicional para exibir os dados do filme em destaque
        <section
          className="featured"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredData.backdrop_path})`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="featured--vertical">
            <div className="featured--horizontal">
              <header className="feature--name">
                <h1>{featuredData.name}</h1>
              </header>
              <article className="featured--info">
                <span className="featured--points">
                  {featuredData.vote_average} pontos
                </span>
                <span className="featured--year">
                  {new Date(featuredData.first_air_date).getFullYear()}
                </span>
              </article>
              <footer
                style={{
                  maxWidth: "50vw",
                }}
              >
                <span className="featured--description">
                  {featuredData.overview}
                </span>
              </footer>
            </div>
          </div>
        </section>
      )}
      <nav className="originals">
        <h2>Originais Netflix</h2>
        <span className="right" onClick={handleRightArrow}>
          <AiFillCaretLeft color="#00ffb3" />
        </span>
        <span className="left" onClick={handleLeftArrow}>
          <AiFillCaretRight color="#08c18a" />
        </span>
        <section
          className="list"
          style={{
            marginLeft: scrollX,
            width: netflixOriginals.length * 180,
          }}
        >
          {netflixOriginals.map((movie) => (
            <div className="card" key={movie.id}>
              <img src={`${img}${movie.poster_path}`} alt={movie.name} />
            </div>
          ))}
        </section>
      </nav>
      <nav className="top">
        <h2>Mais Procurados</h2>
        <span className="right" onClick={handleRightArrowM}>
          <AiFillCaretLeft color="#00ffb3" />
        </span>
        <span className="left" onClick={handleLeftArrowM}>
          <AiFillCaretRight color="#00ffb3" />
        </span>

        <section
          className="list"
          style={{
            width: topMovies.length * 180,
            marginLeft: moverX,
          }}
        >
          {topMovies.length === 0 && <div className="spinner"></div>}
          {topMovies.length > 0 &&
            topMovies.map((movie) => (
              <div className="card" key={movie.id}>
                <img src={`${img}${movie.poster_path}`} alt={movie.title}></img>
              </div>
            ))}
        </section>
      </nav>
      <div className="footer">
        <h1>
          Criado por @
          <a href="https://www.instagram.com/jjoaquiim.sx/">joaquimsx</a>
        </h1>
        <span>
          <a href="https://github.com/jjoaquimsx">
            <FaGithub size={50} />
          </a>
          <a href="mailto:mf.joaquim2005@gmail.com" >
            <SiGmail size={50}/>
          </a>
        </span>
      </div>
    </div>
  );
}
