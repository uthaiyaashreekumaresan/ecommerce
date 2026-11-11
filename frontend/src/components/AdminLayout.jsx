import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import {
  DashboardOutlined,
  Inventory2Outlined,
  CategoryOutlined,
  ShoppingBagOutlined,
  PeopleOutline,
  StorefrontOutlined,
  Logout,
  Menu as MenuIcon,
  DiamondOutlined,
  ViewCarouselOutlined
} from '@mui/icons-material';

const drawerWidth = 260;

export default function AdminLayout() {
  const { adminUser: user, adminLogout: logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAdminSignOut = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardOutlined />, path: '/admin' },
    { text: 'Home Page Manager', icon: <ViewCarouselOutlined />, path: '/admin/homepage' },
    { text: 'Products', icon: <Inventory2Outlined />, path: '/admin/products' },
    { text: 'Categories & Brands', icon: <CategoryOutlined />, path: '/admin/categories' },
    { text: 'Orders', icon: <ShoppingBagOutlined />, path: '/admin/orders' },
    { text: 'Customers', icon: <PeopleOutline />, path: '/admin/customers' },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#292536', color: '#fff' }}>
      {/* Admin Logo */}
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Link to="/admin" className="text-decoration-none bg-white p-2 rounded-2 text-center shadow-sm">
          <img
            src="/images/elixir-parfums-logo.jpg"
            alt="Élixir Parfums"
            style={{
              height: '36px',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto'
            }}
          />
        </Link>
        <Typography variant="caption" sx={{ color: '#B8AFCB', letterSpacing: '1.5px', textTransform: 'uppercase', fontSize: '0.65rem', textAlign: 'center', fontWeight: 600, mt: 0.5 }}>
          Admin Backoffice
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(184, 175, 203, 0.2)' }} />

      {/* Nav List */}
      <List sx={{ px: 1, py: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 1.5,
                  backgroundColor: isActive ? 'rgba(184, 175, 203, 0.18)' : 'transparent',
                  color: isActive ? '#B8AFCB' : '#C0C0C0',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#fff'
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#B8AFCB' : '#77708F', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: '0.88rem', fontWeight: isActive ? 700 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(184, 175, 203, 0.2)' }} />

      {/* Switch to Storefront & Logout */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          component={Link}
          to="/"
          startIcon={<StorefrontOutlined />}
          sx={{
            mb: 1.5,
            borderColor: 'rgba(184, 175, 203, 0.4)',
            color: '#B8AFCB',
            fontSize: '0.8rem',
            '&:hover': { borderColor: '#B8AFCB', color: '#fff', backgroundColor: 'rgba(184, 175, 203, 0.1)' }
          }}
        >
          View Storefront
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleAdminSignOut}
          startIcon={<Logout />}
          sx={{
            backgroundColor: '#77708F',
            color: '#fff',
            fontSize: '0.8rem',
            '&:hover': { backgroundColor: '#645D7B' }
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F7F5FA' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#ffffff',
          color: '#292536',
          boxShadow: 'none',
          borderBottom: '1px solid #E2DFEB'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#292536' }}>
            Backoffice Management Portal
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#292536' }}>
                {user?.name === 'Admin Store Manager' ? 'Administrator' : (user?.name || 'Administrator')}
              </Typography>
              <Typography variant="caption" sx={{ color: '#77708F' }}>
                {user?.email || 'Admin Session'}
              </Typography>
            </Box>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: '#77708F',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              {(user?.name || 'A')[0].toUpperCase()}
            </div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' }
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          backgroundColor: '#F7F5FA',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
