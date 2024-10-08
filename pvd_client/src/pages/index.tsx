"use client";

import React, { useEffect, useState } from 'react'

// import * as Blockly from 'blockly';

function index() {
  // Passes the ID.
  // const workspace = Blockly.inject(document.getElementById('blocklyDiv'), { /* config */ });
        

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

        // Require Blockly core.
    const Blockly = require('blockly/core');
    // Require the default blocks.
    const libraryBlocks = require('blockly/blocks');
    // Require a generator.
    const {javascriptGenerator} =  require('blockly/javascript');
    // Require a message file.
    const En = require('blockly/msg/en');
    Blockly.setLocale(En);

    const [windowWidth, setWindowWidth] = useState(0);
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
      if (typeof window !== 'undefined') {
        const workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });
      }
    }, []);
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      
      // <div style={{ display: 'flex', flexDirection: windowWidth < 1200 ? 'column' : 'row' }}>
      //   <div style={{ flex: 1, padding: '10px', border: '0px solid black' }}>
      //       <section className="controls">
      //       <div className="tabs">
      //           <button className="tab active">Control</button>
      //           <button className="tab">Move</button>
      //           <button className="tab">Draw</button>
      //       </div>
      //       <div className="block-area">
      //           <div className="block"></div>
      //           <div className="block"></div>
      //           <div className="block"></div>
      //       </div>
      //       </section>
      //   </div>
      //   <div style={{ flex: 1, padding: '10px', border: '0px solid black' }}>
      //   <section className="display-area">
      //       <div className="screen"></div>
      //       <div className="buttons">
      //           <button className="btn stop"></button>
      //           <button className="btn play"></button>
      //           <button className="btn circle"></button>
      //       </div>
      //   </section>
      //   </div>
      // </div>
      <div id="blocklyDiv" style={{ height: '480px', width: '600px', backgroundColor: "#fff"}}></div>
    )
    
}

export default index