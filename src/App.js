import React from "react";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import { Modal } from "./components";
import { GlobalStye } from "./globalStyles";
import { Route, Switch } from "react-router-dom";
import { useProductsContext } from "./context/products_context";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";

const App = () => {
  const location = useLocation();
  const { isShowModal } = useProductsContext();

  return (
    <>
      <GlobalStye />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/products">
          <ProductsPage />
        </Route>
      </Switch>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          {isShowModal ? (
            <Route exact path="/products/:id" component={Modal} />
          ) : null}
        </Switch>
      </AnimatePresence>
    </>
  );
};

export default App;
