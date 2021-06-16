import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from '../axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const baseUrl = "https://image.tmdb.org/t/p/original/"

function Row({title, fetchUrl, isLargeRow}) {

    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    // when row component loads this code runs and pull information for tmdb
    useEffect(() => {
        
        // when grabbing data from an external api better to use 
        // an asynchronous function so to not stall the site
        async function fetchData () {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
        }
        fetchData()

    },[fetchUrl])

    const opts = {
        height:"390",
        width:"100%",
        playersVars : {
            autoplay:1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.name || movie?.original_title || "")
            .then((url) => {
                //will give us the video id
            // urlsearchparmas allows us to do a get
            const urlParams = new URLSearchParams(new URL(url).search)
            setTrailerUrl(urlParams.get("v")) // --> give us the value of v, the id
            })
            .catch(err => console.log(err.message))
        }
    // movie trailer tries to find a trailer for it (returns a promise)
    }


    return (
        <Container>
            <h2>{title}</h2>

            <ImagesContainer>
                {
                    movies.map(movie => (
                        <img 
                          key={movie.id}
                          onClick={() => handleClick(movie)}
                          className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                          src={`${baseUrl}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                          alt={movie.name} 
                        />
                    ))
                }
            </ImagesContainer>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </Container>
    )
}

export default Row

const Container = styled.div`
    margin-left:20px;
    color:white;
`

const ImagesContainer = styled.div`
    display:flex;
    overflow-y:hidden;
    overflow-x:scroll;

    ::-webkit-scrollbar {
        display:none;
    }
    .row__poster{
        object-fit:contain;
        width:100%;
        max-height:100px;
        transition:transform 450ms;
        margin-right:10px;
        padding:10px;
        cursor:pointer;

        :hover {
            transform:scale(1.08);
        }
        
    }
    .row__posterLarge {
        max-height:250px;
        :hover {
            transform:scale(1.09);   
        }
    }
`