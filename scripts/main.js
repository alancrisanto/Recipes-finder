let API_ID = "b3aaaf2d";
let APP_KEY = "734bc14d07bcd463107b13c1a3d27d81";

// Search by main ingredients
let URL = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9`;

const getData = async () => {
	let response = await fetch(URL);
	let data = await response.json();
	console.log(data);
};

getData();
