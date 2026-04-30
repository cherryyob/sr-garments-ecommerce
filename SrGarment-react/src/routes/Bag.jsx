import BagSummary from "../componant/BagSummry";
import Header from "../componant/Header";
import Footer from "../componant/Footer";
import BagItem from "../componant/BagItem";
BagItem;
const Bag = () => {
  return (
    <main>
      <div class="bag-page">
        <div className="bag-items-container">
          {" "}
          <BagItem />
        </div>
        <BagSummary />
      </div>
    </main>
  );
};
export default Bag;
