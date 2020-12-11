import React from "react";

const User = ({ name, favoriteFood }) => (
	<div>
		<h1>{name}</h1>
		<p>Favorite Food: {favoriteFood}</p>
	</div>
);

export default User;