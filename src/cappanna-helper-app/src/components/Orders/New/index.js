import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { isNewOrder } from "routes/helpers";
import { resetOrder, loadMenuDetailsRequested } from "actions";
import { selectNeedsMenuDetailsLoading } from "selectors";
import Header from "./Header";
import Body from "./Body";

const NewOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const newOrder = isNewOrder(location);
  const id = useSelector(state => state.newOrderHeader.id);
  const needsReset = newOrder && id > 0;
  const needsMenuDetailsLoading = useSelector(selectNeedsMenuDetailsLoading);

  useEffect(() => {
    if (needsMenuDetailsLoading) {
      dispatch(loadMenuDetailsRequested());
    }
  }, [dispatch, needsMenuDetailsLoading]);

  useEffect(() => {
    if (needsReset) {
      dispatch(resetOrder());
    }
  }, [dispatch, needsReset]);

    return (
        <div>
            <Header />
            <Body />
        </div>
    );
}

export default NewOrder;
