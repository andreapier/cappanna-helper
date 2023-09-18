import React, { useState } from "react";
import DishList from "./DishList";

const Body = () => {
    const [expanded, setExpanded] = useState("");
    const handleSetExpanded = group => setExpanded(expanded === group ? "" : group); // toggle or change expanded

    const lists = [{
        group: "Antipasti",
        title: "Antipasti"
    }, {
        group: "Primi piatti",
        title: "Primi"
    }, {
        group: "Secondi piatti",
        title: "Secondi"
    }, {
        group: "Contorni",
        title: "Contorni"
    }, {
        group: "Dolci",
        title: "Dolci"
    }, {
        group: "Vini Bianchi",
        title: "Vini Bianchi"
    }, {
        group: "Vini Rossi",
        title: "Vini Rossi"
    }, {
        group: "Acqua",
        title: "Acqua"
    }, {
        group: "Bibite",
        title: "Bibite"
    }];

    return lists.map((e, i) => (
        <DishList
            key={i}
            group={e.group}
            title={e.title}
            expanded={expanded === e.group}
            onExpandedChange={handleSetExpanded}
        />));
};

export default Body;