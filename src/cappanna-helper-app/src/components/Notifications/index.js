import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNotificationsListRequested, resetOrder, printRequested } from "actions";
import Notifications from "components/Notifications/Notifications";

const NotificationsList = () => {
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadNotificationsListRequested());

    return () => dispatch(resetOrder());
  }, [dispatch]);

  const handlePrintRequested = (orderId) => dispatch(printRequested(orderId));
  
  return <Notifications notifications={notifications} printRequested={handlePrintRequested} />;
}

export default NotificationsList;
