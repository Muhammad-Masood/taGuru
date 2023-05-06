// assets
import { IconForms } from '@tabler/icons';

// constant
const icons = { IconForms };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const create = {
    id: 'create',
    title: 'Create',
    type: 'group',
    children: [
        {
            id: 'create',
            title: 'Create',
            type: 'item',
            url: '/create/Create',
            icon: icons.IconForms,
            breadcrumbs: false
        }
    ]
};

export default create;
