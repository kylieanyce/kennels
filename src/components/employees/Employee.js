import React from "react"
import "./Employee.css"

export const EmployeeCard = ({employee, location}) => (
    <section className="employee">
        <h3 className="employee__name">{employee.name}</h3>
        <h3 className="location__name">{location.name}</h3>
    </section>
)