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
    return (
      
        <div>
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
        <section className="display-area">
            <div className="screen"></div>
            <div className="controls">
                <button className="btn stop"></button>
                <button className="btn play"></button>
                <button className="btn circle"></button>
            </div>
        </section>
        </div>
        
    )
}

export default index