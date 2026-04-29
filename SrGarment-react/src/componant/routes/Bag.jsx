import BagSummary from "../BagSummry";
import Header from "../Header";
import Footer from "../Footer";
import BagItem from "../BagItem";
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
