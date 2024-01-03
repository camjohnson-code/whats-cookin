import { randomizeUser } from "./users";

// Your fetch requests will live here!


export function getApiInfo(type) {
	//only use users, ingredients, recipes for type
	let apiURL = ""
	let apiResponse;
	switch (type) {
		case 'users':
			apiURL = 'https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users'
			apiResponse = fetch(apiURL)
			.then(response => response.json()
			.then(data => randomizeUser(data.users)))
			break;
		case 'recipes':
			apiURL = 'https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes'
			apiResponse = fetch(apiURL)
			.then(response => response.json()
			.then());
			break;
		case 'ingredients':
			apiURL = 'https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients'
			apiResponse = fetch(apiURL)
			.then(response => response.json()
			.then());
			break;
		default:
			console.log(`ERROR: Could not match case: ${type}`);
			break;
	}
	return apiResponse;
}