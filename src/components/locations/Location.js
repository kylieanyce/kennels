import React from "react"
import "./Location.css"
import { Link } from "react-router-dom"

export const LocationCard = ({ location }) => {
    return (
        <section className="location">
            <h3 className="location__name">
                <Link to={`/locations/detail/${location.id}`}>
                    { location.name }
                </Link>
            </h3>
            <p>{location.animals.length} Animals</p>
            <p>{location.employees.length} Employees</p>
        </section>
    )
}