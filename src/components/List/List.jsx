import React,{useState,useEffect} from 'react'
import { CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select, Card } from '@material-ui/core'
import useStyles from './style'
import PlaceDetails from '../PlaceDetails/PlaceDetails'


const List= ({places, childClick,type,setType,rating,setRating,isLoading }) => {
    
    const classes=useStyles()
    
    // console.log({childClick})
    
    return(
        <div className={classes.container}>
            <Typography variant='h4' >Resturants,Hotels and More</Typography>
                {
                    isLoading?
                    (
                        <div className={classes.loading} >
                            <CircularProgress size="5rem" />
                        </div>
                    ):
                
                    
            (
                <>
                    <FormControl className={classes.formControl} >
                        <InputLabel id="type" >Type</InputLabel>
                        <Select id="type" name={type} value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value='restaurants'>Restaurants</MenuItem>
                            <MenuItem value='hotels'>Hotels</MenuItem>
                            <MenuItem value='attractions'>Attractions</MenuItem>
                        </Select>
                    </FormControl>  

                    <FormControl className={classes.formControl}>
                        <InputLabel id="rating">Rating</InputLabel>
                        <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="3">Above 3.0</MenuItem>
                            <MenuItem value="4">Above 4.0</MenuItem>
                            <MenuItem value="4.5">Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Grid item={true} container spacing={3} className={classes.list} >
                        {places?.map((place,i) => (
                            <Grid item key={i} xs={12} >
                                <PlaceDetails place={place }/>
                            </Grid>
                        ) )} 

                    </Grid>
                    </>
            )
            }
        </div>
    )
}

export default List