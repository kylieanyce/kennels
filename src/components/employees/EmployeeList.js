import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./Employee"
import "./Employee.css"

//grabs data from fetch call and sends to be rendered----------------------------
export const EmployeeList = () => {
    // This state changes when `getEmployees()` is invoked below
    const { employees, getEmployees } = useContext(EmployeeContext)
    //useContext carries fetch call data as an object

    //useEffect - reach out to the world for something
    useEffect(() => {
        console.log("EmployeeList: useEffect - getEmployees")
        //calls getEmployees which then populates Employees with data from API 
        getEmployees()
        
    }, [])

    //maps through Employees array of data from API
    return (
        <div className="employees">
            {console.log("EmployeeList: Render", employees)}
            {
                employees.map(employee => {
                    return <EmployeeCard key={employee.id} employee={employee} />
                })
            }
        </div>
    )
}