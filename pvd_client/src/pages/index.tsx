"use client";

import React, { useEffect, useState } from 'react'

function Index() {        
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

  // Require Blockly core.
  const Blockly = require('blockly/core');
  // Require the default blocks.
  const libraryBlocks = require('blockly/blocks');
  // Require a generator.
  const {javascriptGenerator} =  require('blockly/javascript');
  // Require a message file.
  const En = require('blockly/msg/en');
  // Inject
  Blockly.setLocale(En);

  const toolbox = {
    "kind": "flyoutToolbox",
    "contents": [
      {
        "kind": "block",
        "type": "controls_if"
      },
      {
        "kind": "block",
        "type": "controls_repeat_ext"
      },
      {
        "kind": "block",
        "type": "logic_compare"
      },
      {
        "kind": "block",
        "type": "math_number"
      },
      {
        "kind": "block",
        "type": "math_arithmetic"
      },
      {
        "kind": "block",
        "type": "text"
      },
      {
        "kind": "block",
        "type": "text_print"
      },
    ]
  }

  // the red underline is annoying but if i get rid of it then there are two block windows! not sure why but this works!
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.blocklyInjected) {
      Blockly.inject('blocklyDiv', { toolbox: toolbox });
      window.blocklyInjected = true;
    }
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div style={{ flex: 1, padding: '10px', border: '0px solid black' }}>
        <section className="display-area">
          <div className="screen"></div>
        </section>
      </div>

      <div id="blocklyDiv" style={{ height: "60vh", width: "75vw" }}></div>
      
    </div>
  )
}

export default Index