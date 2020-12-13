const bcrypt = require('bcrypt');

// local, in memory db — easy to swap this out with your DB system
const db = {};

class User {
	constructor(email, password, data) {
		this.email = email;
		this.password = bcrypt.hashSync(password, 10);
		this.data = data || {}; // default map
	}

	async validatePassword(pass) {
		console.log("validating password")
		console.log(pass);
		console.log(this.password);
		const compare = await bcrypt.compare(pass, this.password);
		return compare;
	}
}

const createUser = (email, pw, data = {}) => {
	// check if db has users
	db.users = db.users || [];

	// check to see if user already exists
	if (db.users.find((user) => user.email === email)) {
		throw new Error("user already exists");
	}

	// create user
	const user = new User(email, pw, data);

	// add user
	db.users.push(user);

	return user;
};

const getUser = (email) => {
	// check if db has users
	db.users = db.users || [];

	return db.users.find((user) => user.email === email);
}

module.exports = { User, createUser, getUser }