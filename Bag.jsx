import BagSummary from "./SrGarment-react/src/componant/BagSummry";
import Header from "./SrGarment-react/src/componant/Header";
import Footer from "./SrGarment-react/src/componant/Footer";
import BagItem from "./SrGarment-react/src/componant/BagItem";
BagItem;
const Bag = () => {
  return (
    <main>
      <div class="bag-page d-flex">
        <div className="bag-items-container">
          {" "}
          <BagItem />
        </div>
        <div>
          <BagSummary />
        </div>
      </div>
    </main>
  );
};
export default Bag;
