// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";
import menuItem, { AdminMenuItems } from "menu-items";
import { useContextAPI } from "index";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { LoggedInUser, setLoggedInUser } = useContextAPI();


  let navItems = "";

  if (LoggedInUser?.isCand == false) {
    navItems = AdminMenuItems.items.map((item) => {
      switch (item.type) {
        case "group":
          return (
            <>
              <NavGroup key={item.id} item={item} />
            </>
          );
        // return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });
  } else {
    navItems = menuItem.items.map((item) => {
      switch (item.type) {
        case "group":
          return (
            <>
              <NavGroup key={item.id} item={item} />
            </>
          );
        // return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });
  }

  return <>{navItems}</>;
};

export default MenuList;
