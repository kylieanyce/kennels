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
            <div className="location__employees"><strong>Employees: </strong>{location.employees?.map(e => (
                <div key={e.id} >{e.name}</div>
            ))}
            </div>
            <div className="location__animals"><strong>Animals: </strong>{location.animals?.map(e => (
                <div key={e.id} >{e.name}</div>
            ))}
            </div>
            <button onClick={() => {
                history.push(`/locations/edit/${location.id}`)
            }}>Edit</button>
        </section>
    )
}