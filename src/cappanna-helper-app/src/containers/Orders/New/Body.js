import React from "react";
import ConnectedDishList from "containers/Orders/New/ConnectedDishList";

const Body = () => {
    return [
        <ConnectedDishList key={1} group="Antipasti" title="Antipasti" />,
        <ConnectedDishList key={2} group="Primi piatti" title="Primi" />,
        <ConnectedDishList key={3} group="Secondi piatti" title="Secondi" />,
        <ConnectedDishList key={4} group="Contorni" title="Contorni" />,
        <ConnectedDishList key={5} group="Dolci" title="Dolci" />,
        <ConnectedDishList key={6} group="Vini Bianchi" title="Vini Bianchi" />,
        <ConnectedDishList key={7} group="Vini Rossi" title="Vini Rossi" />,
        <ConnectedDishList key={8} group="Acqua" title="Acqua" />,
        <ConnectedDishList key={9} group="Bibite" title="Bibite" />
    ];
};

export default Body;
