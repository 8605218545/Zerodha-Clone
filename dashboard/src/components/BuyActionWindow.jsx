import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, onClose }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);

    const handleBuyClick = () => {
        axios.post("http://localhost:3002/newOrder", {     // use axios to access the backend APIs & post(send) the user data in database  
            name: uid,
            qty: stockQuantity,
            price: stockPrice,
            mode: "BUY",
        });

        onClose(); // Close window after buying  (it fun. create in watchList )
    };

    return (
        <div className="container" id="buy-window" draggable="true" style={{backgroundColor: "blue", width: "70%", height: "40%"}}>
            <div className="regular-order" style={{border: "2px solid Blue"}}>
                <div className="inputs" >
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            onChange={(e) => setStockQuantity(e.target.value)}
                            value={stockQuantity}
                            style={{width: "80%"}}
                        />
                    </fieldset>
                    <fieldset >
                        <legend>Price</legend>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.05"
                            onChange={(e) => setStockPrice(e.target.value)}
                            value={stockPrice}
                            style={{width: "80%"}}
                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span style={{color: "white"}}>Margin required ₹140.65</span>
                <div>
                    <Link className="btn btn-blue" onClick={handleBuyClick}>
                        Buy
                    </Link>
                    <Link to="" className="btn btn-grey" onClick={onClose}>
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BuyActionWindow;
