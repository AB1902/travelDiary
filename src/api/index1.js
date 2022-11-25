import axios from 'axios'

const getWeatherData=async (lat,lng) =>{
    try {
        const response =await axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{
            params: {lat: '0',lon: '0',},
              headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
              }
        })
        return response
    } catch (error) {
        console.log(error)
    }
    
}

export default getWeatherData