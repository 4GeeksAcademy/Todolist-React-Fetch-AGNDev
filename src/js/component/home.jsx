import React from "react";
import Todolist from "./Todolist.jsx";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="d-flex justify-content-center">
			<Todolist />
		</div>
	);
};

export default Home;
