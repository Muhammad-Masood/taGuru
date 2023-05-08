import { Outlet } from "react-router-dom";

// project imports
import Customization from "../Customization";

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <div style={{ backgroundColor: "radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)" }}>
    <Outlet />
  </div>
);

export default MinimalLayout;
