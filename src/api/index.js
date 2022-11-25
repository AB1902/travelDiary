import axios from 'axios'


 const getPlaces= async(type,bounds) => {
    try {
        const response =await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
                params: {
                bl_latitude: bounds.sw.lat,
                tr_latitude: bounds.ne.lat,
                bl_longitude: bounds.sw.lng,
                tr_longitude: bounds.ne.lat,
                },
                headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
                }
            })
        return response.data.data
    } catch (error) {
        console.log(error.message)
    }
}



export default getPlaces
