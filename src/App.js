import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Spinner from "./Components/Spinner";
import Editprofile from "./Components/Editprofile";
import AllUsers from "./Components/admin/AllUsers";
import AllProducts from "./Components/admin/AllProducts";
import AllReports from "./Components/admin/AllReports";
import Profile from "./pages/Profile";
import FindPendingRequests from "./Components/admin/findPendingRequests";

const Home = lazy(() => import("./pages/Home"));
const LogIn = lazy(() => import("./pages/LogIn"));
const Category = lazy(() => import("./pages/Category"));
const Product = lazy(() => import("./pages/Product"));
const MyAds = lazy(() => import("./pages/MyAds"));
const CreateProduct = lazy(() => import("./pages/CreateProduct"));
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"));
const UpdatePrice = lazy(() => import("./pages/UpdatePrice"));
const SignUp = lazy(() => import("./pages/Signup"));
const ModeratorHome = lazy(() => import("./Components/admin/ModeratorHome"));

const NavBar = lazy(() => import("./Components/Navbar"));
const SentRequests = lazy(() => import("./pages/SentRequests"));
const RecievedRequests = lazy(() => import("./pages/RecievedRequests"));
const Delivery = lazy(() => import("./pages/Delivery"));
const Cart = lazy(() => import("./pages/favorite"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner text="Loading" />}>
        <NavBar />
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          {localStorage.getItem("userType") === "moderator" && (
            <Route path="/home">
              <ModeratorHome />
            </Route>
          )}
          {localStorage.getItem("userType") === "delivery" && (
            <Route path="/home">
              <Delivery />
            </Route>
          )}
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/:userId/get_products">
            <MyAds />
          </Route>
          <Route path="/categories/:categoryId">
            <Category />
          </Route>
          <Route path="/products/:productId/updatePrice">
            <UpdatePrice />
          </Route>
          
          <Route path="/requests/sent/:userId">
            <SentRequests />
          </Route>
          <Route path="/editprofile">
            <Editprofile />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/all-users">
            <AllUsers />
          </Route>
          <Route path="/FindPendingRequests">
          <FindPendingRequests />
        </Route>
          <Route path="/all-products">
            <AllProducts />
          </Route>
          <Route path="/all-reports">
            <AllReports />
          </Route>
          <Route path="/requests/:productId">
            <RecievedRequests />
          </Route>
          <Route path="/favorite">
            <Cart />
          </Route>
          <Route path="/products/create_new">
            <CreateProduct />
          </Route>
          <Route path="/products/update_product">
            <UpdateProduct />
          </Route>
          <Route path="/products/:productId">
            <Product />
          </Route>
          {localStorage.getItem("token") !== null ? (
            <Redirect push to="/home" />
          ) : (
            <Redirect push to="/login" />
          )}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
