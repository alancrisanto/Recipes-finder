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
	console.log(data);
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
	const recipesHtml = recipes.map((recipe) => {
		// Verificar si cada campo tiene información y renderizar solo si existe
		const cuisineType = recipe.recipe.cuisineType ? `<p>${recipe.recipe.cuisineType}</p>` : "";
		const dietLabels = recipe.recipe.dietLabels.length > 0 ? `<p>${recipe.recipe.dietLabels.join(", ")}</p>` : "";
		const mealType = recipe.recipe.mealType ? `<p>${recipe.recipe.mealType}</p>` : "";

		// Continuar con la construcción del HTML
		return `
				<div class="card_container">
					<img src="${recipe.recipe.image}" alt="image of ${recipe.recipe.label} recipe">
					<div class="info">
						<p>${recipe.recipe.yield} Servings</p>
						<p>${recipe.recipe.calories.toFixed(2)} Kcal</p>
					</div>
					<div class="card-body">
						<div class="title">
							<h3>${recipe.recipe.label}</h3>
							<hr>
						</div>
						<div class="info-detail">
							${cuisineType}
							${dietLabels}
							${mealType}
						</div>
						<div class="nutrition-info">
							<div class="nutrition">
								<p>Protein: ${recipe.recipe.digest[2].total.toFixed(0)}g</p>
								<p>Cholesterol: ${recipe.recipe.digest[3].total.toFixed(0)} g</p>
								<p>Fat: ${recipe.recipe.digest[0].total.toFixed(0)}g</p>
							</div>
							<div class="nutrition">
								<p>Sodium: ${recipe.recipe.digest[4].total.toFixed(0)} g</p>
								<p>Calcium: ${recipe.recipe.digest[1].total.toFixed(0)} g</p>
								<p>Carb: ${recipe.recipe.digest[5].total.toFixed(0)}g</p>
							</div>
						</div>
						<div class="button">
							<a href="${recipe.recipe.url}" target="_blank" rel="noopener noreferrer">
								<span class="shadow"></span>
								<span class="edge"></span>
								<span class="front text"> View Recipe
								</span>
							</a>
						</div>
					</div>
				</div>
			`;
	});

	recipesSection.innerHTML = recipesHtml.join("");
	recipesSection.classList.remove("not_found");
};

// ********** Display meessage if array is empty ************

const noRecipes = () => {
	recipesSection.innerHTML = `<p>Sorry, we didn't find any recipes</p>`;
	recipesSection.classList.add("not_found");
};

// ********** set recipes section empty ***********

const reset = () => {
	recipesSection.innerHTML = "";
};

// ********** Sorting functions ***********

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
