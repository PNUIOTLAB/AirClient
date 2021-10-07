import React,{useState,useEffect} from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
const axios = require('axios')


export default function DiscreteSliderLabel({mark,room,init}) {
  // const [sliderValue, setSliderValue]= useState(0)
  const [apiData, setApiData]= useState({})
  console.log("[Props in Slider]",mark,room,init)

  const marks = [
    {
      value: 0,
      label: `0${mark}`,
    },
    {
      value: 20,
      label: `20${mark}`,
    },
    {
      value: 37,
      label: `37${mark}`,
    },
    {
      value: 100,
      label: `100${mark}`,
    },
  ];
  
  function valuetext(value) {
    return `${value}`;
  }

  const handleChange = (event, newValue) => {
    // setSliderValue(newValue);
    const tmpApiData = mark==="%"? 
      {"Room":room.toString(), "setHumid":newValue,"setTemp":0,}: 
      {"Room":room.toString(),"setHumid":0,"setTemp":newValue}
    setApiData(tmpApiData)
  };

  useEffect(()=>{
    console.log("[api data in Slider]", apiData)

    if(apiData.Room){ 
      axios.post('/EnvirSignal',apiData)
      .then((res)=>{
        console.log("[DATA] : ",res.data)
      })
    }

  },[apiData])


  return (
        <Box sx={{ width: 300 }}>
            <Slider
                aria-label="Always visible"
                defaultValue={init}
                getAriaValueText={valuetext}
                step={10}
                marks={marks}
                onChange={handleChange}
                valueLabelDisplay="on"
            />
        </Box>
  );
}