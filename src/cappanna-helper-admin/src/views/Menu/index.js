import React from "react";
import RegularCard from "components/Cards/RegularCard";
import MenuTable from 'containers/MenuTable';

const MenuPage = (props) => {
  return (
    <RegularCard
        cardTitle={"Menu"}
        content={
          <MenuTable />
      }
    />
  );
};

export default MenuPage;
