import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Typography,
  Collapse
} from '@mui/material';
import {
  ShoppingBagOutlined,
  FavoriteBorder,
  PersonOutline,
  Menu as MenuIcon,
  LocalShippingOutlined,
  LocationOnOutlined,
  VerifiedOutlined,
  AccessTimeOutlined,
  Logout,
  Close,
  DiamondOutlined,
  HomeOutlined,
  InfoOutlined,
  CategoryOutlined,
  MailOutline,
  KeyboardArrowDown,
  ChevronRight,
  AutoAwesomeOutlined
} from '@mui/icons-material';
import LiveSearchBar from './LiveSearchBar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  // Profile menu state
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const handleProfileOpen = (e) => setProfileAnchorEl(e.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);

  // Scroll detection to smoothly hide announcement bar on scroll & reveal when back to top
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY || window.pageYOffset || 0;
          if (currentScrollY > 20) {
            setIsScrolled(true);
          } else if (currentScrollY <= 15) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile drawer & mobile categories accordion
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  // Categories Dropdown state (Desktop: supports both hover & click)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimerRef = useRef(null);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const handleToggleClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown & mobile drawer on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Determine active navigation states
  const isHomeActive = location.pathname === '/';
  const isAboutActive = location.pathname === '/about';
  const isAllPerfumesActive =
    location.pathname === '/products' && !location.search.includes('category=');
  const isCategoriesActive =
    location.search.includes('category=') || dropdownOpen;
  const isContactActive = location.pathname === '/contact';

  // EXACTLY 5 CATEGORY ITEMS as specified
  const categoryItems = [
    { name: "Men's Perfume", path: '/products?category=mens-perfumes' },
    { name: "Women's Perfume", path: '/products?category=womens-perfumes' },
    { name: 'Arabic Perfume', path: '/products?category=arabic-perfumes' },
    { name: 'Luxury Perfume', path: '/products?category=luxury-perfumes' },
    { name: 'Unisex Perfume', path: '/products?category=unisex-perfumes' }
  ];

  return (
    <header className="sticky-top shadow-sm" style={{ zIndex: 1100 }}>
      {/* Top Announcement Bar - Smooth Collapsible on Scroll */}
      <div
        className={`announcement-bar d-flex justify-content-between align-items-center px-3 px-md-4 ${
          isScrolled ? 'collapsed' : ''
        }`}
      >
        <div className="d-flex align-items-center text-truncate me-2">
          <LocalShippingOutlined sx={{ fontSize: 15, mr: 0.8, color: '#B8AFCB', flexShrink: 0 }} />
          <span className="text-truncate">Free Express Shipping on Orders Above ₹999</span>
        </div>
        <div className="d-flex align-items-center gap-2 gap-md-3 flex-shrink-0">
          <div className="d-none d-md-flex align-items-center">
            <VerifiedOutlined sx={{ fontSize: 14, mr: 0.6, color: '#B8AFCB' }} />
            <span>100% IFRA Certified & Cruelty-Free</span>
          </div>
          <span className="text-secondary d-none d-md-inline" style={{ opacity: 0.5 }}>|</span>
          <div className="d-flex align-items-center">
            <AccessTimeOutlined sx={{ fontSize: 14, mr: 0.6, color: '#B8AFCB' }} />
            <span>12+ Hours Longevity</span>
          </div>
        </div>
      </div>

      {/* Main Single-Row Navbar Header */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          borderBottom: '1px solid #ECE9F1',
          boxShadow: '0 2px 10px rgba(41, 37, 54, 0.04)',
          position: 'relative'
        }}
      >
        <div className="container-fluid px-3 px-xl-4 py-2">
          <div className="d-flex align-items-center justify-content-between gap-2 gap-xl-3">

            {/* Left: Mobile Drawer Trigger & Brand Logo */}
            <div className="d-flex align-items-center" style={{ flexShrink: 0 }}>
              <IconButton
                edge="start"
                className="d-lg-none me-2"
                sx={{ color: '#292536' }}
                aria-label="menu"
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Link
                to="/"
                className="navbar-brand navbar-brand-wrapper me-2 me-md-3 me-xl-4"
                style={{ padding: '0', margin: '0' }}
              >
                {/* 1. Large Perfume Bottle Symbol */}
                <img
                  src="/images/elixir-bottle-symbol.png?v=1"
                  alt="Élixir Bottle Emblem"
                  className="navbar-bottle-symbol"
                />

                {/* 2. Brand Name & Haute Parfumerie Subtitle */}
                <div className="navbar-brand-text">
                  <div className="navbar-brand-title">
                    ÉLIXIR PARFUMS
                  </div>
                  <div className="navbar-brand-subtitle">
                    <span className="gold-rule"></span>
                    <span>HAUTE PARFUMERIE</span>
                    <span className="gold-rule"></span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Center: EXACTLY 5 Main Navigation Items */}
            <nav className="d-none d-lg-flex align-items-center justify-content-center gap-1 gap-xl-2 mx-1 mx-xl-2" style={{ flexShrink: 1 }}>
              
              {/* 1. Home */}
              <Link
                to="/"
                className="text-decoration-none"
                style={{
                  color: isHomeActive ? '#292536' : '#4A4458',
                  backgroundColor: isHomeActive ? '#F3F0F9' : 'transparent',
                  padding: '7px 16px',
                  borderRadius: '24px',
                  fontSize: '0.9rem',
                  fontWeight: isHomeActive ? 700 : 500,
                  letterSpacing: '0.2px',
                  transition: 'all 0.2s ease',
                  border: isHomeActive ? '1px solid #D8D2E4' : '1px solid transparent',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isHomeActive) {
                    e.currentTarget.style.color = '#292536';
                    e.currentTarget.style.backgroundColor = '#F9F8FC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isHomeActive) {
                    e.currentTarget.style.color = '#4A4458';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>Home</span>
              </Link>

              {/* 2. About */}
              <Link
                to="/about"
                className="text-decoration-none"
                style={{
                  color: isAboutActive ? '#292536' : '#4A4458',
                  backgroundColor: isAboutActive ? '#F3F0F9' : 'transparent',
                  padding: '7px 16px',
                  borderRadius: '24px',
                  fontSize: '0.9rem',
                  fontWeight: isAboutActive ? 700 : 500,
                  letterSpacing: '0.2px',
                  transition: 'all 0.2s ease',
                  border: isAboutActive ? '1px solid #D8D2E4' : '1px solid transparent',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isAboutActive) {
                    e.currentTarget.style.color = '#292536';
                    e.currentTarget.style.backgroundColor = '#F9F8FC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isAboutActive) {
                    e.currentTarget.style.color = '#4A4458';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>About</span>
              </Link>

              {/* 3. All Perfumes */}
              <Link
                to="/products"
                className="text-decoration-none"
                style={{
                  color: isAllPerfumesActive ? '#292536' : '#4A4458',
                  backgroundColor: isAllPerfumesActive ? '#F3F0F9' : 'transparent',
                  padding: '7px 16px',
                  borderRadius: '24px',
                  fontSize: '0.9rem',
                  fontWeight: isAllPerfumesActive ? 700 : 500,
                  letterSpacing: '0.2px',
                  transition: 'all 0.2s ease',
                  border: isAllPerfumesActive ? '1px solid #D8D2E4' : '1px solid transparent',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isAllPerfumesActive) {
                    e.currentTarget.style.color = '#292536';
                    e.currentTarget.style.backgroundColor = '#F9F8FC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isAllPerfumesActive) {
                    e.currentTarget.style.color = '#4A4458';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>All Perfumes</span>
              </Link>

              {/* 4. Categories (Dropdown on Hover & Click) */}
              <div
                className="position-relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={handleToggleClick}
                  style={{
                    color: isCategoriesActive ? '#292536' : '#4A4458',
                    backgroundColor: isCategoriesActive ? '#F3F0F9' : 'transparent',
                    padding: '7px 16px',
                    borderRadius: '24px',
                    fontSize: '0.9rem',
                    fontWeight: isCategoriesActive ? 700 : 500,
                    letterSpacing: '0.2px',
                    transition: 'all 0.2s ease',
                    border: isCategoriesActive ? '1px solid #D8D2E4' : '1px solid transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    outline: 'none',
                    background: isCategoriesActive ? '#F3F0F9' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCategoriesActive) {
                      e.currentTarget.style.color = '#292536';
                      e.currentTarget.style.backgroundColor = '#F9F8FC';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCategoriesActive) {
                      e.currentTarget.style.color = '#4A4458';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span>Categories</span>
                  <KeyboardArrowDown
                    sx={{
                      fontSize: 18,
                      color: isCategoriesActive ? '#292536' : '#77708F',
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </button>

                {/* Categories Dropdown Menu - EXACTLY 5 ITEMS */}
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: dropdownOpen
                      ? 'translateX(-50%) translateY(8px)'
                      : 'translateX(-50%) translateY(16px)',
                    opacity: dropdownOpen ? 1 : 0,
                    visibility: dropdownOpen ? 'visible' : 'hidden',
                    pointerEvents: dropdownOpen ? 'auto' : 'none',
                    transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.2s',
                    width: '230px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #ECE9F1',
                    boxShadow: '0 14px 34px rgba(41, 37, 54, 0.12), 0 2px 8px rgba(41, 37, 54, 0.04)',
                    padding: '8px 0',
                    zIndex: 1200
                  }}
                >
                  {/* Small top caret pointing to button */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#FFFFFF',
                      borderLeft: '1px solid #ECE9F1',
                      borderTop: '1px solid #ECE9F1'
                    }}
                  />

                  {/* Exactly 5 items in dropdown */}
                  <ul className="list-unstyled m-0 p-0">
                    {categoryItems.map((item, idx) => {
                      const isItemActive = location.search.includes(item.path.split('?')[1]);
                      return (
                        <li key={idx}>
                          <Link
                            to={item.path}
                            onClick={() => setDropdownOpen(false)}
                            className="text-decoration-none d-flex align-items-center justify-content-between px-3 py-2"
                            style={{
                              color: isItemActive ? '#77708F' : '#292536',
                              backgroundColor: isItemActive ? '#F7F5FA' : 'transparent',
                              fontWeight: isItemActive ? 700 : 500,
                              fontSize: '0.88rem',
                              letterSpacing: '0.2px',
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#F7F5FA';
                              e.currentTarget.style.color = '#77708F';
                              e.currentTarget.style.paddingLeft = '18px';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = isItemActive ? '#F7F5FA' : 'transparent';
                              e.currentTarget.style.color = isItemActive ? '#77708F' : '#292536';
                              e.currentTarget.style.paddingLeft = '16px';
                            }}
                          >
                            <span>{item.name}</span>
                            <ChevronRight sx={{ fontSize: 16, color: '#B8AFCB' }} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* 5. Contact */}
              <Link
                to="/contact"
                className="text-decoration-none"
                style={{
                  color: isContactActive ? '#292536' : '#4A4458',
                  backgroundColor: isContactActive ? '#F3F0F9' : 'transparent',
                  padding: '7px 16px',
                  borderRadius: '24px',
                  fontSize: '0.9rem',
                  fontWeight: isContactActive ? 700 : 500,
                  letterSpacing: '0.2px',
                  transition: 'all 0.2s ease',
                  border: isContactActive ? '1px solid #D8D2E4' : '1px solid transparent',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isContactActive) {
                    e.currentTarget.style.color = '#292536';
                    e.currentTarget.style.backgroundColor = '#F9F8FC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isContactActive) {
                    e.currentTarget.style.color = '#4A4458';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>Contact</span>
              </Link>
            </nav>

            {/* Right: Search Bar & User / Wishlist / Cart Icons */}
            <div className="d-flex align-items-center justify-content-end gap-1 gap-sm-2" style={{ flexShrink: 0 }}>
              
              {/* Live Auto-Suggestions Product Search (Desktop) */}
              <div
                className="d-none d-md-flex align-items-center"
                style={{
                  width: '240px',
                  maxWidth: '260px',
                  marginTop: '2px',
                  marginBottom: '1px'
                }}
              >
                <LiveSearchBar placeholder="Search perfumes..." />
              </div>

              {/* Profile Icon */}
              <IconButton onClick={handleProfileOpen} sx={{ color: '#292536', p: 0.5 }} title="Account">
                {user && user.role !== 'admin' && user.avatar ? (
                  <Avatar
                    src={user.avatar}
                    imgProps={{ referrerPolicy: 'no-referrer' }}
                    alt={user.name}
                    sx={{ width: 30, height: 30, border: '1.5px solid #C5A059' }}
                  />
                ) : (
                  <PersonOutline />
                )}
              </IconButton>

              <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                TransitionProps={{ timeout: 200 }}
                PaperProps={{
                  elevation: 6,
                  sx: {
                    minWidth: 230,
                    borderRadius: '12px',
                    mt: 1.2,
                    backgroundColor: '#ffffff',
                    color: '#292536',
                    border: '1px solid #ECE9F1',
                    boxShadow: '0 8px 30px rgba(41, 37, 54, 0.12)',
                    overflow: 'hidden'
                  }
                }}
              >
                {user && user.role !== 'admin' ? (
                  <div>
                    <Box sx={{ px: 2.2, py: 1.8, backgroundColor: '#FAF9FD', borderBottom: '1px solid #ECE9F1', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {user.avatar ? (
                        <Avatar
                          src={user.avatar}
                          imgProps={{ referrerPolicy: 'no-referrer' }}
                          alt={user.name}
                          sx={{ width: 40, height: 40, border: '2px solid #C5A059' }}
                        />
                      ) : (
                        <Avatar sx={{ width: 40, height: 40, backgroundColor: '#292536', color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700 }}>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </Avatar>
                      )}
                      <div style={{ overflow: 'hidden' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#292536', fontSize: '0.92rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#77708F', display: 'block', fontSize: '0.78rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {user.email}
                        </Typography>
                      </div>
                    </Box>

                    {/* 1. Orders & Tracking */}
                    <MenuItem
                      onClick={() => {
                        handleProfileClose();
                        navigate('/orders');
                      }}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontWeight: 600,
                        color: '#292536',
                        fontSize: '0.88rem',
                        transition: 'all 0.18s ease',
                        '&:hover': { backgroundColor: '#F3F0F9', color: '#1F1B2B', pl: 2.3 }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 34 }}>
                        <LocalShippingOutlined fontSize="small" sx={{ color: '#77708F' }} />
                      </ListItemIcon>
                      Orders & Tracking
                    </MenuItem>

                    {/* 2. Account & Address */}
                    <MenuItem
                      onClick={() => {
                        handleProfileClose();
                        navigate('/account');
                      }}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontWeight: 600,
                        color: '#292536',
                        fontSize: '0.88rem',
                        transition: 'all 0.18s ease',
                        '&:hover': { backgroundColor: '#F3F0F9', color: '#1F1B2B', pl: 2.3 }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 34 }}>
                        <LocationOnOutlined fontSize="small" sx={{ color: '#77708F' }} />
                      </ListItemIcon>
                      Account & Address
                    </MenuItem>

                    <Divider sx={{ borderColor: '#ECE9F1', my: 0.5 }} />

                    {/* 3. Logout */}
                    <MenuItem
                      onClick={() => {
                        handleProfileClose();
                        logout();
                        navigate('/');
                      }}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontWeight: 600,
                        color: '#dc2626',
                        fontSize: '0.88rem',
                        transition: 'all 0.18s ease',
                        '&:hover': { backgroundColor: '#FEE2E2', pl: 2.3 }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 34 }}>
                        <Logout fontSize="small" sx={{ color: '#dc2626' }} />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </div>
                ) : (
                  <div>
                    {/* Unauthenticated Menu: Items navigate to protected routes which prompt login */}
                    <MenuItem
                      onClick={() => {
                        handleProfileClose();
                        navigate('/orders');
                      }}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontWeight: 600,
                        color: '#292536',
                        fontSize: '0.88rem',
                        transition: 'all 0.18s ease',
                        '&:hover': { backgroundColor: '#F3F0F9', pl: 2.3 }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 34 }}>
                        <LocalShippingOutlined fontSize="small" sx={{ color: '#77708F' }} />
                      </ListItemIcon>
                      Orders & Tracking
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleProfileClose();
                        navigate('/account');
                      }}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontWeight: 600,
                        color: '#292536',
                        fontSize: '0.88rem',
                        transition: 'all 0.18s ease',
                        '&:hover': { backgroundColor: '#F3F0F9', pl: 2.3 }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 34 }}>
                        <LocationOnOutlined fontSize="small" sx={{ color: '#77708F' }} />
                      </ListItemIcon>
                      Account & Address
                    </MenuItem>

                    <Divider sx={{ borderColor: '#ECE9F1', my: 0.5 }} />

                    <MenuItem
                      onClick={() => {
                        handleProfileClose();
                        navigate('/login');
                      }}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontWeight: 600,
                        color: '#292536',
                        fontSize: '0.88rem',
                        transition: 'all 0.18s ease',
                        '&:hover': { backgroundColor: '#F3F0F9', pl: 2.3 }
                      }}
                    >
                      Sign In
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleProfileClose();
                        navigate('/register');
                      }}
                      sx={{
                        py: 1.2,
                        px: 2,
                        fontWeight: 600,
                        color: '#77708F',
                        fontSize: '0.88rem',
                        transition: 'all 0.18s ease',
                        '&:hover': { backgroundColor: '#F3F0F9', pl: 2.3 }
                      }}
                    >
                      Create Account
                    </MenuItem>
                  </div>
                )}
              </Menu>

              {/* Wishlist Icon with Badge */}
              <IconButton
                component={Link}
                to="/wishlist"
                sx={{ color: '#292536', position: 'relative' }}
                title={`Wishlist (${wishlistCount})`}
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Badge
                  badgeContent={wishlistCount}
                  showZero
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      height: 18,
                      minWidth: 18,
                      borderRadius: '50%'
                    }
                  }}
                >
                  <FavoriteBorder />
                </Badge>
              </IconButton>

              {/* Cart Icon with Badge */}
              <IconButton
                component={Link}
                to="/cart"
                sx={{ color: '#292536', position: 'relative' }}
                title="Shopping Cart"
              >
                <Badge
                  badgeContent={totalItems}
                  showZero
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      height: 18,
                      minWidth: 18,
                      borderRadius: '50%'
                    }
                  }}
                >
                  <ShoppingBagOutlined />
                </Badge>
              </IconButton>
            </div>
          </div>

          {/* Mobile Live Search Bar (< md screens) */}
          <div className="d-block d-md-none mt-2 px-1" style={{ marginTop: '8px', marginBottom: '4px' }}>
            <LiveSearchBar
              placeholder="Search perfumes..."
              isMobile={true}
              onAfterNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Responsive Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#ffffff',
            color: '#292536',
            width: 290
          }
        }}
      >
        <Box sx={{ width: 290, p: 2.5, height: '100%', overflowY: 'auto' }}>
          <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <Link to="/" onClick={() => setMobileOpen(false)} className="navbar-brand-wrapper" style={{ gap: '8px' }}>
              <img
                src="/images/elixir-bottle-symbol.png?v=1"
                alt="Élixir Bottle Emblem"
                className="navbar-bottle-symbol"
                style={{ height: '38px' }}
              />
              <div className="navbar-brand-text">
                <div className="navbar-brand-title" style={{ fontSize: '1.08rem' }}>
                  ÉLIXIR PARFUMS
                </div>
                <div className="navbar-brand-subtitle" style={{ fontSize: '0.48rem', letterSpacing: '2px', marginTop: '1px' }}>
                  <span className="gold-rule" style={{ width: '10px' }}></span>
                  <span>HAUTE PARFUMERIE</span>
                  <span className="gold-rule" style={{ width: '10px' }}></span>
                </div>
              </div>
            </Link>
            <IconButton onClick={() => setMobileOpen(false)} size="small" sx={{ color: '#292536' }}>
              <Close />
            </IconButton>
          </div>

          {/* Exactly 5 Main Navigation Items in Mobile */}
          <List sx={{ p: 0 }}>
            
            {/* 1. Home */}
            <ListItem
              button
              component={Link}
              to="/"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isHomeActive ? '#F3F0F9' : 'transparent',
                color: '#292536'
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isHomeActive ? '#292536' : '#77708F' }}>
                <HomeOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  fontWeight: isHomeActive ? 700 : 600,
                  fontSize: '0.92rem'
                }}
              />
            </ListItem>

            {/* 2. About */}
            <ListItem
              button
              component={Link}
              to="/about"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isAboutActive ? '#F3F0F9' : 'transparent',
                color: '#292536'
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isAboutActive ? '#292536' : '#77708F' }}>
                <InfoOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="About"
                primaryTypographyProps={{
                  fontWeight: isAboutActive ? 700 : 600,
                  fontSize: '0.92rem'
                }}
              />
            </ListItem>

            {/* 3. All Perfumes */}
            <ListItem
              button
              component={Link}
              to="/products"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isAllPerfumesActive ? '#F3F0F9' : 'transparent',
                color: '#292536'
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isAllPerfumesActive ? '#292536' : '#77708F' }}>
                <AutoAwesomeOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="All Perfumes"
                primaryTypographyProps={{
                  fontWeight: isAllPerfumesActive ? 700 : 600,
                  fontSize: '0.92rem'
                }}
              />
            </ListItem>

            {/* 4. Categories (Accordion with EXACTLY 5 ITEMS) */}
            <ListItem
              button
              onClick={() => setMobileCategoriesOpen((prev) => !prev)}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isCategoriesActive ? '#F3F0F9' : 'transparent',
                color: '#292536'
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isCategoriesActive ? '#292536' : '#77708F' }}>
                <CategoryOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Categories"
                primaryTypographyProps={{
                  fontWeight: isCategoriesActive ? 700 : 600,
                  fontSize: '0.92rem'
                }}
              />
              <KeyboardArrowDown
                sx={{
                  transform: mobileCategoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  color: '#77708F'
                }}
              />
            </ListItem>

            {/* Sub-items: ONLY THE 5 SPECIFIED CATEGORIES */}
            <Collapse in={mobileCategoriesOpen} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, pr: 1, py: 0.5, backgroundColor: '#FAF9FC', borderRadius: '8px', mb: 1 }}>
                {categoryItems.map((item, idx) => {
                  const isSubActive = location.search.includes(item.path.split('?')[1]);
                  return (
                    <ListItem
                      button
                      key={idx}
                      component={Link}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      sx={{
                        py: 0.75,
                        px: 1.5,
                        borderRadius: '6px',
                        backgroundColor: isSubActive ? '#ECE9F2' : 'transparent'
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          fontSize: '0.86rem',
                          fontWeight: isSubActive ? 700 : 500,
                          color: isSubActive ? '#77708F' : '#292536'
                        }}
                      />
                      <ChevronRight sx={{ fontSize: 14, color: '#B8AFCB' }} />
                    </ListItem>
                  );
                })}
              </Box>
            </Collapse>

            {/* 5. Contact */}
            <ListItem
              button
              component={Link}
              to="/contact"
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                backgroundColor: isContactActive ? '#F3F0F9' : 'transparent',
                color: '#292536'
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isContactActive ? '#292536' : '#77708F' }}>
                <MailOutline fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Contact"
                primaryTypographyProps={{
                  fontWeight: isContactActive ? 700 : 600,
                  fontSize: '0.92rem'
                }}
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 2, borderColor: '#ECE9F1' }} />

          {/* User Account / Orders / Wishlist Section */}
          <List sx={{ p: 0 }}>
            {user && user.role !== 'admin' ? (
              <>
                <ListItem sx={{ px: 1, py: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  {user.avatar ? (
                    <Avatar
                      src={user.avatar}
                      imgProps={{ referrerPolicy: 'no-referrer' }}
                      alt={user.name}
                      sx={{ width: 38, height: 38, border: '2px solid #C5A059' }}
                    />
                  ) : (
                    <Avatar sx={{ width: 38, height: 38, backgroundColor: '#292536', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 700 }}>
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </Avatar>
                  )}
                  <ListItemText
                    primary={user.name}
                    secondary={user.email}
                    primaryTypographyProps={{ color: '#292536', fontWeight: 700, fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ sx: { color: '#77708F', fontSize: '0.78rem' } }}
                  />
                </ListItem>
                <ListItem button component={Link} to="/orders" onClick={() => setMobileOpen(false)} sx={{ borderRadius: '8px', mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}><LocalShippingOutlined sx={{ color: '#77708F' }} fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Orders & Tracking" primaryTypographyProps={{ color: '#292536', fontSize: '0.88rem', fontWeight: 600 }} />
                </ListItem>
                <ListItem button component={Link} to="/account" onClick={() => setMobileOpen(false)} sx={{ borderRadius: '8px', mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}><LocationOnOutlined sx={{ color: '#77708F' }} fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Account & Address" primaryTypographyProps={{ color: '#292536', fontSize: '0.88rem', fontWeight: 600 }} />
                </ListItem>
                <ListItem button component={Link} to="/wishlist" onClick={() => setMobileOpen(false)} sx={{ borderRadius: '8px', mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}><FavoriteBorder sx={{ color: '#ef4444' }} fontSize="small" /></ListItemIcon>
                  <ListItemText primary={`Wishlist (${wishlistCount})`} primaryTypographyProps={{ color: '#292536', fontSize: '0.88rem' }} />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                    navigate('/');
                  }}
                  sx={{ borderRadius: '8px', mt: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}><Logout sx={{ color: '#dc2626' }} fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Logout" primaryTypographyProps={{ color: '#dc2626', fontSize: '0.88rem', fontWeight: 600 }} />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={Link} to="/orders" onClick={() => setMobileOpen(false)} sx={{ borderRadius: '8px', mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}><LocalShippingOutlined sx={{ color: '#77708F' }} fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Orders & Tracking" primaryTypographyProps={{ color: '#292536', fontSize: '0.88rem', fontWeight: 600 }} />
                </ListItem>
                <ListItem button component={Link} to="/account" onClick={() => setMobileOpen(false)} sx={{ borderRadius: '8px', mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}><LocationOnOutlined sx={{ color: '#77708F' }} fontSize="small" /></ListItemIcon>
                  <ListItemText primary="Account & Address" primaryTypographyProps={{ color: '#292536', fontSize: '0.88rem', fontWeight: 600 }} />
                </ListItem>
                <ListItem button component={Link} to="/wishlist" onClick={() => setMobileOpen(false)} sx={{ borderRadius: '8px', mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}><FavoriteBorder sx={{ color: '#ef4444' }} fontSize="small" /></ListItemIcon>
                  <ListItemText primary={`Wishlist (${wishlistCount})`} primaryTypographyProps={{ color: '#292536', fontSize: '0.88rem' }} />
                </ListItem>
                <Divider sx={{ my: 1, borderColor: '#ECE9F1' }} />
                <ListItem button component={Link} to="/login" onClick={() => setMobileOpen(false)} sx={{ borderRadius: '8px' }}>
                  <ListItemText primary="Sign In" primaryTypographyProps={{ color: '#292536', fontWeight: 600, fontSize: '0.88rem' }} />
                </ListItem>
                <ListItem button component={Link} to="/register" onClick={() => setMobileOpen(false)} sx={{ borderRadius: '8px' }}>
                  <ListItemText primary="Create Account" primaryTypographyProps={{ color: '#77708F', fontWeight: 600, fontSize: '0.88rem' }} />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </header>
  );
}
