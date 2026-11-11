import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  IconButton,
  Switch,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  FormControlLabel,
  InputAdornment
} from '@mui/material';
import {
  ViewCarouselOutlined,
  LayersOutlined,
  StarBorder,
  LocalOfferOutlined,
  TrendingUpOutlined,
  FiberNewOutlined,
  CategoryOutlined,
  EditOutlined,
  DeleteOutline,
  Add,
  ArrowUpward,
  ArrowDownward,
  UploadFile,
  CheckCircleOutline,
  Search
} from '@mui/icons-material';
import { homePageService } from '../../services/homePageService';

export default function AdminHomePage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Home Page Data
  const [sliders, setSliders] = useState([]);
  const [sections, setSections] = useState([]);
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState({
    featuredIds: [],
    bestsellerIds: [],
    newArrivalIds: []
  });

  // Slider Modal
  const [sliderModalOpen, setSliderModalOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [sliderFormData, setSliderFormData] = useState({
    tag: '',
    offer_badge: '',
    title: '',
    subtitle: '',
    primary_btn_text: 'Explore Catalog',
    primary_btn_link: '/products',
    secondary_btn_text: 'Shop Bestsellers',
    secondary_btn_link: '/products?sort=rating',
    image_url: '',
    bg_gradient: '',
    accent_color: '#292536',
    display_order: 1,
    is_active: true
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Offer Modal / Form
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [offerFormData, setOfferFormData] = useState({
    badge: 'LIMITED TIME PRIVILEGE',
    title: '',
    description: '',
    discount_pct: '10% OFF',
    code: 'NOIR10',
    banner_image: '',
    link: '/products',
    btn_text: 'Claim Offer Now',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '2026-12-31',
    is_active: true
  });

  // Search filter for product pickers
  const [productSearch, setProductSearch] = useState('');

  // Notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showNotification = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await homePageService.getAdminHomePage();
      if (res.success && res.data) {
        setSliders(res.data.sliders || []);
        setSections(res.data.sections || []);
        setOffers(res.data.offers || []);
        setProducts(res.data.products || []);
        setCategories(res.data.categories || []);
        setCollections(res.data.collections || {
          featuredIds: [],
          bestsellerIds: [],
          newArrivalIds: []
        });
      }
    } catch (err) {
      console.error('Failed to load admin homepage data:', err);
      showNotification('Failed to load homepage settings from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- SLIDER ACTIONS ---
  const handleOpenSliderModal = (slider = null) => {
    if (slider) {
      setEditingSlider(slider);
      setSliderFormData({
        tag: slider.tag || '',
        offer_badge: slider.offer_badge || '',
        title: slider.title || '',
        subtitle: slider.subtitle || '',
        primary_btn_text: slider.primary_btn_text || 'Explore Catalog',
        primary_btn_link: slider.primary_btn_link || '/products',
        secondary_btn_text: slider.secondary_btn_text || 'Shop Bestsellers',
        secondary_btn_link: slider.secondary_btn_link || '/products?sort=rating',
        image_url: slider.image_url || '',
        bg_gradient: slider.bg_gradient || '',
        accent_color: slider.accent_color || '#292536',
        display_order: slider.display_order || sliders.length + 1,
        is_active: slider.is_active !== undefined ? slider.is_active : true
      });
    } else {
      setEditingSlider(null);
      setSliderFormData({
        tag: "HAUTE PARFUMERIE • EXCLUSIVE COLLECTION",
        offer_badge: '30% OFF',
        title: '',
        subtitle: '',
        primary_btn_text: 'Shop Now',
        primary_btn_link: '/products',
        secondary_btn_text: 'Top Rated Scents',
        secondary_btn_link: '/products?sort=rating',
        image_url: '/uploads/perfume-1793512240544-960322898.jpg',
        bg_gradient: 'linear-gradient(135deg, #F5F3F8 0%, #E9E5F2 50%, #DDD8E8 100%)',
        accent_color: '#292536',
        display_order: sliders.length + 1,
        is_active: true
      });
    }
    setSliderModalOpen(true);
  };

  const handleSaveSlider = async () => {
    if (!sliderFormData.title.trim()) {
      showNotification('Slide title is required', 'error');
      return;
    }
    if (!sliderFormData.image_url.trim()) {
      showNotification('Slide image URL is required', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingSlider) {
        const res = await homePageService.updateSlider(editingSlider.id, sliderFormData);
        if (res.success) {
          showNotification('Slide updated successfully');
          loadData();
          setSliderModalOpen(false);
        }
      } else {
        const res = await homePageService.createSlider(sliderFormData);
        if (res.success) {
          showNotification('New slide created successfully');
          loadData();
          setSliderModalOpen(false);
        }
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to save slide', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlider = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) return;
    try {
      const res = await homePageService.deleteSlider(id);
      if (res.success) {
        showNotification('Slide deleted successfully');
        loadData();
      }
    } catch (err) {
      showNotification('Failed to delete slide', 'error');
    }
  };

  const handleToggleSlider = async (id) => {
    try {
      const res = await homePageService.toggleSlider(id);
      if (res.success) {
        showNotification(res.message);
        setSliders(sliders.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s));
      }
    } catch (err) {
      showNotification('Failed to toggle slide status', 'error');
    }
  };

  const handleMoveSlider = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sliders.length) return;

    const newSliders = [...sliders];
    const temp = newSliders[index];
    newSliders[index] = newSliders[targetIndex];
    newSliders[targetIndex] = temp;

    const orderedIds = newSliders.map(s => s.id);
    setSliders(newSliders);

    try {
      await homePageService.reorderSliders(orderedIds);
      showNotification('Slide order updated');
    } catch (err) {
      showNotification('Failed to reorder slides', 'error');
      loadData();
    }
  };

  const handleSliderImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await homePageService.uploadBannerImage(file);
      const url = res.url || res.data?.url;
      if (res.success && url) {
        setSliderFormData(prev => ({ ...prev, image_url: url }));
        showNotification('Banner image uploaded successfully');
      } else {
        showNotification('Failed to retrieve image URL from upload', 'error');
      }
    } catch (err) {
      showNotification('Image upload failed: ' + (err.message || ''), 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleQuickImageReplace = async (sliderId, file) => {
    if (!file) return;
    try {
      showNotification('Uploading image...', 'info');
      const res = await homePageService.uploadBannerImage(file);
      const url = res.url || res.data?.url;
      if (res.success && url) {
        await homePageService.updateSlider(sliderId, { image_url: url });
        showNotification('Slide image updated successfully!');
        loadData();
      } else {
        showNotification('Failed to upload replacement image', 'error');
      }
    } catch (err) {
      console.error(err);
      showNotification('Error replacing image: ' + (err.message || ''), 'error');
    }
  };

  // --- SECTION ACTIONS ---
  const handleSectionFieldChange = (key, field, value) => {
    setSections(sections.map(s => {
      if (s.section_key === key) {
        return { ...s, [field]: value };
      }
      return s;
    }));
  };

  const handleSaveSections = async () => {
    setSaving(true);
    try {
      const res = await homePageService.updateSections(sections);
      if (res.success) {
        showNotification('Home Page sections updated successfully');
      }
    } catch (err) {
      showNotification('Failed to update sections', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleMoveSection = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // re-assign display_order based on new array order
    newSections.forEach((s, idx) => {
      s.display_order = idx + 1;
    });

    setSections(newSections);
  };

  // --- OFFER ACTIONS ---
  const handleOpenOfferModal = (offer = null) => {
    if (offer) {
      setEditingOffer(offer);
      setOfferFormData({
        badge: offer.badge || 'LIMITED TIME PRIVILEGE',
        title: offer.title || '',
        description: offer.description || '',
        discount_pct: offer.discount_pct || '10% OFF',
        code: offer.code || 'NOIR10',
        banner_image: offer.banner_image || '',
        link: offer.link || '/products',
        btn_text: offer.btn_text || 'Claim Offer Now',
        start_date: offer.start_date || new Date().toISOString().split('T')[0],
        end_date: offer.end_date || '2026-12-31',
        is_active: offer.is_active !== undefined ? offer.is_active : true
      });
    } else {
      setEditingOffer(null);
      setOfferFormData({
        badge: 'LIMITED TIME PRIVILEGE',
        title: '',
        description: '',
        discount_pct: '10% OFF',
        code: 'NOIR10',
        banner_image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
        link: '/products',
        btn_text: 'Claim Offer Now',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '2026-12-31',
        is_active: true
      });
    }
    setOfferModalOpen(true);
  };

  const handleSaveOffer = async () => {
    if (!offerFormData.title.trim()) {
      showNotification('Offer title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingOffer) {
        const res = await homePageService.updateOffer(editingOffer.id, offerFormData);
        if (res.success) {
          showNotification('Offer banner updated successfully');
          loadData();
          setOfferModalOpen(false);
        }
      } else {
        const res = await homePageService.createOffer(offerFormData);
        if (res.success) {
          showNotification('New offer banner created successfully');
          loadData();
          setOfferModalOpen(false);
        }
      }
    } catch (err) {
      showNotification('Failed to save offer banner', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteOffer = async (id) => {
    if (!window.confirm('Delete this promotional offer?')) return;
    try {
      const res = await homePageService.deleteOffer(id);
      if (res.success) {
        showNotification('Offer banner deleted');
        loadData();
      }
    } catch (err) {
      showNotification('Failed to delete offer', 'error');
    }
  };

  const handleToggleOffer = async (id) => {
    try {
      const res = await homePageService.toggleOffer(id);
      if (res.success) {
        showNotification(res.message);
        setOffers(offers.map(o => o.id === id ? { ...o, is_active: !o.is_active } : o));
      }
    } catch (err) {
      showNotification('Failed to toggle offer status', 'error');
    }
  };

  // --- COLLECTION TOGGLES (FEATURED, BESTSELLERS, NEW ARRIVALS) ---
  const handleToggleProductInCollection = async (collectionKey, productId) => {
    productId = Number(productId);
    let updatedList = [];
    const currentList = collections[collectionKey] || [];

    if (currentList.includes(productId)) {
      updatedList = currentList.filter(id => id !== productId);
    } else {
      updatedList = [...currentList, productId];
    }

    const newCollections = {
      ...collections,
      [collectionKey]: updatedList
    };
    setCollections(newCollections);

    try {
      await homePageService.updateCollections(newCollections);
      showNotification('Collection updated successfully');
    } catch (err) {
      showNotification('Failed to update collection', 'error');
      loadData();
    }
  };

  // Filter products by search term
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    (p.category_name && p.category_name.toLowerCase().includes(productSearch.toLowerCase()))
  );

  if (loading) {
    return (
      <Box className="d-flex justify-content-center align-items-center" sx={{ minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#77708F' }} />
      </Box>
    );
  }

  return (
    <div className="container-fluid py-4 px-3 px-md-4">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
            Home Page Management
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.88rem' }}>
            Directly control sliders, sections, categories, promotional banners, and product collections on the customer storefront.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outlined"
            onClick={loadData}
            sx={{ borderColor: '#B8AFCB', color: '#77708F', fontWeight: 600 }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            component="a"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ backgroundColor: '#77708F', color: '#fff', fontWeight: 600, '&:hover': { backgroundColor: '#645D7B' } }}
          >
            View Live Site ↗
          </Button>
        </div>
      </div>

      {/* Tabs Header */}
      <Box sx={{ borderBottom: 1, borderColor: '#ECE9F1', mb: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={(e, val) => setTabIndex(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 700,
              fontSize: '0.88rem',
              textTransform: 'none',
              minHeight: 48,
              color: '#5f5773'
            },
            '& .Mui-selected': {
              color: '#77708F !important'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#77708F',
              height: 3
            }
          }}
        >
          <Tab icon={<ViewCarouselOutlined sx={{ fontSize: 20 }} />} iconPosition="start" label={`Hero Sliders (${sliders.length})`} />
          <Tab icon={<LayersOutlined sx={{ fontSize: 20 }} />} iconPosition="start" label="Section Visibility & Order" />
          <Tab icon={<StarBorder sx={{ fontSize: 20 }} />} iconPosition="start" label={`Featured Products (${collections.featuredIds?.length || 0})`} />
          <Tab icon={<LocalOfferOutlined sx={{ fontSize: 20 }} />} iconPosition="start" label={`Special Offers (${offers.length})`} />
          <Tab icon={<TrendingUpOutlined sx={{ fontSize: 20 }} />} iconPosition="start" label={`Best Sellers (${collections.bestsellerIds?.length || 0})`} />
          <Tab icon={<FiberNewOutlined sx={{ fontSize: 20 }} />} iconPosition="start" label={`New Arrivals (${collections.newArrivalIds?.length || 0})`} />
        </Tabs>
      </Box>

      {/* TAB 0: HERO SLIDERS */}
      {tabIndex === 0 && (
        <div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h5 className="fw-bold mb-0" style={{ color: '#292536' }}>Hero Carousel Slides</h5>
                <Chip
                  label={`${sliders.length} / 4 Slides Configured`}
                  size="small"
                  sx={{
                    backgroundColor: sliders.length === 4 ? 'rgba(46, 125, 50, 0.12)' : 'rgba(119, 112, 143, 0.15)',
                    color: sliders.length === 4 ? '#2e7d32' : '#77708F',
                    fontWeight: 700,
                    fontSize: '0.75rem'
                  }}
                />
              </div>
              <p className="text-muted small mb-0">
                Hero Carousel supports exactly 4 slides. Each slide features full uncropped image display (`object-fit: contain`) with luxury text overlay on top of the image.
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  if (sliders.length >= 4) {
                    showNotification('The hero slider supports exactly 4 slides. Please edit or replace an existing slide.', 'info');
                    return;
                  }
                  handleOpenSliderModal();
                }}
                disabled={sliders.length >= 4}
                sx={{
                  backgroundColor: '#77708F',
                  color: '#fff',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#645D7B' }
                }}
              >
                {sliders.length >= 4 ? '4 Slides Configured' : 'Add New Slide'}
              </Button>
            </div>
          </div>

          <div className="row g-4">
            {sliders.map((slider, index) => (
              <div key={slider.id} className="col-12 col-md-6 col-xl-3">
                <Card
                  sx={{
                    borderRadius: 3,
                    border: '1px solid #E2DFEB',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: slider.is_active ? 1 : 0.65
                  }}
                >
                  {/* Full image display with object-fit: cover */}
                  <Box
                    sx={{
                      position: 'relative',
                      height: 180,
                      overflow: 'hidden',
                      m: 0,
                      p: 0
                    }}
                  >
                    <img
                      src={slider.image_url}
                      alt={slider.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        margin: 0,
                        padding: 0
                      }}
                    />
                    <Chip
                      label={`Slide #${index + 1} of 4`}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: 'rgba(0,0,0,0.75)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        zIndex: 2
                      }}
                    />
                    <Chip
                      label={slider.is_active ? 'Active' : 'Disabled'}
                      size="small"
                      color={slider.is_active ? 'success' : 'default'}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        zIndex: 2
                      }}
                    />
                    {slider.offer_badge && (
                      <Chip
                        label={slider.offer_badge}
                        size="small"
                        sx={{
                          position: 'absolute',
                          bottom: 10,
                          left: 10,
                          backgroundColor: slider.accent_color || '#292536',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          zIndex: 2,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                        }}
                      />
                    )}
                  </Box>

                  {/* Quick Image Replacement Strip */}
                  <Box
                    sx={{
                      p: 1.2,
                      px: 2,
                      backgroundColor: '#FAF9FC',
                      borderBottom: '1px solid #ECE9F1'
                    }}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span className="small text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>
                      Image (Cover 100%)
                    </span>
                    <Button
                      component="label"
                      size="small"
                      startIcon={<UploadFile sx={{ fontSize: 16 }} />}
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#77708F',
                        textTransform: 'none',
                        p: '2px 8px',
                        border: '1px solid #D6CFE2',
                        borderRadius: '6px',
                        '&:hover': { backgroundColor: 'rgba(119, 112, 143, 0.1)' }
                      }}
                    >
                      Replace Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleQuickImageReplace(slider.id, e.target.files[0]);
                            e.target.value = '';
                          }
                        }}
                      />
                    </Button>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Typography variant="caption" sx={{ color: '#77708F', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        {slider.tag || 'HAUTE PARFUMERIE'}
                      </Typography>
                      {slider.offer_badge && (
                        <span className="badge" style={{ backgroundColor: slider.accent_color || '#292536', color: '#fff', fontSize: '0.68rem', fontWeight: 800 }}>
                          {slider.offer_badge}
                        </span>
                      )}
                    </div>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#292536', mt: 0.5, lineHeight: 1.3 }}>
                      {slider.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {slider.subtitle}
                    </Typography>

                    <div className="mt-3 pt-2 border-top d-flex flex-wrap gap-1">
                      <span className="badge bg-light text-dark border" style={{ fontSize: '0.72rem' }}>
                        CTA: {slider.primary_btn_text} → {slider.primary_btn_link}
                      </span>
                    </div>
                  </CardContent>

                  {/* Card Actions */}
                  <Box sx={{ p: 1.5, px: 2, backgroundColor: '#FAF9FC', borderTop: '1px solid #ECE9F1' }} className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-1">
                      <IconButton
                        size="small"
                        disabled={index === 0}
                        onClick={() => handleMoveSlider(index, -1)}
                        title="Move Slide Left/Up"
                      >
                        <ArrowUpward fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        disabled={index === sliders.length - 1}
                        onClick={() => handleMoveSlider(index, 1)}
                        title="Move Slide Right/Down"
                      >
                        <ArrowDownward fontSize="small" />
                      </IconButton>
                    </div>

                    <div className="d-flex align-items-center gap-1">
                      <Switch
                        size="small"
                        checked={Boolean(slider.is_active)}
                        onChange={() => handleToggleSlider(slider.id)}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#77708F' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#77708F' }
                        }}
                      />
                      <IconButton size="small" onClick={() => handleOpenSliderModal(slider)} title="Edit Slide">
                        <EditOutlined fontSize="small" sx={{ color: '#77708F' }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteSlider(slider.id)} title="Delete Slide">
                        <DeleteOutline fontSize="small" sx={{ color: '#dc2626' }} />
                      </IconButton>
                    </div>
                  </Box>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1: SECTION VISIBILITY & DISPLAY ORDER */}
      {tabIndex === 1 && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-1" style={{ color: '#292536' }}>Home Page Section Layout & Ordering</h5>
              <p className="text-muted small mb-0">
                Enable or disable sections, modify headings/subtitles in real-time, and rearrange display order.
              </p>
            </div>
            <Button
              variant="contained"
              onClick={handleSaveSections}
              disabled={saving}
              sx={{ backgroundColor: '#77708F', color: '#fff', fontWeight: 600, '&:hover': { backgroundColor: '#645D7B' } }}
            >
              {saving ? 'Saving...' : 'Save All Section Changes'}
            </Button>
          </div>

          <div className="bg-white rounded-3 border overflow-hidden shadow-sm" style={{ borderColor: '#E2DFEB' }}>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{ backgroundColor: '#F7F5FA', borderBottom: '1px solid #E2DFEB' }}>
                  <tr style={{ fontSize: '0.8rem', color: '#77708F', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ width: 80 }} className="text-center">Order</th>
                    <th style={{ width: 180 }}>Section Key</th>
                    <th>Custom Title</th>
                    <th>Custom Subtitle</th>
                    <th style={{ width: 120 }} className="text-center">Status</th>
                    <th style={{ width: 100 }} className="text-center">Move</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section, idx) => (
                    <tr key={section.section_key} style={{ opacity: section.is_enabled ? 1 : 0.55 }}>
                      <td className="text-center fw-bold" style={{ color: '#77708F' }}>
                        #{idx + 1}
                      </td>
                      <td>
                        <strong style={{ color: '#292536', display: 'block' }}>{section.name}</strong>
                        <span className="badge bg-light text-muted border font-monospace" style={{ fontSize: '0.7rem' }}>
                          {section.section_key}
                        </span>
                      </td>
                      <td>
                        <TextField
                          size="small"
                          fullWidth
                          value={section.title || ''}
                          onChange={(e) => handleSectionFieldChange(section.section_key, 'title', e.target.value)}
                          placeholder="Section Title"
                          sx={{ '& .MuiInputBase-input': { fontSize: '0.86rem', fontWeight: 600 } }}
                        />
                      </td>
                      <td>
                        <TextField
                          size="small"
                          fullWidth
                          value={section.subtitle || ''}
                          onChange={(e) => handleSectionFieldChange(section.section_key, 'subtitle', e.target.value)}
                          placeholder="Section Subtitle / Tagline"
                          sx={{ '& .MuiInputBase-input': { fontSize: '0.82rem' } }}
                        />
                      </td>
                      <td className="text-center">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={Boolean(section.is_enabled)}
                              onChange={(e) => handleSectionFieldChange(section.section_key, 'is_enabled', e.target.checked)}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#77708F' },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#77708F' }
                              }}
                            />
                          }
                          label={<span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{section.is_enabled ? 'Visible' : 'Hidden'}</span>}
                          sx={{ m: 0 }}
                        />
                      </td>
                      <td className="text-center">
                        <IconButton
                          size="small"
                          disabled={idx === 0}
                          onClick={() => handleMoveSection(idx, -1)}
                          title="Move Up"
                        >
                          <ArrowUpward fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          disabled={idx === sections.length - 1}
                          onClick={() => handleMoveSection(idx, 1)}
                          title="Move Down"
                        >
                          <ArrowDownward fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FEATURED PRODUCTS MANAGEMENT */}
      {tabIndex === 2 && (
        <div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
            <div>
              <h5 className="fw-bold mb-1" style={{ color: '#292536' }}>Featured Products Section</h5>
              <p className="text-muted small mb-0">
                Select which perfumes appear in the "Trending Artisanal Blends / Featured Perfumes" section. Currently selected: <strong>{collections.featuredIds?.length || 0}</strong> products.
              </p>
            </div>
            <TextField
              size="small"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>
              }}
              sx={{ minWidth: 260 }}
            />
          </div>

          <div className="bg-white rounded-3 border overflow-hidden shadow-sm" style={{ borderColor: '#E2DFEB' }}>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{ backgroundColor: '#F7F5FA', borderBottom: '1px solid #E2DFEB' }}>
                  <tr style={{ fontSize: '0.8rem', color: '#77708F', textTransform: 'uppercase' }}>
                    <th style={{ width: 80 }}>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Gender</th>
                    <th>Price</th>
                    <th style={{ width: 140 }} className="text-center">Featured Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((prod) => {
                    const isFeatured = collections.featuredIds?.includes(prod.id);
                    return (
                      <tr key={prod.id} style={{ backgroundColor: isFeatured ? 'rgba(119, 112, 143, 0.05)' : 'inherit' }}>
                        <td>
                          <img
                            src={prod.image_url}
                            alt={prod.name}
                            style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8, border: '1px solid #E2DFEB' }}
                          />
                        </td>
                        <td>
                          <strong style={{ color: '#292536' }}>{prod.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#77708F' }}>ID #{prod.id}</div>
                        </td>
                        <td><span className="badge bg-light text-dark border">{prod.category_name}</span></td>
                        <td><span className="badge bg-light text-muted border">{prod.gender}</span></td>
                        <td className="fw-bold" style={{ color: '#292536' }}>
                          ₹{prod.discount_price || prod.price}
                        </td>
                        <td className="text-center">
                          <Button
                            variant={isFeatured ? 'contained' : 'outlined'}
                            size="small"
                            onClick={() => handleToggleProductInCollection('featuredIds', prod.id)}
                            startIcon={isFeatured ? <CheckCircleOutline /> : <Add />}
                            sx={{
                              backgroundColor: isFeatured ? '#77708F' : 'transparent',
                              borderColor: '#77708F',
                              color: isFeatured ? '#fff' : '#77708F',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              '&:hover': {
                                backgroundColor: isFeatured ? '#645D7B' : 'rgba(119, 112, 143, 0.1)',
                                borderColor: '#77708F'
                              }
                            }}
                          >
                            {isFeatured ? 'Featured' : 'Select'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPECIAL OFFERS MANAGEMENT */}
      {tabIndex === 3 && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-1" style={{ color: '#292536' }}>Special Promotional Banners</h5>
              <p className="text-muted small mb-0">
                Create promotional discount banners, set promo codes, validity dates, and promotional imagery.
              </p>
            </div>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenOfferModal()}
              sx={{ backgroundColor: '#77708F', color: '#fff', fontWeight: 600, '&:hover': { backgroundColor: '#645D7B' } }}
            >
              Create New Offer
            </Button>
          </div>

          <div className="row g-4">
            {offers.map((offer) => (
              <div key={offer.id} className="col-12 col-lg-6">
                <Card
                  sx={{
                    borderRadius: 3,
                    border: '1px solid #E2DFEB',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    opacity: offer.is_active ? 1 : 0.65
                  }}
                >
                  <CardMedia
                    component="img"
                    image={offer.banner_image || 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80'}
                    alt={offer.title}
                    sx={{ width: { xs: '100%', sm: 200 }, minHeight: 180, objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Chip
                        label={offer.badge || 'PROMOTIONAL OFFER'}
                        size="small"
                        sx={{ backgroundColor: '#ECE9F2', color: '#77708F', fontWeight: 700, fontSize: '0.7rem' }}
                      />
                      <Chip
                        label={offer.is_active ? 'Active' : 'Disabled'}
                        size="small"
                        color={offer.is_active ? 'success' : 'default'}
                        sx={{ fontWeight: 700 }}
                      />
                    </div>

                    <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#292536' }}>
                      {offer.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.82rem', lineHeight: 1.5 }}>
                      {offer.description}
                    </Typography>

                    <div className="d-flex align-items-center gap-2 mt-3 pt-2 border-top">
                      <span className="badge bg-dark text-warning font-monospace" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                        CODE: {offer.code}
                      </span>
                      <span className="badge bg-danger" style={{ fontSize: '0.78rem' }}>
                        {offer.discount_pct}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2">
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                        Valid: {offer.start_date || 'Anytime'} to {offer.end_date || 'Ongoing'}
                      </span>
                      <div className="d-flex align-items-center gap-1">
                        <Switch
                          size="small"
                          checked={Boolean(offer.is_active)}
                          onChange={() => handleToggleOffer(offer.id)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': { color: '#77708F' },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#77708F' }
                          }}
                        />
                        <IconButton size="small" onClick={() => handleOpenOfferModal(offer)}>
                          <EditOutlined fontSize="small" sx={{ color: '#77708F' }} />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteOffer(offer.id)}>
                          <DeleteOutline fontSize="small" sx={{ color: '#dc2626' }} />
                        </IconButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BEST SELLERS MANAGEMENT */}
      {tabIndex === 4 && (
        <div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
            <div>
              <h5 className="fw-bold mb-1" style={{ color: '#292536' }}>Best Sellers Product Selection</h5>
              <p className="text-muted small mb-0">
                Choose which perfumes are featured in the "Top Rated Bestsellers" section. Currently selected: <strong>{collections.bestsellerIds?.length || 0}</strong> products.
              </p>
            </div>
            <TextField
              size="small"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>
              }}
              sx={{ minWidth: 260 }}
            />
          </div>

          <div className="bg-white rounded-3 border overflow-hidden shadow-sm" style={{ borderColor: '#E2DFEB' }}>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{ backgroundColor: '#F7F5FA', borderBottom: '1px solid #E2DFEB' }}>
                  <tr style={{ fontSize: '0.8rem', color: '#77708F', textTransform: 'uppercase' }}>
                    <th style={{ width: 80 }}>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Rating</th>
                    <th>Price</th>
                    <th style={{ width: 140 }} className="text-center">Bestseller Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((prod) => {
                    const isBestseller = collections.bestsellerIds?.includes(prod.id);
                    return (
                      <tr key={prod.id} style={{ backgroundColor: isBestseller ? 'rgba(119, 112, 143, 0.05)' : 'inherit' }}>
                        <td>
                          <img
                            src={prod.image_url}
                            alt={prod.name}
                            style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8, border: '1px solid #E2DFEB' }}
                          />
                        </td>
                        <td>
                          <strong style={{ color: '#292536' }}>{prod.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#77708F' }}>ID #{prod.id}</div>
                        </td>
                        <td><span className="badge bg-light text-dark border">{prod.category_name}</span></td>
                        <td><span className="badge bg-warning text-dark">★ {prod.rating || '4.8'}</span></td>
                        <td className="fw-bold" style={{ color: '#292536' }}>
                          ₹{prod.discount_price || prod.price}
                        </td>
                        <td className="text-center">
                          <Button
                            variant={isBestseller ? 'contained' : 'outlined'}
                            size="small"
                            onClick={() => handleToggleProductInCollection('bestsellerIds', prod.id)}
                            startIcon={isBestseller ? <CheckCircleOutline /> : <Add />}
                            sx={{
                              backgroundColor: isBestseller ? '#77708F' : 'transparent',
                              borderColor: '#77708F',
                              color: isBestseller ? '#fff' : '#77708F',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              '&:hover': {
                                backgroundColor: isBestseller ? '#645D7B' : 'rgba(119, 112, 143, 0.1)',
                                borderColor: '#77708F'
                              }
                            }}
                          >
                            {isBestseller ? 'Bestseller' : 'Select'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: NEW ARRIVALS MANAGEMENT */}
      {tabIndex === 5 && (
        <div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
            <div>
              <h5 className="fw-bold mb-1" style={{ color: '#292536' }}>New Arrivals Product Selection</h5>
              <p className="text-muted small mb-0">
                Choose which perfumes appear in the "New In The House" section. Currently selected: <strong>{collections.newArrivalIds?.length || 0}</strong> products.
              </p>
            </div>
            <TextField
              size="small"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>
              }}
              sx={{ minWidth: 260 }}
            />
          </div>

          <div className="bg-white rounded-3 border overflow-hidden shadow-sm" style={{ borderColor: '#E2DFEB' }}>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{ backgroundColor: '#F7F5FA', borderBottom: '1px solid #E2DFEB' }}>
                  <tr style={{ fontSize: '0.8rem', color: '#77708F', textTransform: 'uppercase' }}>
                    <th style={{ width: 80 }}>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th style={{ width: 140 }} className="text-center">New Arrival Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((prod) => {
                    const isNewArrival = collections.newArrivalIds?.includes(prod.id);
                    return (
                      <tr key={prod.id} style={{ backgroundColor: isNewArrival ? 'rgba(119, 112, 143, 0.05)' : 'inherit' }}>
                        <td>
                          <img
                            src={prod.image_url}
                            alt={prod.name}
                            style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8, border: '1px solid #E2DFEB' }}
                          />
                        </td>
                        <td>
                          <strong style={{ color: '#292536' }}>{prod.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#77708F' }}>ID #{prod.id}</div>
                        </td>
                        <td><span className="badge bg-light text-dark border">{prod.category_name}</span></td>
                        <td><span className="badge bg-light text-muted border">{prod.stock} in stock</span></td>
                        <td className="fw-bold" style={{ color: '#292536' }}>
                          ₹{prod.discount_price || prod.price}
                        </td>
                        <td className="text-center">
                          <Button
                            variant={isNewArrival ? 'contained' : 'outlined'}
                            size="small"
                            onClick={() => handleToggleProductInCollection('newArrivalIds', prod.id)}
                            startIcon={isNewArrival ? <CheckCircleOutline /> : <Add />}
                            sx={{
                              backgroundColor: isNewArrival ? '#77708F' : 'transparent',
                              borderColor: '#77708F',
                              color: isNewArrival ? '#fff' : '#77708F',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              '&:hover': {
                                backgroundColor: isNewArrival ? '#645D7B' : 'rgba(119, 112, 143, 0.1)',
                                borderColor: '#77708F'
                              }
                            }}
                          >
                            {isNewArrival ? 'New Arrival' : 'Select'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SLIDER MODAL */}
      <Dialog
        open={sliderModalOpen}
        onClose={() => setSliderModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontFamily: 'Inter, sans-serif', color: '#292536' }}>
          {editingSlider ? 'Edit Carousel Slide' : 'Add New Carousel Slide'}
        </DialogTitle>
        <DialogContent dividers>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <TextField
                label="Promotional Offer Badge"
                fullWidth
                size="small"
                value={sliderFormData.offer_badge}
                onChange={(e) => setSliderFormData({ ...sliderFormData, offer_badge: e.target.value })}
                placeholder="e.g. 30% OFF, BUY 1 GET 1 OFFER"
                helperText="Prominently displayed badge"
              />
            </div>
            <div className="col-12 col-md-4">
              <TextField
                label="Slide Tag / Category"
                fullWidth
                size="small"
                value={sliderFormData.tag}
                onChange={(e) => setSliderFormData({ ...sliderFormData, tag: e.target.value })}
                placeholder="e.g. MEN'S PRIVATE RESERVE"
              />
            </div>
            <div className="col-12 col-md-4">
              <TextField
                label="Display Order"
                type="number"
                fullWidth
                size="small"
                value={sliderFormData.display_order}
                onChange={(e) => setSliderFormData({ ...sliderFormData, display_order: Number(e.target.value) })}
              />
            </div>

            {/* Background Theme Presets */}
            <div className="col-12">
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#554F67', display: 'block', mb: 1 }}>
                Slide Background & Accent Presets:
              </Typography>
              <div className="d-flex flex-wrap gap-2">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSliderFormData({
                    ...sliderFormData,
                    bg_gradient: 'linear-gradient(135deg, #F3F1F7 0%, #E7E3ED 50%, #DBD5E6 100%)',
                    accent_color: '#292536'
                  })}
                  sx={{ textTransform: 'none', fontSize: '0.78rem', borderColor: '#292536', color: '#292536' }}
                >
                  Men's Twilight Slate
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSliderFormData({
                    ...sliderFormData,
                    bg_gradient: 'linear-gradient(135deg, #FAF3F6 0%, #F6E6ED 50%, #EED5E0 100%)',
                    accent_color: '#9C3A63'
                  })}
                  sx={{ textTransform: 'none', fontSize: '0.78rem', borderColor: '#9C3A63', color: '#9C3A63' }}
                >
                  Women's Blush Rose
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSliderFormData({
                    ...sliderFormData,
                    bg_gradient: 'linear-gradient(135deg, #F1F6F4 0%, #E2ECE8 50%, #D1DFDB 100%)',
                    accent_color: '#2E6656'
                  })}
                  sx={{ textTransform: 'none', fontSize: '0.78rem', borderColor: '#2E6656', color: '#2E6656' }}
                >
                  Unisex Sage Oasis
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setSliderFormData({
                    ...sliderFormData,
                    bg_gradient: 'linear-gradient(135deg, #F9F5EC 0%, #F2E9D4 50%, #E7D8B6 100%)',
                    accent_color: '#9A7322'
                  })}
                  sx={{ textTransform: 'none', fontSize: '0.78rem', borderColor: '#9A7322', color: '#9A7322' }}
                >
                  Haute Royal Gold
                </Button>
              </div>
            </div>

            <div className="col-12">
              <TextField
                label="Main Headline (Title)"
                fullWidth
                required
                size="small"
                value={sliderFormData.title}
                onChange={(e) => setSliderFormData({ ...sliderFormData, title: e.target.value })}
                placeholder="e.g. Discover Your Signature Fragrance."
              />
            </div>
            <div className="col-12">
              <TextField
                label="Subtitle / Lead Description"
                fullWidth
                multiline
                rows={2}
                size="small"
                value={sliderFormData.subtitle}
                onChange={(e) => setSliderFormData({ ...sliderFormData, subtitle: e.target.value })}
                placeholder="Brief description highlighting fragrance notes or longevity..."
              />
            </div>

            {/* Buttons */}
            <div className="col-12 col-md-6">
              <TextField
                label="Primary Button Text"
                fullWidth
                size="small"
                value={sliderFormData.primary_btn_text}
                onChange={(e) => setSliderFormData({ ...sliderFormData, primary_btn_text: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                label="Primary Button Link"
                fullWidth
                size="small"
                value={sliderFormData.primary_btn_link}
                onChange={(e) => setSliderFormData({ ...sliderFormData, primary_btn_link: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                label="Secondary Button Text"
                fullWidth
                size="small"
                value={sliderFormData.secondary_btn_text}
                onChange={(e) => setSliderFormData({ ...sliderFormData, secondary_btn_text: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                label="Secondary Button Link"
                fullWidth
                size="small"
                value={sliderFormData.secondary_btn_link}
                onChange={(e) => setSliderFormData({ ...sliderFormData, secondary_btn_link: e.target.value })}
              />
            </div>

            {/* Image URL & Upload */}
            <div className="col-12">
              <TextField
                label="Banner Image URL"
                fullWidth
                required
                size="small"
                value={sliderFormData.image_url}
                onChange={(e) => setSliderFormData({ ...sliderFormData, image_url: e.target.value })}
                helperText="Enter high-res image URL or upload image below"
              />
              <div className="d-flex align-items-center gap-3 mt-2">
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                  startIcon={<UploadFile />}
                  disabled={uploadingImage}
                  sx={{ borderColor: '#77708F', color: '#77708F' }}
                >
                  {uploadingImage ? 'Uploading...' : 'Upload Image File'}
                  <input type="file" hidden accept="image/*" onChange={handleSliderImageUpload} />
                </Button>
                {sliderFormData.image_url && (
                  <span className="text-success small fw-bold">✓ Image attached</span>
                )}
              </div>
            </div>

            {/* Live Storefront Preview (2-Column Reversed: Left 45% Content | Right 55% Full Image) */}
            {sliderFormData.image_url && (
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#77708F', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    Live Storefront Preview (Reversed: Left 45% Content | Right 55% Image):
                  </Typography>
                  <span className="badge bg-light text-secondary border" style={{ fontSize: '0.7rem' }}>
                    object-fit: cover • Full Visibility
                  </span>
                </div>

                <div
                  style={{
                    background: sliderFormData.bg_gradient || 'linear-gradient(135deg, #F7F5FA 0%, #ECE7F3 100%)',
                    border: '1px solid #E2DFEB',
                    borderRadius: 14,
                    padding: '20px',
                    overflow: 'hidden'
                  }}
                >
                  <div className="row align-items-center g-3">
                    {/* Left: 45% Content */}
                    <div className="col-12 col-md-5" style={{ flex: '0 0 45%', maxWidth: '45%' }}>
                      <div className="d-flex flex-wrap align-items-center gap-1.5 mb-2">
                        {sliderFormData.offer_badge && (
                          <div
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              color: '#fff',
                              textTransform: 'uppercase',
                              backgroundColor: sliderFormData.accent_color || '#292536',
                              padding: '2px 10px',
                              borderRadius: '20px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                            }}
                          >
                            {sliderFormData.offer_badge}
                          </div>
                        )}
                        {sliderFormData.tag && (
                          <div
                            style={{
                              fontSize: '0.62rem',
                              fontWeight: 700,
                              letterSpacing: '1px',
                              color: '#292536',
                              textTransform: 'uppercase',
                              backgroundColor: 'rgba(41, 37, 54, 0.08)',
                              padding: '2px 8px',
                              borderRadius: '10px'
                            }}
                          >
                            {sliderFormData.tag}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          lineHeight: 1.25,
                          color: '#292536',
                          marginBottom: 4
                        }}
                      >
                        {sliderFormData.title || 'Slide Headline'}
                      </div>
                      {sliderFormData.subtitle && (
                        <div
                          style={{
                            fontSize: '0.75rem',
                            color: '#494459',
                            lineHeight: 1.4,
                            marginBottom: 8,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {sliderFormData.subtitle}
                        </div>
                      )}
                      <div className="d-flex align-items-center gap-2">
                        <span
                          style={{
                            backgroundColor: sliderFormData.accent_color || '#292536',
                            color: '#fff',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '6px 16px',
                            borderRadius: '20px'
                          }}
                        >
                          {sliderFormData.primary_btn_text || 'Shop Now'} →
                        </span>
                        {sliderFormData.secondary_btn_text && (
                          <span
                            style={{
                              border: '1px solid rgba(41, 37, 54, 0.25)',
                              color: '#292536',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              padding: '6px 12px',
                              borderRadius: '20px',
                              backgroundColor: 'rgba(255,255,255,0.8)'
                            }}
                          >
                            {sliderFormData.secondary_btn_text}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: 55% Full Cover Image */}
                    <div className="col-12 col-md-7" style={{ flex: '0 0 55%', maxWidth: '55%' }}>
                      <div
                        style={{
                          height: '180px',
                          borderRadius: '12px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                          overflow: 'hidden',
                          margin: 0,
                          padding: 0
                        }}
                      >
                        <img
                          src={sliderFormData.image_url}
                          alt="Preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            margin: 0,
                            padding: 0
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="col-12">
              <FormControlLabel
                control={
                  <Switch
                    checked={sliderFormData.is_active}
                    onChange={(e) => setSliderFormData({ ...sliderFormData, is_active: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#77708F' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#77708F' }
                    }}
                  />
                }
                label={<strong style={{ fontSize: '0.88rem' }}>Enable this slide on live storefront</strong>}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setSliderModalOpen(false)} sx={{ color: '#5f5773' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveSlider}
            disabled={saving}
            sx={{ backgroundColor: '#77708F', color: '#fff', fontWeight: 600, '&:hover': { backgroundColor: '#645D7B' } }}
          >
            {saving ? 'Saving...' : 'Save Slide'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* OFFER MODAL */}
      <Dialog
        open={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontFamily: 'Inter, sans-serif', color: '#292536' }}>
          {editingOffer ? 'Edit Promotional Offer Banner' : 'Create New Promotional Offer'}
        </DialogTitle>
        <DialogContent dividers>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <TextField
                label="Offer Badge"
                fullWidth
                size="small"
                value={offerFormData.badge}
                onChange={(e) => setOfferFormData({ ...offerFormData, badge: e.target.value })}
                placeholder="e.g. EXCLUSIVE PRIVILEGE"
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                label="Discount Tag"
                fullWidth
                size="small"
                value={offerFormData.discount_pct}
                onChange={(e) => setOfferFormData({ ...offerFormData, discount_pct: e.target.value })}
                placeholder="e.g. 10% OFF + GIFT"
              />
            </div>
            <div className="col-12">
              <TextField
                label="Offer Headline"
                fullWidth
                required
                size="small"
                value={offerFormData.title}
                onChange={(e) => setOfferFormData({ ...offerFormData, title: e.target.value })}
                placeholder="e.g. Complimentary Discovery Atomizer Set"
              />
            </div>
            <div className="col-12">
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={2}
                size="small"
                value={offerFormData.description}
                onChange={(e) => setOfferFormData({ ...offerFormData, description: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                label="Coupon Code"
                fullWidth
                size="small"
                value={offerFormData.code}
                onChange={(e) => setOfferFormData({ ...offerFormData, code: e.target.value })}
                placeholder="e.g. NOIR10"
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                label="Button Text"
                fullWidth
                size="small"
                value={offerFormData.btn_text}
                onChange={(e) => setOfferFormData({ ...offerFormData, btn_text: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={offerFormData.start_date}
                onChange={(e) => setOfferFormData({ ...offerFormData, start_date: e.target.value })}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                label="End Date"
                type="date"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={offerFormData.end_date}
                onChange={(e) => setOfferFormData({ ...offerFormData, end_date: e.target.value })}
              />
            </div>
            <div className="col-12">
              <TextField
                label="Banner Image URL"
                fullWidth
                size="small"
                value={offerFormData.banner_image}
                onChange={(e) => setOfferFormData({ ...offerFormData, banner_image: e.target.value })}
              />
            </div>
            <div className="col-12">
              <FormControlLabel
                control={
                  <Switch
                    checked={offerFormData.is_active}
                    onChange={(e) => setOfferFormData({ ...offerFormData, is_active: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#77708F' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#77708F' }
                    }}
                  />
                }
                label={<strong style={{ fontSize: '0.88rem' }}>Activate this promotional offer on live site</strong>}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOfferModalOpen(false)} sx={{ color: '#5f5773' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveOffer}
            disabled={saving}
            sx={{ backgroundColor: '#77708F', color: '#fff', fontWeight: 600, '&:hover': { backgroundColor: '#645D7B' } }}
          >
            {saving ? 'Saving...' : 'Save Offer Banner'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR NOTIFICATION */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%', fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

