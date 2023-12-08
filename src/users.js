import currentUser from './domUpdates.js'

var testUser ={
	"name": "Saige O'Kon",
	"id": 1,
	"recipesToCook": []
};

function randomizeUser(users) {
	let randomUser = users[(Math.floor(Math.random() * users.length) + 1)]
	return randomUser;	
}

function addRecipe(recipe, user) {
	user.recipesToCook.push(recipe);
}

function removeRecipe(currentUser, currentRecipe){
	const index = currentUser.recipesToCook.findIndex(recipe => recipe.id === currentRecipe.id);
	
	currentUser.recipesToCook.splice(index, 1);
	return currentUser;
}



export { randomizeUser , addRecipe, removeRecipe };
