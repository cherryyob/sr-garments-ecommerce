import HomeItem from "../componant/HomeItem";
import { useSelector } from "react-redux";

HomeItem;
const Home = () => {
  const items = useSelector((state) => state.store);
  console.log(items);
  return (
    <main>
      <div className="items-container">
        {items.map((item) => {
          return <HomeItem key={item.id} item={item} />;
        })}
      </div>
    </main>
  );
};
export default Home;
