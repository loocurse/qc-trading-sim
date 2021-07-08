import React from "react";
import Graph from "../components/Graph";
import Recommendation from "../components/Recommendation";

function Overview(): JSX.Element {
	return (
		<>
			<h3 className="my-5 text-xl">Welcome, Lucas</h3>
			<Graph />
			<Recommendation />
		</>
	);
}

export default Overview;
