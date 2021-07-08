import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TickerList from "./TickerList";


function Graph(): JSX.Element {
	const [input, setInput] = useState<string>("");
	const [tickerList, setTickerList] = useState();

	return (
		<div>
			<h2 className="text-3xl font-bold">BABA (NYSE)</h2>
			<div className="flex justify-between mt-1">
				<div className="flex items-baseline font-bold">
					<h2 className="mr-2 text-xl ">217.20</h2>
					<p className="text-gray-400 ml-2">2.39   (-1.09%)</p>
				</div>
				<div className="relative">
					<SearchBar 
						keyword={input} 
						setKeyword={setInput}
					/>
					<TickerList tickerList={tickerList}/>
				</div>
			</div>
		</div>
	);
}

export default Graph;
