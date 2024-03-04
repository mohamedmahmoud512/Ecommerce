import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout/Layout";
import LoginLayout from "./component/LogInlayOut/LogInlayOut";
import Home from "./component/Home/Home";
import Products from "./component/Products/Products";
import Categories from "./component/Categories/Categories";
import Brands from "./component/Brands/Brands";
import NotFound from "./component/Not-found/NotFound";
import Context from "./component/context/Context";
import Product from "./component/Products/Product";
import WhishList from "./component/whishList/WhishList";
import Cart from "./component/cart/Cart"
import SubCategories from "./component/SubCategories/SubCategories";
import { Offline, Online } from "react-detect-offline";
import OneCate from "./component/oneCate/OneCate";
import OneBrand from "./component/Brands/oneBrand/oneBrand";
import Login from "./component/Login/Login";
import Signup from "./component/signup/Signup";
import ProductUser from "./component/ProductUser/ProductUser";
import { ToastContainer } from 'react-toastify';
import Allorders from "./component/Allorders/Allorders";
let router = createBrowserRouter([{
  path: "/", element: <Layout />, children: [
    { index: true, element: <ProductUser><Home /></ProductUser> },
    { path: "home", element: <ProductUser><Home /></ProductUser> },
    { path: "products", element: <ProductUser><Products /></ProductUser> },
    { path: "products/:id", element: <ProductUser><Product /></ProductUser> },
    { path: "categories", element: <ProductUser><Categories /></ProductUser> },
    { path: "categories/:id", element: <ProductUser><OneCate /></ProductUser> },
    { path: "categories/:id/subcategories", element: <ProductUser><SubCategories /></ProductUser> },
    { path: "brands", element: <ProductUser><Brands /></ProductUser> },
    { path: "brands/:id", element: <ProductUser><OneBrand /></ProductUser> },
    { path: "cart", element: <ProductUser><Cart /></ProductUser> },
    { path: "WishList", element: <ProductUser><WhishList /></ProductUser> },
    { path: "allorders", element: <ProductUser><Allorders /></ProductUser> },
    { path: "*", element: <NotFound /> },
  ]
},
{
  path: "/log", element: <LoginLayout />, children: [
    { index: true, element: <Login /> },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    { path: "*", element: <NotFound /> }
  ]
}
]);
function App() {
  return (
    <>
      <Context>
        <RouterProvider router={router} />
        <Offline>
          <p className="position-fixed w-100 text-center bottom-0 bg-dark rounded-pill text-white p-2 zIndex">You Are Offline</p>
        </Offline>
      </Context>
      <ToastContainer />
    </>
  )
}

export default App;