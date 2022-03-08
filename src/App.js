import styled from 'styled-components'
import img from './image/logo.png'
import search from './image/search.png'
import cover from './image/cover.gif'
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';
import { useState } from 'react';
import Axios from 'axios';
export const API_KEY = "a9118a3a";

const Container = styled.div`
    display:flex;
    flex-direction:column;
`;

const Header =styled.div`
    display:flex;
    flex-direction:row;
    background-color:black;
    color:white;
    padding:10px;
    height:50px;
    align-items:center;
    font-size:25px;
    font-weight:bold;
    box-shadow: 0 3px 6px 0 #555;
    justify-content:space-between;
    align-item:center;
`;

const AppName = styled.div`
    display :flex;
    flex-direction : row;
    align-items : center;
`;

const MovieImage=styled.img`
    width:48px;
    height:60px;
    margin:15px;
`;

const SearchBox = styled.div`
    display:flex;
    flex-direction:row;
    padding: 10px 10px;
    background-color:white;
    border-radius:6px;
    margin-left:20px;
    width:50%;
    background-color:white;
    align-items:center;
    height:20px;
    margin-right:20px;
`;

const SearchIcon = styled.img`
    width:32px;
    height:32px;
`;

const SearchInput = styled.input`
    border:none;
    color:black;
    font-size:16px;
    outline:none;
    margin-left:15px;
    font-family:'poppins';
`;

const MovieListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap : wrap;
    padding:30px;
    gap:24px;
    justify-content:space-evenly;

`;

const Placeholder = styled.img`
  width: 100%;
  height: 100%;
  margin:0;
  padding:0;
`;

function App() {
  
  const [searchQuery, updateSearchQuery] = useState();   //manage search//
  
  const [timeoutId, updateTimeoutId] = useState();     //debouncing//

  const [movieList, updateMovieList] = useState([]);      // using for movielist//

  const [selectedMovie, onMovieSelect] = useState();         // using  for movie info

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
     updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
     <Header>
        <AppName>
          <MovieImage src={img}/>
         React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src={search}></SearchIcon>
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
       </Header>
        {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
         <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src={cover} />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
