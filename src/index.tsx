import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Journal, Overview, Performance } from "./views";
import "./App.scss";

const Routing = () => {
	return(
		<Router>
			<Navbar/>
			<div className="w-4/5 mx-auto">
				<Switch>
					<Route exact path="/" component={Overview} />
					<Route path="/journal" component={Journal} />
					<Route path="/performance" component={Performance} />
				</Switch>
			</div>
		</Router>
	);
};


ReactDOM.render(
	<React.StrictMode>
		<Routing />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
