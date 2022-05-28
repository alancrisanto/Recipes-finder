let API_ID = "b3aaaf2d";
let APP_KEY = "734bc14d07bcd463107b13c1a3d27d81";

let search = document.querySelector("#search");
let searchButton = document.querySelector("#search_botton");

let recipesList = [];

// ********** Obtaining the data from the API and adding it to the recipesList ***********

const getData = async () => {
	let response = await fetch(
		`https://api.edamam.com/api/recipes/v2?type=public&q=${search.value}&app_id=${API_ID}&app_key=${APP_KEY}`,
	);

	let data = await response.json();
	recipesList = data.hits;
	recipes(recipesList);
	console.log("Es la lista", recipesList);

	search.value = "";
	search.focus();
};

// ********** calling the getData function when clicked on the button search ***********

searchButton.addEventListener("click", getData);

const recipes = (recipes) => {
	const recipesHtml = recipes.map(
		(recipe) => `<div id="card_container">

									<div id="recipe_descr">
										<div class="recipe_image">
											<img src=${recipe.recipe.image} alt="">
										</div>
										<div id="description">
											<h3>${recipe.recipe.label}</h3>
											<div class="description_detail">
											<p><span>Cuisine type:</span> ${recipe.recipe.cuisineType}</p>
											<p><span>Diet Type: </span>${recipe.recipe.dietLabels}</p>
											<p><span>Meal Type: </span>${recipe.recipe.mealType}</p>
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

	document.querySelector("#recipes").innerHTML = recipesHtml.join("");
};
