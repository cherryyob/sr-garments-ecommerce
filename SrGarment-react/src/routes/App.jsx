import Header from "../componant/Header";
import Footer from "../componant/Footer";
import HomeItem from "../componant/HomeItem";
import { Outlet } from "react-router-dom";
import FatchingItems from "../componant/FatchItems";

function App() {
  return (
    <>
      <Header />
      <FatchingItems />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
