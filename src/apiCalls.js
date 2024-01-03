import { randomizeUser } from "./users";

// Your fetch requests will live here!


export function getApiInfo(type) {
	//only use users, ingredients, recipes for type
	let apiURL = "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/"
	apiURL += type;
	let apiResponse;
	if (type === 'users') {
		apiResponse = fetch(apiURL)
		.then(response => response.json()
		.then(data => randomizeUser(data.users)))
		return apiResponse;
	} else {
		apiResponse = fetch(apiURL)
		.then(response => response.json()
		.then());
		return apiResponse;
	}
}