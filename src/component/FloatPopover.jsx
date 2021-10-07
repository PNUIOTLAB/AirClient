import Fab from '@mui/material/Fab';
import React,{useState,useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Slider from './Slider'

export default function FloatingActionPopover({room,init}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
      console.log("room",room)
      console.log("room",init)

    },[room,init])
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
        <>
            <Fab 
                color="secondary" 
                aria-label="edit"
                size="small" 
                style={{position:'absolute', left:'25px', bottom:'25px'}}
                aria-describedby={id}
                onClick={handleClick}
            >
                <EditIcon />
            </Fab>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
            <Typography sx={{ p: 5 }}>
                <Slider mark={"°C"} room={room} init={init.initTemp}/>
                <Slider mark={"%"} room={room} init={init.initHumid}/>
            </Typography>
        </Popover>
      </>
    )
}