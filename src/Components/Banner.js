import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '../axios'
import requests from '../requests'

function Banner() {

    const [movie, setMovie] = useState([])

    // runs once when the banner component loads
    useEffect(() => {
        async function fetchData () {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
        }
        fetchData()
    }, [])

    function truncate (str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str
    }

    return (
        <Container style={{
          backgroundSize:"cover",
          backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"`,
          backgroundPosition:"center center",
        }}
        >
            <BannerContent>
                <h1 className="title">
                    {/* If movie title doesnt exist move on */}
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <Buttons>
                    <button>Play</button>
                    <button>My List</button>
                </Buttons>
                <h1 className="description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </BannerContent>
            <FadeBottom/>
        </Container>
    )
}

export default Banner

const Container = styled.div`
    color:white;
    object-fit:contain;
    height:448px;
`

const BannerContent = styled.div`
    margin-left:30px;
    padding-top:140px;
    height:190px;

    .title {
        font-size:3rem;
        font-weight:800;
        padding-bottom:0.3rem;
    }
    .description {
        width:45rem;
        line-height:1.3;
        padding:1rem 1rem 1rem 0;
        font-size:0.8rem;
        max-width:360px;
        height:80px;
    }
`

const Buttons = styled.div`
    button {
        cursor:pointer;
        color:#fff;
        outline:none;
        border:none;
        font-weight:700;
        border-radius:0.2vw;
        padding-left:2rem;
        padding-right:2rem;
        margin-right:1rem;
        padding-top:0.5rem;
        background-color:rgba(51,51,51,0.5);
        padding-bottom:0.5rem;

        :hover {
            color:#000;
            background-color:#e6e6e6;
            transition:all 0.2s;
        }
    }
`

const FadeBottom = styled.div`
    height:7.4rem;
    background-image: linear-gradient(
        180deg,
        transparent,
        rgba(37,37,36, 0.61),
        #111
    );
`