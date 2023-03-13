import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCardData, fetchCardData } from "./store/card-action";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCard = useSelector((state) => state.ui.cardIsVisible);
  const card = useSelector((state) => state.card);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCardData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCardData(card));
  }, [card, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCard && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
