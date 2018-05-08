import React from "react";
import DishList from "components/Orders/Detail/DishList";
import PropTypes from "prop-types";

const Body = props => {
  const appetizers = [];
  const firstDishes = [];
  const secondDishes = [];
  const sideDishes = [];
  const desserts = [];
  const whiteWines = [];
  const redWines = [];
  const waters = [];
  const drinks = [];

  props.dishList.forEach(i => {
    if (i.group === "Antipasti") {
      appetizers.push(i);
    } else if (i.group === "Primi piatti") {
      firstDishes.push(i);
    } else if (i.group === "Secondi piatti") {
      secondDishes.push(i);
    } else if (i.group === "Contorni") {
      sideDishes.push(i);
    } else if (i.group === "Dolci") {
      desserts.push(i);
    } else if (i.group === "Vini Bianchi") {
      whiteWines.push(i);
    } else if (i.group === "Vini Rossi") {
      redWines.push(i);
    } else if (i.group === "Acqua") {
      waters.push(i);
    } else if (i.group === "Bibite") {
      drinks.push(i);
    }
  });

  return [
    <DishList
      key={1}
      dishList={appetizers}
      title="Antipasti"
      incrementOrderDetailQuantity={props.incrementOrderDetailQuantity}
    />,
    <DishList
      key={2}
      dishList={firstDishes}
      title="Primi"
      incrementOrderDetailQuantity={props.incrementOrderDetailQuantity}
    />,
    <DishList
      key={3}
      dishList={secondDishes}
      title="Secondi"
      incrementOrderDetailQuantity={props.incrementOrderDetailQuantity}
    />,
    <DishList
      key={4}
      dishList={sideDishes}
      title="Contorni"
      incrementOrderDetailQuantity={props.incrementOrderDetailQuantity}
    />,
    <DishList
      key={5}
      dishList={desserts}
      title="Dolci"
      incrementOrderDetailQuantity={props.incrementOrderDetailQuantity}
    />,
    <DishList
      key={6}
      dishList={whiteWines}
      title="Vini Bianchi"
      incrementOrderDetailQuantity={props.incrementOrderDetailQuantity}
    />,
    <DishList
      key={7}
      dishList={redWines}
      title="Vini Rossi"
      incrementOrderDetailQuantity={props.incrementOrderDetailQuantity}
    />,
    <DishList
      key={8}
      dishList={waters}
      title="Acqua"
      incrementOrderDetailQuantity={props.incrementOrderDetailQuantity}
    />,
    <DishList
      key={9}
      dishList={drinks}
      title="Bibite"
      incrementOrderDetailQuantity={props.incrementOrderDetailQuantity}
    />
  ];
};

Body.propTypes = {
  dishList: PropTypes.array.isRequired
};

export default Body;
