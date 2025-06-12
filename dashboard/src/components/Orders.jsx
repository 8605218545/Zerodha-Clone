

import React from 'react'
import { useState, useEffect } from 'react';

import axios from 'axios';

function Orders() {
     const [allOrders, setAllOrders] = useState([]);

     useEffect(() => {
        axios.get("http://localhost:3002/allOrders").then((res) => {
            console.log(res.data)
            setAllOrders(res.data)
        })
     }, [])

    return (
        <>
           <h3 className="title">Positions ({allOrders.length})</h3>
            <div className="order-table">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Qty.</th>
                        <th>Price</th>
                        <th>Mode</th>
                    </tr>

                    {allOrders.map((stock, index) => {

                        return (
                        <tr key={index}>
                            <td>{stock.name}</td>
                            <td>{stock.qty}</td>
                            <td>{stock.price}</td>
                            <td>{stock.mode}</td>
                        </tr>
                        );
                    })}
                </table>
            </div>
        </>
    )
}

export default Orders;