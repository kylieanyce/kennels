import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import { EmployeeContext } from "../employees/EmployeeProvider"
import { useHistory, useParams } from 'react-router-dom';

export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation } = useContext(LocationContext)
    const { employees, getEmployees } = useContext(EmployeeContext)

    const [location, setLocation] = useState({
        name: "",
        address: "",
        employeeId: 0,
        id: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    const { locationId } = useParams();
    const history = useHistory();


    const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newLocation = { ...location }
        //location is an object with properties.
        //set the property to the new value
        newLocation[event.target.id] = event.target.value
        //update state
        setLocation(newLocation)
    }

    const handleSaveLocation = () => {
        if (parseInt(location.employeeId) === 0) {
            window.alert("Please select a employee")
        } else {
            //disable the button - no extra clicks
            setIsLoading(true);
            // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an location
            if (locationId) {
                //PUT - update
                updateLocation({
                    id: location.id,
                    name: location.name,
                    address: location.address,
                    employeeId: parseInt(location.employeeId),
                })
                    .then(() => history.push(`/locations/detail/${location.id}`))
            } else {
                //POST - add
                addLocation({
                    name: location.name,
                    address: location.address,
                    employeeId: parseInt(location.employeeId),
                })
                    .then(() => history.push("/locations"))
            }
        }
    }

    useEffect(() => {
        getEmployees().then(() => {
            if (locationId) {
                getLocationById(locationId)
                    .then(location => {
                        setLocation(location)
                        setIsLoading(false)
                    })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <form className="locationForm">
            <h2 className="locationForm__title">{locationId ? "Edit Location" : "Add Location"}</h2>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">location name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="location name" value={location.name} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">address:</label>
                    <input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="location address" value={location.address} />
                </div>
            </fieldset>

            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveLocation()
                }}>
                {locationId ? "Save Location" : "Add Location"}
            </button>
        </form>
    )
}