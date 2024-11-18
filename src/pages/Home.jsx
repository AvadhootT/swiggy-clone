import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import FilterOptions from "../components/FilterOptions";
import FoodItems from "../components/FoodItems";
import footerImage from "../assets/img/footer.png";
import "../styles/Home.css";

function Home() {
  const [mealData, setMealData] = useState([]);
  const [area, setArea] = useState("Indian"); //default value set to indian
  const [applyFlag, setApplyflag] = useState(false); //to handle the reload of useEffect when apply button clicked

  // Fetching meal IDs and other details from the API
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        setMealData(response.data.meals); // Storing the entire meal object
        console.log("MealData", response.data.meals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, [applyFlag]);

  return (
    <div id="root">
      {/* Header */}
      <Header />
      <br />
      <h2>Restaurants with online food delivery in Pune</h2>
      {/* FilterButtons */}
      <FilterOptions
        setArea={setArea}
        setApplyflag={setApplyflag}
        mealData={mealData}
        setMealData={setMealData}
      />
      {/* Food Items */}
      <main className="main">
        <FoodItems mealData={mealData} setMealData={setMealData} />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>
          <img src={footerImage} alt="Footer Logo" className="footer-image" />
          <p>&copy; 2024 Brainstorm Force Assessment. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
