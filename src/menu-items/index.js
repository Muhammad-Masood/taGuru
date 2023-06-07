import dashboard from './dashboard';
import create from './create';
import display from './display';
import update from './update';
import Chat from '../landing/constants/chat';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, create, display, update]
};

export const AdminMenuItems = {
    items:[dashboard, display]
}


export default menuItems;
