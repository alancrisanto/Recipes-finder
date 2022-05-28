let API_ID = "b3aaaf2d";
let APP_KEY = "734bc14d07bcd463107b13c1a3d27d81";

const currentYear = new Date().getFullYear();

let search = document.querySelector("#search");
let searchButton = document.querySelector("#search_botton");
let recipesSection = document.querySelector("#recipes");
let displayYear = document.querySelector("#year");

displayYear.textContent = currentYear;

let recipesList = [];

// ********** Obtaining the data from the API and adding it to the recipesList ***********

const getData = async () => {
	let response = await fetch(
		`https://api.edamam.com/api/recipes/v2?type=public&q=${search.value}&app_id=${API_ID}&app_key=${APP_KEY}`,
	);

	let data = await response.json();
	recipesList = data.hits;
	console.log(recipesList);

	if (recipesList.length > 0) {
		displayRecipes(recipesList);
	} else {
		noRecipes();
	}
	search.value = "";
	search.focus();
};

// ********** calling the getData function when clicked on the search button ***********

searchButton.addEventListener("click", getData);

// if (recipesList.length > 0) {
const displayRecipes = (recipes) => {
	const recipesHtml = recipes.map(
		(recipe) => `
											<div id="card_container">

										<div id="recipe_descr">
											<div class="recipe_image">
												<img src=${recipe.recipe.image} alt="">
											</div>
											<div id="description">
												<h3>${recipe.recipe.label}</h3>
												<div class="description_detail">
												<p><span>Cuisine type: </span> ${recipe.recipe.cuisineType}</p>
												<p><span>Diet Type: </span> ${recipe.recipe.dietLabels}</p>
												<p><span>Meal Type: </span> ${recipe.recipe.mealType}</p>
												</div>
												<button class="description_button"><a href=${recipe.recipe.url} target="_blank">View Recipe</a></button>
											</div>
										</div>
										<div id="recipe_info">

											<div id="servings_info">
												<p>${recipe.recipe.yield} Servings</p>
												<p> ${recipe.recipe.calories.toFixed(2)} cal</p>
											</div>
											<div>
												<table id="nutrients_info">
													<tr>
														<td>🟢 Protein</td>
														<td>${recipe.recipe.digest[2].total.toFixed(0)} g</td>
														<td>Cholesterol</td>
														<td>${recipe.recipe.digest[3].total.toFixed(0)} mg</td>
													</tr>
													<tr>
														<td>🟡 Fat</td>
														<td>${recipe.recipe.digest[0].total.toFixed(0)} g</td>
														<td>Sodium</td>
														<td>${recipe.recipe.digest[4].total.toFixed(0)} mg</td>
													</tr>
													<tr>
														<td>🔴 Carb</td>
														<td>${recipe.recipe.digest[1].total.toFixed(0)} g</td>
														<td>Calcium</td>
														<td>${recipe.recipe.digest[5].total.toFixed(0)} mg</td>
													</tr>
												</table>
											</div>
										</div>
									</div>`,
	);

	recipesSection.innerHTML = recipesHtml.join("");
	recipesSection.classList.remove("not_found");
};

const noRecipes = () => {
	recipesSection.innerHTML = `<p>Sorry, we didn't find any recipes</p>`;
	recipesSection.classList.add("not_found");
};

const reset = () => {
	recipesSection.innerHTML = "";
};

const sortByRecipe = () => {
	reset();
	const sorted = document.querySelector("#sortByRecipe").value;

	if (sorted === "ascending") {
		displayRecipes(
			recipesList.sort((a, b) => {
				let x = a.recipe.label.toLowerCase();
				let y = b.recipe.label.toLowerCase();
				return x === y ? 0 : x > y ? 1 : -1;
			}),
		);
	} else {
		displayRecipes(
			recipesList.sort((a, b) => {
				let x = a.recipe.label.toLowerCase();
				let y = b.recipe.label.toLowerCase();
				return x === y ? 0 : x > y ? -1 : 1;
			}),
		);
	}
};

const sortbyCalories = () => {
	reset();
	const sorted = document.querySelector("#sortByCalories").value;

	if (sorted === "caloriesAscending") {
		displayRecipes(
			recipesList.sort((a, b) => {
				let x = a.recipe.calories;
				let y = b.recipe.calories;
				return x === y ? 0 : x > y ? -1 : 1;
			}),
		);
	} else {
		displayRecipes(
			recipesList.sort((a, b) => {
				let x = a.recipe.calories;
				let y = b.recipe.calories;
				return x === y ? 0 : x > y ? 1 : -1;
			}),
		);
	}
};

document.querySelector("#sortByRecipe").addEventListener("change", sortByRecipe);
document.querySelector("#sortByCalories").addEventListener("change", sortbyCalories);
