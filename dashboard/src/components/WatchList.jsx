import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp, BarChartOutlined, MoreHoriz } from "@mui/icons-material";
import { watchlist } from "../data/data";
import { Tooltip, Grow } from "@mui/material";
import BuyActionWindow from "./BuyActionWindow";
import {DoughnutChart} from "./DoughnoutChart"

function WatchList() {
    const [selectedStock, setSelectedStock] = useState(null); // State to track the selected stock for buying

    // for DoughnutChart Graph 
    const labels = watchlist.map((subArray) => subArray["name"]);
    const data = {
        labels,
        datasets: [
          {
            label: "Price",
            data: watchlist.map((stock) => stock.price),
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    

    return (
        <div className="watchlist-container">
            <div className="search-container">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
                    className="search"
                    style={{ color: "black" }}
                />
                <span className="counts"> {watchlist.length} / 50</span>
            </div>

            <ul className="list">
                {watchlist.map((stock, index) => (
                    <WatchListItem key={index} stock={stock} onBuyClick={setSelectedStock} />
                ))}
            </ul>

            {/* Show BuyActionWindow when a stock is selected */}
            {selectedStock && <BuyActionWindow uid={selectedStock} onClose={() => setSelectedStock(null)} />}

            {/* for printing DoughnutChart */}
            <DoughnutChart data={data} />
                
        </div>
    );
}

export default WatchList;



// create  a WatchListItem for stock name and price
const WatchListItem = ({ stock, onBuyClick }) => {
    const [showWatchlistActions, setShowWatchlistActions] = useState(false);

    return (
        <li onMouseEnter={() => setShowWatchlistActions(true)} onMouseLeave={() => setShowWatchlistActions(false)}>
            <div className="item">
                <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
                <div className="itemInfo">
                    <span className="percent">{stock.percent}</span>
                    {stock.isDown ? <KeyboardArrowDown className="down" /> : <KeyboardArrowUp className="up" />}
                    <span className="price">{stock.price}</span>
                </div>
            </div>

            {showWatchlistActions && <WatchListActions uid={stock.name} onBuyClick={onBuyClick} />}
        </li>
    );
};



// create a WatchListActions component for button Buy, Sell, Analytics, and More
const WatchListActions = ({ uid, onBuyClick }) => {
    return (
        <span className="actions">
            <span>
                <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="buy" onClick={() => onBuyClick(uid)}>Buy</button>
                </Tooltip>

                <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="sell">Sell</button>
                </Tooltip>

                <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action">
                        <BarChartOutlined className="icon" />
                    </button>
                </Tooltip>

                <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action">
                        <MoreHoriz className="icon" />
                    </button>
                </Tooltip>
            </span>
        </span>
    );
};
