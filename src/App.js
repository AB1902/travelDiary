import './App.css';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Maps from './components/Maps/Maps';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import getPlaces  from './api/index';
import getWeatherData from './api/index1'
import { useEffect, useState } from 'react';
import { PlaceSharp } from '@material-ui/icons';


function App() {

  const [places,setPlaces] = useState([])
  const [cordinates,setCordinates]=useState({})
  const [bounds,setBounds]=useState({})
  const [childClick,setChildClick]=useState(null)
  const [type,setType]= useState('resturants')
  const [rating,setRating]= useState('')
  const [filterPlaces,setFilterPlaces]=useState([])  
  const [isLoading,setIsLoading]= useState(false)
  const [weatherData,setWeatherData]=useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) => {
      setCordinates({lat:latitude,lng:longitude})
    })
    
  },[])
  // console.log(cordinates)

  useEffect(() => {
    
    const filteredPlaces=places.filter((place) => place.rating > rating)
    setFilterPlaces(filteredPlaces)

  },[rating])
  
  useEffect(() => {
    if(bounds.sw && bounds.ne){
        setIsLoading(true)
        getWeatherData(cordinates.lat,cordinates.lng)
        .then((data) => {
          setWeatherData(data)
        })
        getPlaces(type,bounds)
        .then(data => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews>0))
          setFilterPlaces([])
          setIsLoading(false)
        })
        .catch(err=>{
          console.log(err)
        })
    }
    
    // console.log(places)
  },[type,bounds])
// console.log(bounds)
  return (
    < >
      <CssBaseline />
      <Header setCordinates={setCordinates} ></Header>
      <Grid item container spacing={3} style={{width:'100%'}} >
          <Grid item xs={12} md={4} >
              <List places={filterPlaces.length ? filterPlaces : places}
                childClick={childClick}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                isLoading={isLoading}
              />
          </Grid>
          <Grid item xs={12} md={8} >
              <Maps
                  setCordinates={setCordinates}
                  setBounds={setBounds}
                  cordinates={cordinates}
                  bounds={bounds}
                  places={places}
                  setChildClick={setChildClick}
                  weatherData={weatherData}
              />
          </Grid>
      </Grid>
    </>
  );
}

export default App;
