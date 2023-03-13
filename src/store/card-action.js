import { uiActions } from "./ui-slice";
import { cardActions } from "./card-slice";

export const fetchCardData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-6b0da-default-rtdb.firebaseio.com/card.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch card data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cardData = await fetchData();
      dispatch(cardActions.replacecard(cardData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching card data failed!",
        })
      );
    }
  };
};

export const sendCardData = (card) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending...",
        title: "Sending...",
        message: "Sending card data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-6b0da-default-rtdb.firebaseio.com/card.json",
        {
          method: "PUT",
          body: JSON.stringify(card),
        }
      );

      if (!response.ok) {
        throw new Error("Sending card data failed.");
      }
    };
    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent card data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending card data failed!",
        })
      );
    }
  };
};
