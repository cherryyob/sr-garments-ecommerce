import { IoPerson } from "react-icons/io5";
import { BsEmojiHeartEyesFill, BsBagFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo_container">
        <Link to="/">
          <img
            className="srgarments_home"
            src="../../images/logo.png"
            alt="SR GARMENTS Home"
          />
        </Link>
      </div>
      <nav className="nav_bar">
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kids</a>
        <a href="#">Home & Living</a>
        <a href="#">Beauty</a>
        <a href="#">
          Studio <sup>New</sup>
        </a>
      </nav>
      <div className="search_bar">
        <span className="material-symbols-outlined search_icon">search</span>
        <input
          className="search_input"
          placeholder="Search for products, brands and more"
        />
      </div>
      <div className="action_bar">
        <div className="action_container">
          <IoPerson />
          <span className="action_name">Profile</span>
        </div>

        <div className="action_container">
          <BsEmojiHeartEyesFill />

          <span className="action_name">Wishlist</span>
        </div>

        <Link to="/bag" className="action_container">
          <BsBagFill />
          <span className="action_name">Bag</span>
          <span className="bag-item-count">0</span>
        </Link>
      </div>
    </header>
  );
};
export default Header;
