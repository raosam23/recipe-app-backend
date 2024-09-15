const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/search", async (req, res) => {
  const dishName = req.query.dishName;
  const responseData = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`,
  );
  if (responseData.data.meals === null) {
    res.status(responseData.status).json({ msg: "Meal not found" });
  }
  const mealObj = responseData.data.meals[0];
  const ingrediants = [];
  let meal = mealObj.strMeal;
  let category = mealObj.strCategory;
  let country = mealObj.strArea;
  let instructions = mealObj.strInstructions;
  let image = mealObj.strMealThumb;
  let youtubeLink = mealObj.strYoutube;

  for (let i = 1; i <= 20; i++) {
    let ingr = mealObj[`strIngredient${i}`];
    let measure = mealObj[`strMeasure${i}`];
    if (ingr === "" || ingr === null || measure === "" || measure === null)
      break;
    if (measure === "to taste") ingrediants.push(`${ingr} for taste`);
    else ingrediants.push(`${measure} of ${ingr}`);
  }

  let mealData = {
    meal: meal,
    category: category,
    country: country,
    instructions: instructions,
    image: image,
    youtubeLink: youtubeLink,
    ingrediants: ingrediants,
  };
  res.status(responseData.status).json(mealData);
});

module.exports = router;
