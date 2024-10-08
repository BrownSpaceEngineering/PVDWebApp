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
    <div style={{ display: 'flex', flexDirection: windowWidth < 1200 ? 'column' : 'row' }}>
      <div id="blocklyDiv" style={{ height: "75vh", width: windowWidth < 1200 ? "100%" : "50%" }}></div>
      <div style={{ flex: 1, padding: '10px', border: '0px solid black' }}>
        <section className="display-area">
          <div className="screen"></div>
        </section>
      </div>
    </div>
  )
}

export default Index