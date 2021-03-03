import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)

    const [location, setLocation] = useState({})
    const { locationId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getLocationById(locationId)
            .then((res) => {
                setLocation(res)
            })
    }, [])

    return (
        <section className="location">
            <h3 className="location__name">{location.name}</h3>
            <div className="location__address">Address: {location.location?.address}</div>
        </section>
    )
}