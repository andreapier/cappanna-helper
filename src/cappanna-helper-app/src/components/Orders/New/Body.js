import React from "react";
import DishList from "components/Orders/New/DishList";
import PropTypes from "prop-types";

const Body = (props) => {
    const appetizers = [];
    const firstDishes = [];
    const secondDishes = [];
    const sideDishes = [];
    const desserts = [];
    const whiteWines = [];
    const redWines = [];
    const waters = [];
    const drinks = [];

    props.details.forEach((i) => {
        if (i.item.group === "Antipasti") {
            appetizers.push(i);
        } else if (i.item.group === "Primi piatti") {
            firstDishes.push(i);
        } else if (i.item.group === "Secondi piatti") {
            secondDishes.push(i);
        } else if (i.item.group === "Contorni") {
            sideDishes.push(i);
        } else if (i.item.group === "Dolci") {
            desserts.push(i);
        } else if (i.item.group === "Vini Bianchi") {
            whiteWines.push(i);
        } else if (i.item.group === "Vini Rossi") {
            redWines.push(i);
        } else if (i.item.group === "Acqua") {
            waters.push(i);
        } else if (i.item.group === "Bibite") {
            drinks.push(i);
        }
    });

    return [
        <DishList key={1} details={appetizers} title="Antipasti" incrementOrderDetailQuantity={props.incrementOrderDetailQuantity} />,
        <DishList key={2} details={firstDishes} title="Primi" incrementOrderDetailQuantity={props.incrementOrderDetailQuantity} />,
        <DishList key={3} details={secondDishes} title="Secondi" incrementOrderDetailQuantity={props.incrementOrderDetailQuantity} />,
        <DishList key={4} details={sideDishes} title="Contorni" incrementOrderDetailQuantity={props.incrementOrderDetailQuantity} />,
        <DishList key={5} details={desserts} title="Dolci" incrementOrderDetailQuantity={props.incrementOrderDetailQuantity} />,
        <DishList key={6} details={whiteWines} title="Vini Bianchi" incrementOrderDetailQuantity={props.incrementOrderDetailQuantity} />,
        <DishList key={7} details={redWines} title="Vini Rossi" incrementOrderDetailQuantity={props.incrementOrderDetailQuantity} />,
        <DishList key={8} details={waters} title="Acqua" incrementOrderDetailQuantity={props.incrementOrderDetailQuantity} />,
        <DishList key={9} details={drinks} title="Bibite" incrementOrderDetailQuantity={props.incrementOrderDetailQuantity} />
    ];
};

Body.propTypes = {
    details: PropTypes.arrayOf(
        PropTypes.shape({
            item: PropTypes.shape({
                group: PropTypes.string.isRequired
            })
        })
    ).isRequired,
    incrementOrderDetailQuantity: PropTypes.func.isRequired
};

export default Body;
