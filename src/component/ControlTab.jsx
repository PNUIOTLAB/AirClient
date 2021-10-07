import React,{useEffect,useState,useCallback} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const axios = require('axios')


export default function BasicButtons({room,init}) {
  const [devicesCheck, setDevicesCheck] = React.useState({});
  const [devicesList,setDevicesList] = useState(["AC","Boiler","Dehumidifier","Humidifier","AirCleaner","Fan"]);

  useEffect(()=>{

    let initData = {}
    initData.AC= init.AC!==undefined?init.AC:null
    initData.AirCleaner= init.AirCleaner!==undefined?init.AirCleaner:null
    initData.Boiler= init.Boiler!==undefined?init.Boiler:null
    initData.Dehumidifier= init.Dehumidifier!==undefined?init.Dehumidifier:null
    initData.Fan= init.Fan!==undefined?init.Fan:null
    initData.Fire= init.Fire!==undefined?init.Fire:null
    initData.Humidifier= init.Humidifier!==undefined?init.Humidifier:null

    console.log("[INIT control Tab] : ",initData)
    setDevicesCheck(initData)
  },[init])

  const handleChange = useCallback((event) => {
    const switchValue = devicesCheck[event.target.value]
    // ========================
    console.log("[Before Axios] : ",devicesCheck)
    let apiParam = {}
    devicesList.map((e)=>{
      apiParam[e]=null
    })
    // let apiParam = {...devicesCheck }
    apiParam[event.target.value]=!switchValue
    apiParam.Room = room.toString()
    axios.post('/DeviceSignal',apiParam )
      .then((res)=>{
        console.log("[Controller Axios] : ",res.data)
      })
    // ======================== 
    setDevicesCheck((prevDevice)=>({...prevDevice, [event.target.value]:!switchValue}))
  },[devicesCheck,devicesList]);

  // useEffect(()=>{

  // },[devicesCheck,room])

  return (
      <FormGroup 
        row 
        sx={{ml:10}}
      >
        {devicesList.map((device)=>(
          <FormControlLabel 
            control={
              <Switch  
                checked={devicesCheck[device]}
                onChange={handleChange} 
                value={device}
              />
            } 
            label={device} 
            sx={{color : 'text.primary'}}
          />
        ))} 
      </FormGroup>
  );
}