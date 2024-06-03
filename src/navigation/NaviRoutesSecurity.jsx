import { createBrowserRouter } from "react-router-dom";
import Home from '../security/home/pages/Home'
import Error from '../share/errors/pages/Error'
import Precios from '../security/precios/pages/Precios'
import Roles from "../security/roles/pages/Roles";
import Promociones from '../security/promociones/pages/Promociones'
import Negocios from "../security/negocios/pages/Negocios";
import Institutos from "../security/institutes/pages/Institutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/institutos",
        element: <Institutos />
      },
      {
        path: "/precios",
        element: <Precios />,
      },
      {
        path: "/roles",
        element: <Roles />,
      },
      {
        path: "/promociones",
        element: <Promociones />,
      },
      {
        path: "/negocios",
        element: <Negocios />,
      },
    ],
  },
]);
export default router;
