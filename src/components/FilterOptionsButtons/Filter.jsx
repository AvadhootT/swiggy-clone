import { useState, useEffect } from "react";
import "../../styles/Filter.css";
import axios from "axios";
import PropTypes from "prop-types";


function Filter({setArea, setApplyflag}) {
  const [areaList, setAreaList] = useState([]); // Stores areas fetched from API
  const [selectedArea, setSelectedArea] = useState(""); // Stores selected area
  const [showDropdown, setShowDropdown] = useState(false); // Controls dropdown visibility

  // Fetching areas list from the API
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const areas = response.data.meals.map((meal) => meal.strArea);
        setAreaList(areas);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchAreas();
  }, []);

  // Handle radio button change
  const handleSelectionChange = (event) => {
    setSelectedArea(event.target.value);
    setArea(event.target.value);
  };

  // Handle Apply button click
  const handleApply = () => {
    console.log("Selected Area:", selectedArea);
    setApplyflag((prevFlag) => !prevFlag);
    setShowDropdown(false); // Hide dropdown after applying
  };

  return (
    <div className="filter-container1">
      <button
        className="filter-button"
        onClick={() => setShowDropdown((prev) => !prev)} // Toggle dropdown visibility
      >
        Filter
      </button>

      {showDropdown && (
        <div className="dropdown">
          <ul className="dropdown-list">
            {areaList.map((area, index) => (
              <li key={index} className="dropdown-item">
                <label>
                  <input
                    type="radio"
                    name="area"
                    value={area}
                    checked={selectedArea === area}
                    onChange={handleSelectionChange}
                  />
                  {area}
                </label>
              </li>
            ))}
          </ul>
          <button className="apply-button1" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

// Prop validation
Filter.propTypes = {
  setArea: PropTypes.func.isRequired,
  setApplyflag: PropTypes.func.isRequired,
};

export default Filter;
