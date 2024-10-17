"use client";

import React, { useEffect, useRef, useState } from 'react'
import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
// import { exec } from 'child_process';


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

  const gridRef = useRef([]);

  // Inject
  Blockly.setLocale(En);


  Blockly.Blocks['pixel_set'] = {
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
        .appendField(new Blockly.FieldLabel('Set Pixel'));
      this.appendValueInput('X')
          .setCheck('Number')
          .appendField('X');
      this.appendValueInput('Y')
          .setCheck('Number')
          .appendField('Y');
      this.appendValueInput('On')
      .appendField('On')
      this.setNextStatement(true);
      this.setPreviousStatement(true);
    }
  }
  javascriptGenerator.forBlock['pixel_set'] = function(block, generator) {
    const x = generator.valueToCode(block, 'X', generator.ORDER_NONE) || '0';
    const y = generator.valueToCode(block, 'Y', generator.ORDER_NONE) || '0';
    const on = generator.valueToCode(block, 'On', generator.ORDER_NONE) || '0';
    return `setPixel(${x}, ${y}, ${on});\n`;
  }
  function setPixel(x, y, on) {
    const index = y * 256 + x;
    const pixels = gridRef.current;
    if (index >= 0 && index < pixels.length) {
      pixels[index].style.backgroundColor = on ? 'black' : 'white';
    }
  
  }
  
    Blockly.Blocks['run'] = {
      init: function() {
        this.setColour(160);
        this.appendDummyInput()
        .appendField(new Blockly.FieldLabel('Run'));
        this.setNextStatement(true);
      }
  }   
  Blockly.Blocks['end'] = {
    init: function() {
      this.setColour(160);
      this.appendDummyInput()
      .appendField(new Blockly.FieldLabel('End'));
      this.setPreviousStatement(true);
    }
}   

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
        "type": "logic_boolean"
      },
      {
        "kind": "block",
        "type": "math_arithmetic"
      },
      {
        "kind": "block",
        "type": "pixel_set"
      },  
      {
        "kind": "block",
        "type": "run"
      },   
      {
        "kind": "block",
        "type": "end"
      },   
    ]
  }

  
  // the red underline is annoying but if i get rid of it then there are two block windows! not sure why but this works!
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.blocklyInjected) {

      const ws = Blockly.inject('blocklyDiv', { toolbox: toolbox });
      window.blocklyInjected = true;

      const supportedEvents = new Set([
        Blockly.Events.BLOCK_CHANGE,
        Blockly.Events.BLOCK_CREATE,
        Blockly.Events.BLOCK_DELETE,
        Blockly.Events.BLOCK_MOVE,
      ]);

      const updateCode = function(event) {
        if (ws.isDragging()) return; // Don't update while changes are happening.
        if (!supportedEvents.has(event.type)) return;
        const code = javascriptGenerator.workspaceToCode(ws);
        try {
          eval(code); // Execute the generated code
        } catch (e) {
          console.error('Error executing code:', e);
        }      };
      ws.addChangeListener(updateCode);
    }
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (gridRef.current.length === 0) {
      const gridContainer = document.getElementById('gridContainer');
      const pixels = [];
      for (let y = 0; y < 64; y++) {
        for (let x = 0; x < 256; x++) {
          const pixel = document.createElement('div');
          pixel.style.width = '5px';
          pixel.style.height = '5px';
          pixel.style.display = 'inline-block';
          gridContainer.appendChild(pixel);
          pixels.push(pixel);
        }
      }
      gridRef.current = pixels;
    }
  }, []);


  return (
    <div>      
      <div id="gridContainer" style={{ display: 'grid', gridTemplateColumns: 'repeat(256, 5px)' }}></div>
      <div id="blocklyDiv" style={{ height: "60vh", width: "75vw" }}></div>
      
    </div>
  )
}

export default Index