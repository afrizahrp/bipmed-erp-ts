import { DashBoard, Note2, Settings } from '@/components/svg';

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
  // megaMenu?: MenuItemProps[];
}

export const menusConfig = {
  sidebarNav: {
    classic: [
      {
        isHeader: true,
        title: 'Application',
      },

      {
        title: 'Inventory',
        href: '#',
        icon: DashBoard,
        child: [
          {
            title: 'Dashboard',
            href: '/inventory/dashboard',
            icon: DashBoard,
          },

          {
            title: 'List',
            href: '/inventory/master',
            multi_menu: [
              {
                title: 'Categories',
                href: '/inventory/categories/category-list',
              },
              {
                title: 'Products',
                href: '/inventory/products/product-list',
              },
              {
                title: 'Subcategories',
                href: '/inventory/subcategories/subcategory-list',
              },
              {
                title: 'Raw Materials',
                href: '/inventory/materials/material-list',
              },
            ],
          },
        ],
      },

      {
        title: 'Production',
        icon: Note2,
        child: [
          {
            title: 'List',
            multi_menu: [
              {
                title: 'Finish Goods',
                href: '/production/finishgoods/finishgoods-list',
              },
            ],
          },
        ],
      },

      {
        title: 'Settings',
        icon: Settings,
        child: [
          {
            title: 'Website',
            href: '/cms/master',
            multi_menu: [
              {
                title: 'Products',
                href: '/cms/products/product-list',
              },
              {
                title: 'Billboards',
                href: '/cms/billboards/billboard-list',
              },
              {
                title: 'Categories',
                href: '/cms/categories/category-list',
              },
              {
                title: 'Price List',
                href: '/cms/pricelist/price-list',
              },
            ],
          },

          {
            title: 'User Management',
            multi_menu: [
              {
                title: 'Roles',
                href: '/settings/user-role/role-list',
              },
              {
                title: 'Users',
                href: '/cms/products/product-list',
              },
              {
                title: 'Permissions',
                href: '/cms/categories/category-list',
              },
            ],
          },
        ],
      },
    ],
  },
};

export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
