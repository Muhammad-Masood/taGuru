// assets
import { IconEdit } from '@tabler/icons';
// constant
const icons = { IconEdit };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const update = {
    id: 'update',
    title: 'Update',
    type: 'group',
    children: [
        {
            id: 'update',
            title: 'Update',
            type: 'item',
            url: '/update/Update',
            icon: icons.IconEdit,
            breadcrumbs: false
        }
    ]
};

export default update;
