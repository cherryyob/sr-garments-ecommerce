import BagSummary from "../componant/BagSummry";
import Header from "../componant/Header";
import Footer from "../componant/Footer";
import BagItem from "../componant/BagItem";
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
