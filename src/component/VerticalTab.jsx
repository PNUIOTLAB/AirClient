import React,{useEffect,useState,useRef} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ControlTab from './ControlTab';
import {LineChart} from './Chart';
import { SettingsOverscanTwoTone } from '@mui/icons-material';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>
                        {children}
                    </Typography>
                </Box>
            )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTab() {
    const [value, setValue] = React.useState(0);
    const [socketConnected, setSocketConnected] = useState(false);
    const [sendMsg, setSendMsg] = useState(false);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState([]);
    const [item101,setItem101] = useState({});
    const [item102,setItem102] = useState({});

    const webSocketUrl = 'ws://localhost:9000/ws';
    let ws = useRef(null)

    useEffect(() => {
        if (!ws.current) {
          ws.current = new WebSocket(webSocketUrl);
          ws.current.onopen = () => {
            console.log("connected to " + webSocketUrl);
            setSocketConnected(true);
          };
          ws.current.onclose = (error) => {
            console.log("disconnect from " + webSocketUrl);
            console.log(error);
          };
          ws.current.onerror = (error) => {
            console.log("connection error " + webSocketUrl);
            console.log(error);
          };
          ws.current.onmessage = (evt) => {
            const data = JSON.parse(evt.data);
            if(data.Room){
                if(data.Room===101) setItem101(data)
                if(data.Room===102) setItem102(data)
            }
            setItem(data);
            setItems((prevItems) => [...prevItems, data]);
          };
        }
    
        return () => {
          console.log("clean up");
          ws.current.close();
        };
    }, []);

    useEffect(()=>{
        console.log("[WebSocket Data]",items);
    },[items])

    // useEffect(()=>{
    //     console.log("[WebSocket Data]",items);
    // },[item])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        style={{width:'100%', height:'100%'}}
    >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
            <Tab label="ROOM 101" {...a11yProps(0)} />
            <Tab label="ROOM 102" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
            <div style={{height:'400px', width:'850px'}}>
                <LineChart data={item101}/>
            </div>
            <ControlTab/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <ControlTab/>
        </TabPanel>
    </Box>
    );
}