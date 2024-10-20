// import { getLatLngObj } from "tle.js";
// import fetch from 'node-fetch';
const tle = require("tle.js");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;








app.use(cors());

app.get("/api/home", (req, res) => {
    console.log("this is home");
    res.json({ message: "Hello World!" });
});

app.get("/api/telemetry", (req, res) => {
    fetch('https://network.satnogs.org/api/observations/?id=&status=&ground_station=&start=&end=&satellite__norad_cat_id=&transmitter_uuid=ZJxCeQmih9zDfYNVrB4wRN&transmitter_mode=&transmitter_type=&waterfall_status=&vetted_status=&vetted_user=&observer=&start__lt=&observation_id=', {
        method: 'GET'
      }).then(response => {
        // tle calculations
        response.json().then((data) => {
        
        const tleString = data[0]['tle0']+'\n'+data[0]['tle1']+'\n'+data[0]['tle2'];
        res.json(tle.getLatLngObj(tleString));
      })
        // let resString = response.json();
    // console.log(resString);
        
      })
      .catch(err => {console.log(err);});
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

let grid = new Array(64 * 256).fill(0);

app.use(express.json());

app.get('/api/getGrid', (req, res) => {
  res.json({ grid });
});

app.post('/api/updateGrid', (req, res) => {
  const { x, y, on } = req.body;
  const index = y * 256 + x;
  if (index >= 0 && index < grid.length) {
    grid[index] = on;
    res.status(200).send('Grid updated');
  } else {
    res.status(400).send('Invalid coordinates');
  }
  console.log(grid)
});

app.post('/api/clearGrid', (req, res) => {
    grid.fill(0);
    res.status(200).send('Grid cleared');
  });
