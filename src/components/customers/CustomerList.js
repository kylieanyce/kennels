import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { CustomerCard } from "./Customer"
import "./Customer.css"

//grabs data from fetch call and sends to be rendered----------------------------
export const CustomerList = () => {
    // This state changes when `getCustomers()` is invoked below
    const { customers, getCustomers } = useContext(CustomerContext)
    //useContext carries fetch call data as an object

    //useEffect - reach out to the world for something
    useEffect(() => {
        //calls getCustomers which then populates customers with data from API 
        getCustomers()
        
    }, [])

    //maps through customers array of data from API
    return (
        <div className="customers">
            {
                customers.map(customer => {
                    return <CustomerCard key={customer.id} customer={customer} />
                })
            }
        </div>
    )
}