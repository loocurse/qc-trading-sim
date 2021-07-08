import React from "react";

const defaultList = [
	{symbol: "BABA", market:"NYSE", name: "Alibaba Group Holding Ltd"},
	{symbol: "LMND", market:"NYSE", name: "Lemonade Inc"},
	{symbol: "AAPL", market:"NASDAQ", name: "Apple Inc"},
	{symbol: "TSLA", market:"NASDAQ", name: "Tesla Inc"},
];

const TickerList = ({tickerList=defaultList, focus}: any): JSX.Element => {
	return (
		<div className="dropdown absolute bg-white rounded-lg">
			{ tickerList.map((data: any) => {
				if (data) {
					return (
						<div className= "p-3 w-max" key={data.name}>
							<h1>{data.name}</h1>
						</div>	
					);	
				}
				return null;
			}) }
		</div>
	);
};

export default TickerList;