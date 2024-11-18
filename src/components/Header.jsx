import "../styles/Header.css";
import logo from "../assets/img/swiggy-1.svg";

function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <img src={logo} alt="Logo" className="svg-icon" />

      {/* Website Title */}
      <h1 className="title">Brainstorm Force Assessment</h1>

      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search for something..."
        />
      </div>
    </header>
  );
}

export default Header;
