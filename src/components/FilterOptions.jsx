import "../styles/FilterOptions.css";
import Filter from "./FilterOptionsButtons/Filter";
import Sort from "./FilterOptionsButtons/Sort";
import PropTypes from "prop-types";


function FilterOptions({setArea, setApplyflag, mealData, setMealData}) {
  return (
    <div className="filter-options">
      <div className="filters">
        <Filter setArea={setArea} setApplyflag={setApplyflag}/>
        <Sort mealData={mealData} setMealData={setMealData} />
        <button className="filter-button">Fast Delivery</button>
        <button className="filter-button">New on Swiggy</button>
        <button className="filter-button">Ratings 4.0+</button>
        <button className="filter-button">Pure Veg</button>
        <button className="filter-button">Offers</button>
        <button className="filter-button">Rs. 300–Rs. 600</button>
        <button className="filter-button">Less than Rs. 300</button>
      </div>
    </div>
  );
}

export default FilterOptions;

// Prop validation
FilterOptions.propTypes = {
  setArea: PropTypes.func.isRequired,
  setApplyflag: PropTypes.func.isRequired,
  mealData: PropTypes.array.isRequired,
  setMealData: PropTypes.func.isRequired,
};