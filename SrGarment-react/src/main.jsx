import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./routes/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Bag from "./routes/bag.jsx";
import srStore from "../store/index.js";
import { Provider } from "react-redux";
import Profile from "./routes/Profile.jsx";
import WishList from "./routes/WishList.jsx";
import ProductDetails from "./routes/ProductDetails.jsx";
import SignupPage from "./routes/SignupPage.jsx";
import LoginPage from "./routes/LogInPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/bag", element: <Bag /> },
      { path: "/Profile", element: <Profile /> },
      { path: "/wishlist", element: <WishList /> },
      { path: "/itemDetails/:idName", element: <ProductDetails /> },
      { path: "/SignupPage", element: <SignupPage /> },
      { path: "/LoginPage", element: <LoginPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={srStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
