import { createBrowserRouter } from "react-router-dom";
import Home from '../security/home/pages/Home'
import Error from '../share/errors/pages/Error'
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
      }
    ],
  },
]);
export default router;
