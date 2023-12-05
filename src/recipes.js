function filterByTag(recipes, tag) {
  return recipes.filter((recipe) => recipe.tags.includes(tag));
}

function getRecipeByName(recipes, name) {
  return recipes.find(
    (recipe) => recipe.name.toLowerCase() === name.toLowerCase()
  );
}

export {
  filterByTag,
  getRecipeByName
};
