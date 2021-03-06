import React, { useState } from "react"

//pass in prop parameter
export const PropsAndState = ({ yourName }) => {
    //useState returns two pieces of data
    let [countClicks, setCountClicks] = useState(0)

    const handleClick = () => {
        //new var increments countClicks var
        const newCountClicks = ++countClicks
        //make setCountClicks function take in the var so when it's invoked
        //in PropsAndState(), it incrememnts countClicks var
        setCountClicks(newCountClicks)
    }

    //button has event listener onClick that invokes handleClick function
    return (
        <>
            <h3>Welcome, {yourName} </h3>
            <p>{countClicks}</p>
            <button onClick={(handleClick)}>Click Me</button>
        </>
    )
}