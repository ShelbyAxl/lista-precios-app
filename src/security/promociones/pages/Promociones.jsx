import { Box } from "@mui/material";
import { useState } from "react";
import PromocionesNavTab from "../components/tabs/PromocionesNavTab";
import PromocionesTab from "../components/tables/PromocionesTable";
import CondicionesTab from "../../condiciones/components/tables/CondicionesTable";

const Promociones = () => {
  const [currentNameTabInPromocionesTab, setCurrentNameTabInPromocionesTab] = useState(0);
  const [currentTabPrincipalTab, setCurrentTabPrincipalTab] = useState("PROMOCIONES");

  return (
    <Box>
      <PromocionesNavTab 
        currentRowInBusinessTab={setCurrentNameTabInPromocionesTab}
        setCurrentNameTabInBusinessTab={setCurrentTabPrincipalTab}
      />

      {currentTabPrincipalTab == "PROMOCIONES" && <PromocionesTab />}
      {currentTabPrincipalTab == "CONDICIONES" && <CondicionesTab />}
    </Box>
  );
};

export default Promociones;
