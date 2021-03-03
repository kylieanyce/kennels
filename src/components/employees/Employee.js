import React from "react"
import { Link } from "react-router-dom"

export const EmployeeCard = ({ employee }) => {
    return (
        <section className="employee">
            <h3 className="employee__name">
                <Link to={`/employees/detail/${employee.id}`}>
                    { employee.name }
                </Link>
            </h3>
        </section>
    )
}