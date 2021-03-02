import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../locations/LocationProvider"
import { useHistory } from "react-router-dom"
import { EmployeeCard } from "./Employee"
import "./Employee.css"

//grabs data from fetch call and sends to be rendered----------------------------
export const EmployeeList = () => {
    // This state changes when `getEmployees()` is invoked below
    const { employees, getEmployees } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    //useContext carries fetch call data as an object
    const history = useHistory()

    //useEffect - reach out to the world for something
    useEffect(() => {
        //calls getEmployees which then populates Employees with data from API 
        getLocations()
            .then(getEmployees)
    }, [])

    //maps through Employees array of data from API
    return (
        <div className="employees">
            <button onClick={() => { history.push("/employees/create") }}>
                Add Employee
            </button>
            {
                employees.map(employeeObj => {
                    const clinic = locations.find(l => l.id === employeeObj.locationId)
                    return <EmployeeCard key={employeeObj.id} employee={employeeObj}
                        location={clinic}
                    />
                })
            }
        </div>
    )
}