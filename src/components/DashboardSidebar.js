import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Drawer, Hidden, List, Button } from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Inbox as InboxIcon,
  PlusSquare as PlusSquareIcon,
  MapPin as BusinessIcon,
  Users as UsersIcon,
  FileText as FileTextIcon,
  User as UserIcon,
  Edit as EditIcon
} from 'react-feather';
import NavItem from './NavItem';

// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith'
// };

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/requests',
    icon: InboxIcon,
    title: 'Requests'
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Users'
  },
  {
    href: '/app/service-providers',
    icon: PlusSquareIcon,
    title: 'Service Providers'
  },
  {
    href: '/app/ambulances',
    icon: PlusSquareIcon,
    title: 'Ambulances'
  },
  {
    href: '/app/businesses',
    icon: BusinessIcon,
    title: 'Pharmacy/Insurance'
  },

  {
    href: '/app/products',
    icon: InboxIcon,
    title: 'Products'
  },
  {
    href: '/app/generics',
    icon: FileTextIcon,
    title: 'Generics'
  },
  // {
  //   href: '/app/services',
  //   icon: FileTextIcon,
  //   title: 'Services'
  // },
  // {
  //   href: '/app/categories',
  //   icon: FileTextIcon,
  //   title: 'Categories'
  // },
  {
    href: '/app/settings',
    icon: UserIcon,
    title: 'Profile'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          <Button
            sx={{
              color: 'text.secondary',
              fontWeight: 'medium',
              justifyContent: 'flex-start',
              letterSpacing: 0,
              py: 1.25,
              textTransform: 'none',
              width: '100%',
              '& svg': {
                mr: 1
              }
            }}
          >
            <a
              href="https://blog.daktarinyumbani.or.tz/wp-admin"
              target="_blank"
              rel="noreferrer"
            >
              <EditIcon />
              <span>Blog</span>
            </a>
          </Button>
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
