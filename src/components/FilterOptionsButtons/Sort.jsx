import React, { useState } from "react";
import "../../styles/Sort.css";
import PropTypes from "prop-types";

function Sort({ mealData, setMealData }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle sorting by alphabet
  const handleSort = (order) => {
    const sortedMeals = [...mealData].sort((a, b) => {
      if (order === "asc") {
        return a.strMeal.localeCompare(b.strMeal); // Ascending order
      } else {
        return b.strMeal.localeCompare(a.strMeal); // Descending order
      }
    });
    setMealData(sortedMeals); // Update sorted data
    setIsDropdownOpen(false); // Close dropdown
  };

  return (
    <div className="sort-container">
      <button className="filter-button" onClick={toggleDropdown}>
        Sort By
      </button>
      {isDropdownOpen && (
        <div className="dropdown">
          <button
            className="dropdown-item"
            onClick={() => handleSort("asc")}
          >
            Alphabetically (A-Z)
          </button>
          <button
            className="dropdown-item"
            onClick={() => handleSort("desc")}
          >
            Alphabetically (Z-A)
          </button>
        </div>
      )}
    </div>
  );
}

// Prop validation
Sort.propTypes = {
  mealData: PropTypes.array.isRequired,
  setMealData: PropTypes.func.isRequired,
};

export default Sort;
