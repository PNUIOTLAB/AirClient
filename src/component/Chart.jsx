import { ResponsiveBump } from '@nivo/bump'
import React,{useEffect,useState,useRef} from 'react';

// x는 시간으로 다 같게 넣고 Y 값만 다르게 넣자

let today = new Date();
let hours = today.getHours().toString();
hours = hours.length===1? '0'+hours:hours;
let minutes = today.getMinutes().toString();
minutes = minutes.length===1? '0'+minutes:minutes;
let seconds = today.getSeconds().toString();
seconds = seconds.length===1? '0'+seconds:seconds;
console.log(hours,minutes,seconds)
let nowTime=hours+minutes+ seconds
const dummyData = [
        {
            "id": "Co2",
            "data": [{
                "x": nowTime,
                "y": 0
              }
            ]
        },
        {
            "id": "Humid",
            "data": [{
                "x": nowTime,
                "y": 0
              }]
        },
        {
            "id": "Temp",
            "data": [{
                "x": nowTime,
                "y": 0
              }]
        },
        {
            "id": "PM10",
            "data": [{
                "x": nowTime,
                "y": 0
              }]
        },
        {
            "id": "PM25",
            "data": [{
                "x": nowTime,
                "y": 0
              }]
        }
    ]

export const LineChart = ({data}) => {
    const [datas, setDatas] = useState([])

    useEffect(()=>{
        setDatas(dummyData)
        console.log("[Data in chart]",data)
        if(data.Time){
            const chartTime = data.Time.substring(8)
            const tmpCo2Data = {"id": "Co2","data":[...datas[0].data, {"x" :chartTime,"y": parseInt(data.Co2)}]}
            const tmpHumidData = {"id": "Humid","data":[...datas[1].data, {"x" :chartTime,"y": parseInt(data.Humid)}]}
            const tmpTempData = {"id": "Temp","data":[...datas[2].data, {"x" :chartTime,"y": parseInt(data.Temp)}]}
            const tmpPM10Data = {"id": "PM10","data":[...datas[3].data,{"x" :chartTime,"y": data.PM10}]}
            const tmpPM25Data = {"id": "PM25","data":[...datas[4].data,{"x" :chartTime,"y": data.PM25}]}
            const chartData = [tmpCo2Data,tmpHumidData,tmpTempData,tmpTempData,tmpPM10Data,tmpPM25Data]
            console.log("[Final Chart]",chartData)
            setDatas(chartData)
        }
        console.log("[Data in chart out]",data)

        // setDatas((prevDatas)=> [...prevDatas, data])
    },[data])

    useEffect(()=>{
        console.log("[Datas in chart]",datas)
    },[datas])

    return(
        <ResponsiveBump
            data={datas}
            margin={{ top: 40, right: 100, bottom: 50, left: 60 }}
            colors={{ scheme: 'spectral' }}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -48,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36
            }}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -48,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Envirment',
                legendPosition: 'middle',
                legendOffset: -40
            }}
        />
    )
}
