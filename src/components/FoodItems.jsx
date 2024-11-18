import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "../styles/FoodItems.css";
import starIcon from "../assets/icons/star.png";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    color: "black",
    width: "50%",
    margin: "auto",
    padding: "1rem",
  },
};

function FoodItems({ mealData, setMealData }) {
  const [mealDetails, setMealDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Fetch detailed meal information based on mealId
  const fetchMealDetails = async (mealId) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      setMealDetails(response.data.meals[0]);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  // Close modal and clear meal details
  const closeModal = () => {
    setIsModalOpen(false);
    setMealDetails(null);
  };

  // Generate a random rating between 1 and 5 with one decimal point
  const getRandomRating = () => (Math.floor(Math.random() * 50) + 10) / 10;

  const getRandomTimeRange = () => {
    const minStart = Math.floor(Math.random() * 12) * 5 + 5; // Random start from 5, 10, 15... up to 55
    const minEnd = Math.floor(Math.random() * 6) * 5 + minStart + 5; // End must be greater than start

    // Ensure both numbers are less than 60
    const startTime = Math.min(minStart, 55); // Limit start time to 55 max
    const endTime = Math.min(minEnd, 60); // Limit end time to 60 max

    return `${startTime}-${endTime} mins`;
  };

  // Render the star icon for meal rating
  const renderRatingStars = () => {
    return (
      <img
        src={starIcon}
        alt="Star"
        style={{ width: "16px", height: "16px" }}
      />
    );
  };

  return (
    <div className="food-items-container">
      <div className="food-cards">
        {mealData.map((meal) => {
          const rating = getRandomRating();
          const timeRange = getRandomTimeRange(); // Generate random time range
          return (
            <div
              key={meal.idMeal}
              className="food-card"
              onClick={() => fetchMealDetails(meal.idMeal)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
              <div className="meal-rating-container">
                <div className="meal-rating">
                  <span>{renderRatingStars()}</span>
                </div>
                <div className="meal-rating-value">{rating}</div>
                <div className="meal-time">● {timeRange}</div>{" "}
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal for meal details */}
      {mealDetails && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <div className="modal-content">
            <h2>{mealDetails.strMeal}</h2>
            <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
            <p>
              <strong>Category:</strong> {mealDetails.strCategory}
            </p>
            <p>{mealDetails.strInstructions}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

FoodItems.propTypes = {
  mealData: PropTypes.array.isRequired,
  setMealData: PropTypes.func.isRequired,
};

export default FoodItems;
