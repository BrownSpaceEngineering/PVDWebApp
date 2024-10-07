"use client";

import React, { useEffect, useState } from 'react'

function index() {

  const [message, setMessage] = useState("loading...")

    useEffect(() => {
        fetch("http://localhost:8080/api/home").then(
        response => response.json()
        ).then(
          data => {
            console.log(data)
            setMessage(data.message)
          }
        )
    },[])
    
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: windowWidth < 1200 ? 'column' : 'row' }}>
        <div style={{ flex: 1, padding: '10px', border: '0px solid black' }}>
            <section className="controls">
            <div className="tabs">
                <button className="tab active">Control</button>
                <button className="tab">Move</button>
                <button className="tab">Draw</button>
            </div>
            <div className="block-area">
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
            </div>
            </section>
        </div>
        <div style={{ flex: 1, padding: '10px', border: '0px solid black' }}>
        <section className="display-area">
            <div className="screen"></div>
            <div className="buttons">
                <button className="btn stop"></button>
                <button className="btn play"></button>
                <button className="btn circle"></button>
            </div>
        </section>
        </div>
      </div>
        
        
    )
}

export default index