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
let nowTime=hours+":"+minutes+":"+ seconds
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
    const [datas, setDatas] = useState(dummyData)

    // useEffect(()=>{
    //     setDatas(dummyData)
    //     console.log("Datas init",datas)
    // },[])

    useEffect(()=>{
        // setDatas(dummyData)
        console.log("[Data in chart]",data)
        if(data.Time){
            const [h1,h2,m1,m2,s1,s2] = data.Time.substring(8)
            const chartTime = h1+h2+":"+m1+m2+":"+s1+s2
            const cutNum = 10
            const tmpCo2inChart = datas[0].data.length >= cutNum ?  datas[0].data.slice(datas[0].data.length-cutNum):datas[0].data
            const tmpHumidinChart = datas[1].data.length >= cutNum ?  datas[1].data.slice(datas[1].data.length-cutNum):datas[1].data
            const tmpTempinChart = datas[2].data.length >= cutNum ?  datas[2].data.slice(datas[2].data.length-cutNum):datas[2].data
            const tmpPM10inChart = datas[3].data.length >= cutNum ?  datas[3].data.slice(datas[3].data.length-cutNum):datas[3].data
            const tmpPM25inChart = datas[4].data.length >= cutNum ?  datas[4].data.slice(datas[4].data.length-cutNum):datas[4].data

            console.log("[Cut Data] : ",tmpCo2inChart)
            const tmpCo2Data = {"id": "Co2","data":[...tmpCo2inChart, {"x" :chartTime,"y": parseInt(data.Co2)}]}
            const tmpHumidData = {"id": "Humid","data":[...tmpHumidinChart, {"x" :chartTime,"y": parseInt(data.Humid)}]}
            const tmpTempData = {"id": "Temp","data":[...tmpTempinChart, {"x" :chartTime,"y": parseInt(data.Temp)}]}
            const tmpPM10Data = {"id": "PM10","data":[...tmpPM10inChart,{"x" :chartTime,"y": data.PM10}]}
            const tmpPM25Data = {"id": "PM25","data":[...tmpPM25inChart,{"x" :chartTime,"y": data.PM25}]}
            const chartData = [tmpCo2Data,tmpHumidData,tmpTempData,tmpPM10Data,tmpPM25Data]
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
