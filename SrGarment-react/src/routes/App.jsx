import Header from "../componant/Header";
import Footer from "../componant/Footer";
import HomeItem from "../componant/HomeItem";
import { Outlet } from "react-router-dom";
import FatchingItems from "../componant/FatchItems";
import { useSelector } from "react-redux";
import SpinLoader from "../componant/SpinLoader";
import FetchBagItem from "../componant/FetchBagItem";

function App() {
  const fatchingStatus = useSelector((store) => store.faatchStatus);

  return (
    <>
      <Header />
      <FetchBagItem />
      <FatchingItems />

      {fatchingStatus.currantlyFatching ? <SpinLoader /> : <Outlet />}

      <Footer />
    </>
  );
}

export default App;
