// assets
import { IconLivePhoto } from '@tabler/icons';

// constant
const icons = { IconLivePhoto };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const display = {
    id: 'display',
    title: 'Display',
    type: 'group',
    children: [
        {
            id: 'display',
            title: 'Display',
            type: 'item',
            url: '/display/Display',
            icon: icons.IconLivePhoto,
            breadcrumbs: false
        }
    ]
};

export default display;
