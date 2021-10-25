import React,{useEffect,useState,useRef} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ControlTab from './ControlTab';
import {LineChart} from './Chart';
import { SettingsOverscanTwoTone } from '@mui/icons-material';
import FloatPopover from './FloatPopover';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    const [initTemp,setInitTemp] = useState({});
    const [initHumid,setInitHumid] = useState({});
    const [openRoom101Fire, setOpenRoom101Fire] = useState(false);
    const [openRoom102Fire, setOpenRoom102Fire] = useState(false);

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
                if(data.Room===101) {
                    setItem101(data)
                }
                if(data.Room===102){
                    setItem102(data)
                }
            }
            setItem(data);
            setItems((prevItems) => [...prevItems, data]);
          };
        }
    
        return () => {
          console.log("clean up");
          ws.current.send("close")
          ws.current.close();
        };
    }, []);

    useEffect(()=>{
        console.log("[WebSocket Data]",items);
    },[items])

    useEffect(()=>{
        console.log("[101]",item101)
        console.log("[102]",item102)

        if (value===0&&item101.StandTemp){
            setInitTemp(item101.StandTemp)
            setInitHumid(item101.StandHumid)
            if(item101.Fire){
                setOpenRoom101Fire(true)
            }
        }
        if (value===1&&item102.StandTemp){
            setInitTemp(item102.StandTemp)
            setInitHumid(item102.StandHumid)
            if(item102.Fire){
                setOpenRoom102Fire(true)
            }
        }
    },[value,item101,item102])

    // useEffect(()=>{
    //     if(socketConnected&&item.length!==0){
    //         if(item.Room) setInitTemp(item.StandTemp)
    //         if(item.StandHumid) setInitHumid(item.StandHumid)
    //     }
    // },[socketConnected,item,value])

    // useEffect(()=>{
    //     console.log("[WebSocket Data]",items);
    // },[item])

    const handleRoom101Close = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenRoom101Fire(false);
    };

    const handleRoom102Close = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenRoom102Fire(false);
    };

    const handleChange = (event, newValue) => {
        console.log("[humid & temp Room] : ",newValue)
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
            <ControlTab room={101} init={item101}/>
            <Snackbar open={openRoom101Fire} autoHideDuration={6000} onClose={handleRoom101Close}>
                <Alert onClose={handleRoom101Close} severity="warning" sx={{ width: '100%' }}>
                    Room 101에 화재가 발생했습니다!
                </Alert>
            </Snackbar>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <div style={{height:'400px', width:'850px'}}>
                <LineChart data={item102}/>
            </div>
            <ControlTab room={102} init={item102}/>
            <Snackbar open={openRoom102Fire} autoHideDuration={6000} onClose={handleRoom102Close}>
                <Alert onClose={handleRoom102Close} severity="warning" sx={{ width: '100%' }}>
                    Room 102에 화재가 발생했습니다!
                </Alert>
            </Snackbar>
        </TabPanel>
        <FloatPopover room={value+101} init={{"initTemp":parseInt(initTemp),"initHumid":parseInt(initHumid)}}/>
    </Box>
    );
}