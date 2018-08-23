import React from "react";
import RegularCard from "components/Cards/RegularCard";
import MenuTable from 'containers/MenuTable';

const MenuPage = (props) => {
  return (
    <RegularCard cardTitle="Menu">
      <MenuTable />
    </RegularCard>
  );
};

export default MenuPage;
