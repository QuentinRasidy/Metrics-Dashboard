import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../styles/Dashboard.css';
import Metric from './Metric';

const people_presence_server_port = process.env.PEOPLE_PRESENCE_SERVER_PORT || 15008;
const people_presence_server_url = process.env.PEOPLE_PRESENCE_SERVER_URL || "10.1.20.21";



function computeAirQuality(index){
  if(index <= 2){
    return 'Very Good'
  }
  else if(index > 2 && index <= 3){
    return 'Good'
  }
  else if(index > 3 && index <= 4){
    return 'Medium'
  }
  else if(index > 4 && index <= 5){
    return 'Poor'
  }
  else if(index > 5){
    return 'Bad'
  }
} 

const Dashboard = (props) => {
    let params = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
      const url = 'http://'+people_presence_server_url+':'+people_presence_server_port+`/codec/${params.mac}`
      //console.log('url is : '+url)
      //const url = `http://`+people_presence_server_url+`:`+people_presence_server_port+`/codec/${params.mac}`
      const interval = setInterval(() => {
        fetch(url)
      .then((result) => result.json())
      .then((result) => {
        let tmpMetrics = []
  
        const {peoplePresence, peopleCount, ambientNoise, navigators} = result.codec
  
        tmpMetrics.push({
          name: "Presence",
          value: peoplePresence,
          logo: "BsPerson"
        })
  
        if(peopleCount !== -1){
          tmpMetrics.push({
            name: "People Count",
            value: peopleCount,
            logo: "BsPeople"
          })
        }
  
        tmpMetrics.push({
          name: "Ambient Noise",
          value: `${ambientNoise} dBA`,
          logo: "BsSoundwave"
        })
  
        if(navigators.length > 0){
          tmpMetrics.push({
            name: "Temperature",
            value: `${navigators[0].RoomAnalytics.AmbientTemperature}°C`,
            logo: "TbTemperature"
          })
  
          tmpMetrics.push({
            name: "Humidity",
            value: `${navigators[0].RoomAnalytics.RelativeHumidity}%`,
            logo: "MdOutlineWaterDrop"
          })

          tmpMetrics.push({
            name: "Air Quality",
            value: computeAirQuality(navigators[0].RoomAnalytics.AirQuality.Index),
            logo: "MdOutlineAir"
          })
        }
        setData(tmpMetrics)
      })
      }, 2000);
      return () => clearInterval(interval);
      
    });
  
    if(data.length === 0){
      return (
        <div className="dashboard-container">
            <div>Loading...</div>
        </div>
      )
    }
    else{
        return (
            <div className="dashboard-container">
                <div className="dashboard-title">
                    <h2>Room Real-Time Environmental Metrics</h2>
                </div>
                <div className="metrics-container">
                    {
                        data.map((metric, i) => {
                            return <Metric key={i} logo={metric.logo} name={metric.name} value={metric.value} />
                        })
                    }
                </div>
            </div>
        )
    }

}


export default Dashboard;