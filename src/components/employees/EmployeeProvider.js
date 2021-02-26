import React, { useState, createContext } from "react"



// The context is imported and used by individual components that need data
export const EmployeeContext = createContext()

// This component establishes what data can be used.
export const EmployeeProvider = (props) => {
    //setting two empty vars to be a state var and a function
    //useState will be the value of these vars
    const [employees, setEmployees] = useState([])
    //fetch call returns data to setEmployees and useState changes
    //employees var to be set to the retrieved data
    const getEmployees = () => {
        return fetch("http://localhost:8088/employees")
        .then(res => res.json())
        .then(setEmployees)
    }
    //this fetch call takes an employeeObj parameter to post to the API
    //then gets employees from API
    const addEmployee = employeeObj => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeObj)
        })
        .then(getEmployees)
    }

    /*
        You return a context provider which has the
        `employees` state, `getEmployees` function,
        and the `addAnimal` function as keys. This
        allows any child elements to access them.
    */
    return (
        <EmployeeContext.Provider value={{
            employees, getEmployees, addEmployee
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}