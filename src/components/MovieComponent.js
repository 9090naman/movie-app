
import styled from 'styled-components'

const MovieContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding:10px;
    width:280px;
    box-shadow:0 8px 10px 0 black;
    cursor:pointer;
`;

const CoverImage = styled.img`
    object-fit:cover;
    height:362px;  
`;

const MovieName = styled.span`
    font-size:18px;
    font-weight:400;
    color:black;
    margin: 15px 0;
    white-space:nowrap;
    text-overflow :ellipsis;
    overflow:hidden;
`;

const InfoColumn = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
`;

const MovieInfo = styled.div`
    font-size:16px;
    font-weight: 500;
    color:black;
    text-transform:capitalize;
`;

const MovieComponent = (props) => {
    const { Tilte, Year, imdbID, Type, Poster } = props.movie;
  return (
    <MovieContainer onClick={()=> props.onMovieSelect(imdbID)}>
        <CoverImage src={Poster}/>
        <MovieName>{Tilte}</MovieName>
        <InfoColumn>
            <MovieInfo>Year: {Year}</MovieInfo>
            <MovieInfo>Type: {Type}</MovieInfo>
        </InfoColumn>
    </MovieContainer>
  )
}

export default MovieComponent