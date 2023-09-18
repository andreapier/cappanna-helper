import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMenuDetailsRequested, resetOrder, setMenuDetailQuantity } from "actions";
import Menu from "components/Menu";
import { selectIsAdmin } from "selectors";

const MenuTable = () =>{
    const dishList = useSelector(state => state.menuDetails);
    const isAdmin = useSelector(selectIsAdmin);

    const dispatch = useDispatch();
    const handleSetMenuDetailQuantity = (dishId, unitsInStock) => dispatch(setMenuDetailQuantity(dishId, unitsInStock));

    useEffect(() => {
      dispatch(loadMenuDetailsRequested());
      
      return () => {
        dispatch(resetOrder())
      };
    }, [dispatch])

    return (
      <Menu
        dishList={dishList}
        setMenuDetailQuantity={isAdmin ? handleSetMenuDetailQuantity : undefined}
      />
    );
}

export default MenuTable;
