import Header from "./Header";
import Footer from "./Footer";
const Bag = () => {
  return (
    <>
      <Header />
      <main>
        <div class="bag-page">
          <div class="bag-items-container"></div>
          <div class="bag-summary"></div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Bag;
