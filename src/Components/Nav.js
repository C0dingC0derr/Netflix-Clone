import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import "./Nav.css"

function Nav() {

    const [show,handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            (window.scrollY > 100) ? handleShow(true) : handleShow(false)
        })
        // if useEffect is called again before firing off code,
        // do the return (cleans up previous useEffect)
        return () => {
            window.removeEventListener("scroll")
        }
    }, [])

    return (
        <Container className={`${show && "nav__black"}`}>
            <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png" alt="Netflix Logo" /> 
        
            <img className="avatar" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="Profile Pic" />
        </Container>
    )
}

export default Nav

const Container = styled.div`
    position:fixed;
    top:0;    
    display:flex;
    justify-content:space-between;
    width:100%;
    padding:20px;
    height:30px;
    z-index:1;

    .logo {
        position:fixed;
        left:20px;
        object-fit:contain;
        width:80px;
    }

    .avatar {
        position:fixed;
        right:20px;
        width:30px;
        object-fit:contain;
    }
`