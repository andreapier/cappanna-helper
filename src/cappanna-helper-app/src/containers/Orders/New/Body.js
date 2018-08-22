import React from "react";
import DishList from "containers/Orders/New/DishList";

const Body = () => {
  return [
    <DishList key={1} group="Antipasti" title="Antipasti" />,
    <DishList key={2} group="Primi piatti" title="Primi" />,
    <DishList key={3} group="Secondi piatti" title="Secondi" />,
    <DishList key={4} group="Contorni" title="Contorni" />,
    <DishList key={5} group="Dolci" title="Dolci" />,
    <DishList key={6} group="Vini Bianchi" title="Vini Bianchi" />,
    <DishList key={7} group="Vini Rossi" title="Vini Rossi" />,
    <DishList key={8} group="Acqua" title="Acqua" />,
    <DishList key={9} group="Bibite" title="Bibite" />
  ];
};

export default Body;
