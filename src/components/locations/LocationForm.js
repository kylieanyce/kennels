import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../locations/LocationProvider"
import { EmployeeContext } from "../employees/EmployeeProvider"
import { useHistory, useParams } from 'react-router-dom';

export const LocationForm = () => {
    const { addLocation } = useContext(LocationContext)
    const { employees, getEmployees } = useContext(EmployeeContext)

    const [location, setLocation] = useState({
        name: "",
        employeeId: 0,
        id: 0
    });

    const history = useHistory();

    /*
    Reach out to the world and get customers state
    and employees state on initialization, so we can provide their data in the form dropdowns
    */
    useEffect(() => {
        getEmployees()
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
    // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newLocation = { ...location }
        let selectedVal = event.target.value
        // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        /* employee is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newLocation[event.target.id] = selectedVal
        // update state
        setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        const employeeId = location.employeeId

        if (employeeId === 0) {
            window.alert("Please select an employee and a customer")
        } else {
            //invoke addEmployee passing employee as an argument.
            //once complete, change the url and display the employee list
            addLocation(location)
                .then(() => history.push("/locations"))
        }
    }

    return (
        <form className="locationForm">
            <h2 className="locationForm__title">New location</h2>
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employee">Assign to employee: </label>
                    <select defaultValue={location.employeeId} name="employeeId" id="employeeId" onChange={handleControlledInputChange} className="form-control" >
                        <option value="0">Select a employee</option>
                        {employees.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary"
                onClick={handleClickSaveLocation}>
                Save location
            </button>
        </form>
    )
}