import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { LocationCard } from "./Location"
import "./Location.css"

//grabs data from fetch call and sends to be rendered----------------------------
export const LocationList = () => {
    // This state changes when `getlocations()` is invoked below
    const { locations, getLocations } = useContext(LocationContext)
    //useContext carries fetch call data as an object

    //useEffect - reach out to the world for something
    useEffect(() => {
        //calls getlocations which then populates locations with data from API 
        getLocations()
        
    }, [])

    //maps through locations array of data from API
    return (
        <div className="locations">
            {
                locations.map(location => {
                    return <LocationCard key={location.id} location={location} />
                })
            }
        </div>
    )
}