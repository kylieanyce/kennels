import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { LocationContext } from "./LocationProvider"
import { EmployeeContext } from "../employees/EmployeeProvider"
import { LocationCard } from "./Location"
import "./Location.css"

//grabs data from fetch call and sends to be rendered----------------------------
export const LocationList = () => {
    // This state changes when `getlocations()` is invoked below
    const { locations, getLocations } = useContext(LocationContext)
    const { employees, getEmployees } = useContext(EmployeeContext)
    //useContext carries fetch call data as an object

    //useEffect - reach out to the world for something
    useEffect(() => {
        //calls getlocations which then populates locations with data from API 
        getEmployees()
            .then(getLocations)

    }, [])

    //maps through locations array of data from API
    return (
        <div className="locations">
            <button onClick={() => { history.push("/locations/create") }}>
                Add Locations
            </button>
            {
                locations.map(location => {
                    const worker = employees.find(w => w.id === location.locationId)
                    return <LocationCard key={location.id} location={location} 
                        employee={worker}
                    />
                })
            }
        </div>
    )
}