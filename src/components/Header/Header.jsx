import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar,Typography,InputBase,Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ToolBar from '@material-ui/core/Toolbar'
import userStyles from './style'

const Header= ({setCordinates}) => {
    const classes=userStyles()
    const [autoComplete,setAutoComplete]=useState(null)
    const onLoad= (autoC) => {
        setAutoComplete(autoC)
    }

    const onPlaceChanged=() => {
        const lat=autoComplete.getPlace().geometry.location.lat()
        const lng=autoComplete.getPlace().geometry.location.lng()

        setCordinates({lat,lng})
    }

    
    return(
        <div>
            <AppBar position='static'>
                    <ToolBar className={classes.toolbar}>
                        <Typography variant='h5' className={classes.title} >
                                Resturant Guide
                        </Typography>
                        <Box display='flex'>
                            <Typography variant='h6' className={classes.title} >
                                    Explore Places
                            </Typography>
                            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
                                <div className={classes.search} >
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase placeholder='search' classes={{root:classes.inputRoot, input:classes.inputInput }}  />
                                </div>
                            </Autocomplete>
                        </Box>
                    </ToolBar>
            </AppBar>
        </div>
    )
}

export default Header