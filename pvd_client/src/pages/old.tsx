import React, { useEffect, useState } from 'react'

function index() {

  const [message, setMessage] = useState("Loading")

  // const telemFetch = () => {
  //   fetch("http://lcoalhost:8080/api/telemetry").then(
  //     response => response.json()).then(
  //       data => setMessage(message => ({
  //         ...message,
  //         ['name']: data.results[0].name.first
  //       })))
  //     .catch(error => console.error(error));
  // };


  useEffect(() => {
    fetch("http://localhost:8080/api/telemetry").then(
      response => response.json()
    ).then(
      data => {
        console.log(data);
        setMessage(data.message);
      } 
    )
  }, [])

  return (
    <div>{message}</div>
  )
}

export default index
"use client";