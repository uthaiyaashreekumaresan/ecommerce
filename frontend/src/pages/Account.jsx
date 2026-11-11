import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addressService } from '../services/addressService';
import {
  Typography,
  CircularProgress,
  Chip,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Snackbar,
  Alert
} from '@mui/material';
import {
  PersonOutline,
  MailOutline,
  PhoneOutlined,
  HomeOutlined,
  BusinessOutlined,
  LocationOnOutlined,
  EditOutlined,
  DeleteOutline,
  CheckCircle,
  AddCircleOutline,
  LocalShippingOutlined,
  FavoriteBorder,
  Close,
  StarOutlined,
  ShieldOutlined,
  BadgeOutlined
} from '@mui/icons-material';

export default function Account() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // Edit Profile State
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [profileSaving, setProfileSaving] = useState(false);

  // Address Modal State (Add or Edit)
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'Home',
    isDefault: false
  });
  const [addressSaving, setAddressSaving] = useState(false);

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Notification Toast
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Initialize profile form
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || ''
      });
    }
  }, [user]);

  // Load customer addresses
  const loadAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await addressService.getMyAddresses();
      if (res.success && Array.isArray(res.data)) {
        setAddresses(res.data);
      }
    } catch (err) {
      console.error('Failed to load user addresses:', err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // Handle Edit Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      setToast({ open: true, message: 'Name cannot be empty', severity: 'error' });
      return;
    }
    try {
      setProfileSaving(true);
      await updateProfile(profileForm);
      setToast({ open: true, message: 'Profile details updated successfully!', severity: 'success' });
      setProfileModalOpen(false);
    } catch (err) {
      setToast({ open: true, message: err.message || 'Failed to update profile', severity: 'error' });
    } finally {
      setProfileSaving(false);
    }
  };

  // Open Add Address Dialog
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      fullName: user?.name || '',
      phone: user?.phone || '',
      addressLine1: '',
      addressLine2: '',
      city: user?.city || '',
      state: user?.state || '',
      pincode: user?.pincode || '',
      addressType: 'Home',
      isDefault: addresses.length === 0
    });
    setAddressModalOpen(true);
  };

  // Open Edit Address Dialog
  const handleOpenEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddressForm({
      fullName: addr.full_name || '',
      phone: addr.phone || '',
      addressLine1: addr.address_line1 || '',
      addressLine2: addr.address_line2 || '',
      city: addr.city || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
      addressType: addr.address_type || 'Home',
      isDefault: Boolean(addr.is_default)
    });
    setAddressModalOpen(true);
  };

  // Handle Add/Edit Address Submission
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    const { fullName, phone, addressLine1, city, state, pincode } = addressForm;
    if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
      setToast({ open: true, message: 'Please fill in all required address fields', severity: 'error' });
      return;
    }

    try {
      setAddressSaving(true);
      if (editingAddressId) {
        await addressService.updateAddress(editingAddressId, addressForm);
        setToast({ open: true, message: 'Address updated successfully.', severity: 'success' });
      } else {
        await addressService.addAddress(addressForm);
        setToast({ open: true, message: 'New delivery address added.', severity: 'success' });
      }
      setAddressModalOpen(false);
      await loadAddresses();
    } catch (err) {
      setToast({ open: true, message: err.message || 'Failed to save address', severity: 'error' });
    } finally {
      setAddressSaving(false);
    }
  };

  // Handle Set Default Address
  const handleSetDefault = async (addrId) => {
    try {
      await addressService.setDefaultAddress(addrId);
      setToast({ open: true, message: 'Default delivery address updated.', severity: 'success' });
      await loadAddresses();
    } catch (err) {
      setToast({ open: true, message: 'Failed to set default address.', severity: 'error' });
    }
  };

  // Handle Delete Address
  const handleDeleteAddress = async () => {
    if (!deleteConfirmId) return;
    try {
      await addressService.deleteAddress(deleteConfirmId);
      setToast({ open: true, message: 'Address removed successfully.', severity: 'info' });
      setDeleteConfirmId(null);
      await loadAddresses();
    } catch (err) {
      setToast({ open: true, message: 'Failed to delete address.', severity: 'error' });
    }
  };

  return (
    <div className="py-4 py-md-5" style={{ backgroundColor: '#F7F5FA', minHeight: '82vh' }}>
      <div className="container-fluid px-3 px-md-4 px-xl-5" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: '#77708F', fontWeight: 600 }}>
              Account & Address
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4 pb-3 border-bottom" style={{ borderColor: '#ECE9F1' }}>
          <div>
            <h2 className="fw-bold mb-0" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
              Account & Address
            </h2>
            <p className="text-muted small mb-0 mt-1">
              Manage your personal information, delivery addresses, and fragrance preferences.
            </p>
          </div>

          <div className="d-flex gap-2">
            <Button
              component={Link}
              to="/orders"
              variant="outlined"
              size="small"
              startIcon={<LocalShippingOutlined />}
              sx={{
                borderColor: '#77708F',
                color: '#292536',
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                '&:hover': { borderColor: '#292536', backgroundColor: '#EDE8F5' }
              }}
            >
              Orders & Tracking
            </Button>
          </div>
        </div>

        <div className="row g-4">
          {/* LEFT COLUMN: Customer Account Profile Card & Quick Navigation */}
          <div className="col-12 col-lg-4">
            {/* Customer Profile Box */}
            <div className="bg-white rounded-3 border p-4 shadow-sm mb-4" style={{ borderColor: '#E2DFEB' }}>
              <div className="text-center mb-3">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.name || 'Customer'}
                    referrerPolicy="no-referrer"
                    className="mb-2"
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #C5A059',
                      boxShadow: '0 4px 14px rgba(41, 37, 54, 0.15)',
                      display: 'inline-block'
                    }}
                  />
                ) : (
                  <div
                    className="d-inline-flex align-items-center justify-content-center fw-bold text-white mb-2"
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      backgroundColor: '#292536',
                      fontSize: '1.6rem',
                      border: '3px solid #ECE9F1',
                      boxShadow: '0 4px 14px rgba(41, 37, 54, 0.15)'
                    }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
                  </div>
                )}
                <h5 className="fw-bold mb-1" style={{ color: '#292536', fontFamily: 'Inter, sans-serif' }}>
                  {user?.name || 'Valued Customer'}
                </h5>
                <span
                  className="badge px-3 py-1 rounded-pill"
                  style={{
                    backgroundColor: '#F3F0F9',
                    color: '#77708F',
                    border: '1px solid #E2DFEB',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.5px'
                  }}
                >
                  ÉLIXIR CONNOISSEUR
                </span>
              </div>

              <Divider sx={{ my: 2.5, borderColor: '#ECE9F1' }} />

              {/* Profile Details List */}
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '36px', height: '36px', backgroundColor: '#FAF9FC', color: '#77708F' }}>
                    <MailOutline fontSize="small" />
                  </div>
                  <div className="overflow-hidden">
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#77708F' }} className="d-block">
                      Email Address
                    </span>
                    <span className="fw-semibold text-truncate d-block" style={{ fontSize: '0.88rem', color: '#292536' }}>
                      {user?.email}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '36px', height: '36px', backgroundColor: '#FAF9FC', color: '#77708F' }}>
                    <PhoneOutlined fontSize="small" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#77708F' }} className="d-block">
                      Phone Number
                    </span>
                    <span className="fw-semibold" style={{ fontSize: '0.88rem', color: '#292536' }}>
                      {user?.phone || 'Not provided'}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '36px', height: '36px', backgroundColor: '#FAF9FC', color: '#77708F' }}>
                    <ShieldOutlined fontSize="small" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#77708F' }} className="d-block">
                      Account Status
                    </span>
                    <span className="fw-semibold text-success d-flex align-items-center gap-1" style={{ fontSize: '0.86rem' }}>
                      <CheckCircle sx={{ fontSize: 14 }} /> Active & Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <Button
                variant="outlined"
                fullWidth
                startIcon={<EditOutlined />}
                onClick={() => setProfileModalOpen(true)}
                sx={{
                  borderColor: '#77708F',
                  color: '#292536',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  py: 0.9,
                  textTransform: 'none',
                  '&:hover': { borderColor: '#292536', backgroundColor: '#EDE8F5' }
                }}
              >
                Edit Profile
              </Button>
            </div>

            {/* Quick Links Menu */}
            <div className="bg-white rounded-3 border p-3 shadow-sm" style={{ borderColor: '#E2DFEB' }}>
              <div style={{ fontSize: '0.74rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#77708F', fontWeight: 700, marginBottom: '10px' }}>
                QUICK ACCESS
              </div>
              <div className="d-flex flex-column gap-1">
                <Link
                  to="/orders"
                  className="d-flex align-items-center justify-content-between p-2.5 rounded text-decoration-none"
                  style={{ color: '#292536', backgroundColor: '#FAF9FD' }}
                >
                  <div className="d-flex align-items-center gap-2.5">
                    <LocalShippingOutlined sx={{ color: '#77708F', fontSize: 20 }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Orders & Tracking</span>
                  </div>
                  <span className="badge bg-light text-dark border">View</span>
                </Link>

                <Link
                  to="/wishlist"
                  className="d-flex align-items-center justify-content-between p-2.5 rounded text-decoration-none mt-1"
                  style={{ color: '#292536', backgroundColor: '#FAF9FD' }}
                >
                  <div className="d-flex align-items-center gap-2.5">
                    <FavoriteBorder sx={{ color: '#ef4444', fontSize: 20 }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>My Wishlist</span>
                  </div>
                  <span className="badge bg-light text-dark border">View</span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Delivery Addresses Management */}
          <div className="col-12 col-lg-8">
            <div className="bg-white rounded-3 border p-4 shadow-sm" style={{ borderColor: '#E2DFEB' }}>
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3 pb-3 border-bottom" style={{ borderColor: '#ECE9F1' }}>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: '#292536', fontFamily: 'Inter, sans-serif' }}>
                    Delivery Addresses
                  </h5>
                  <p className="text-muted small mb-0">
                    Add, edit or set your default shipping destination for seamless checkout.
                  </p>
                </div>

                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddCircleOutline />}
                  onClick={handleOpenAddAddress}
                  sx={{
                    backgroundColor: '#77708F',
                    color: '#ffffff',
                    borderRadius: '20px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.82rem',
                    px: 2.5,
                    py: 0.8,
                    '&:hover': { backgroundColor: '#5f5773' }
                  }}
                >
                  Add New Address
                </Button>
              </div>

              {/* Address List */}
              {loadingAddresses ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress sx={{ color: '#77708F' }} />
                </Box>
              ) : addresses.length === 0 ? (
                <div className="text-center py-5 border rounded-3" style={{ borderColor: '#E8E5EE', backgroundColor: '#FAF9FC' }}>
                  <LocationOnOutlined sx={{ fontSize: 48, color: '#B8AFCB', mb: 1 }} />
                  <h6 className="fw-bold mb-1" style={{ color: '#292536' }}>No Addresses Saved</h6>
                  <p className="text-muted small mb-3">
                    You have not added any delivery addresses yet. Add one for expedited fragrance delivery.
                  </p>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleOpenAddAddress}
                    sx={{ borderColor: '#77708F', color: '#292536', borderRadius: '20px', textTransform: 'none', fontWeight: 600 }}
                  >
                    + Add Delivery Address
                  </Button>
                </div>
              ) : (
                <div className="row g-3">
                  {addresses.map((addr) => {
                    const isDefault = Boolean(addr.is_default);

                    return (
                      <div key={addr.id} className="col-12 col-md-6">
                        <div
                          className="h-100 p-3.5 rounded-3 d-flex flex-column justify-content-between"
                          style={{
                            border: isDefault ? '2px solid #77708F' : '1px solid #E2DFEB',
                            backgroundColor: isDefault ? '#FAF9FD' : '#FFFFFF',
                            boxShadow: isDefault ? '0 4px 16px rgba(119, 112, 143, 0.12)' : 'none',
                            position: 'relative'
                          }}
                        >
                          <div>
                            {/* Header badges */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: addr.address_type === 'Work' ? '#E0F2FE' : '#F3F0F9',
                                  color: addr.address_type === 'Work' ? '#0369A1' : '#292536',
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  border: '1px solid #E2DFEB'
                                }}
                              >
                                {addr.address_type === 'Work' ? (
                                  <><BusinessOutlined sx={{ fontSize: 13, mr: 0.5, verticalAlign: 'text-bottom' }} />Work</>
                                ) : (
                                  <><HomeOutlined sx={{ fontSize: 13, mr: 0.5, verticalAlign: 'text-bottom' }} />Home</>
                                )}
                              </span>

                              {isDefault && (
                                <span
                                  className="badge bg-success bg-opacity-10 text-success border border-success"
                                  style={{ fontSize: '0.68rem', fontWeight: 700 }}
                                >
                                  <StarOutlined sx={{ fontSize: 12, mr: 0.3, verticalAlign: 'text-top' }} /> Default Address
                                </span>
                              )}
                            </div>

                            {/* Recipient info */}
                            <div className="fw-bold mb-1" style={{ fontSize: '0.94rem', color: '#292536' }}>
                              {addr.full_name}
                            </div>
                            <div style={{ fontSize: '0.84rem', color: '#555', lineHeight: 1.5 }}>
                              {addr.address_line1}
                              {addr.address_line2 && <>, {addr.address_line2}</>}
                              <br />
                              {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                            </div>
                            <div className="mt-2 text-muted" style={{ fontSize: '0.8rem' }}>
                              Phone: <strong style={{ color: '#292536' }}>{addr.phone}</strong>
                            </div>
                          </div>

                          {/* Action Toolbar */}
                          <div className="mt-3 pt-2.5 border-top d-flex justify-content-between align-items-center" style={{ borderColor: '#ECE9F1' }}>
                            <div>
                              {!isDefault && (
                                <Button
                                  size="small"
                                  onClick={() => handleSetDefault(addr.id)}
                                  sx={{
                                    fontSize: '0.74rem',
                                    color: '#77708F',
                                    p: 0,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    '&:hover': { color: '#292536', backgroundColor: 'transparent' }
                                  }}
                                >
                                  Set as Default
                                </Button>
                              )}
                            </div>

                            <div className="d-flex align-items-center gap-1">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenEditAddress(addr)}
                                title="Edit address"
                                sx={{ color: '#77708F', '&:hover': { color: '#292536', backgroundColor: '#EDE8F5' } }}
                              >
                                <EditOutlined fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => setDeleteConfirmId(addr.id)}
                                title="Delete address"
                                sx={{ color: '#dc2626', '&:hover': { backgroundColor: '#FEE2E2' } }}
                              >
                                <DeleteOutline fontSize="small" />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MODAL 1: Edit Profile Dialog */}
        <Dialog
          open={profileModalOpen}
          onClose={() => !profileSaving && setProfileModalOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
        >
          <form onSubmit={handleSaveProfile}>
            <DialogTitle className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <span className="fw-bold" style={{ fontFamily: 'Inter, sans-serif', color: '#292536', fontSize: '1.15rem' }}>
                Edit Account Profile
              </span>
              <IconButton onClick={() => setProfileModalOpen(false)} size="small" disabled={profileSaving}>
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent className="pt-3">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted mb-1">FULL NAME *</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-muted mb-1">EMAIL ADDRESS (CANNOT BE CHANGED)</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={user?.email || ''}
                    disabled
                    helperText="Contact customer atelier support to change email"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-muted mb-1">PHONE NUMBER *</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-muted mb-1">PRIMARY ADDRESS LINE</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    placeholder="Street or apartment address"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label small fw-bold text-muted mb-1">CITY</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={profileForm.city}
                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label small fw-bold text-muted mb-1">STATE</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={profileForm.state}
                    onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label small fw-bold text-muted mb-1">PINCODE</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={profileForm.pincode}
                    onChange={(e) => setProfileForm({ ...profileForm, pincode: e.target.value })}
                  />
                </div>
              </div>
            </DialogContent>

            <DialogActions className="px-4 pb-3 border-top">
              <Button
                onClick={() => setProfileModalOpen(false)}
                disabled={profileSaving}
                sx={{ color: '#77708F', textTransform: 'none', fontWeight: 600 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={profileSaving}
                sx={{
                  backgroundColor: '#77708F',
                  color: '#ffffff',
                  fontWeight: 600,
                  borderRadius: '20px',
                  px: 3,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#5f5773' }
                }}
              >
                {profileSaving ? 'Saving Changes...' : 'Save Profile Changes'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* MODAL 2: Add / Edit Address Dialog */}
        <Dialog
          open={addressModalOpen}
          onClose={() => !addressSaving && setAddressModalOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
        >
          <form onSubmit={handleSaveAddress}>
            <DialogTitle className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <span className="fw-bold" style={{ fontFamily: 'Inter, sans-serif', color: '#292536', fontSize: '1.15rem' }}>
                {editingAddressId ? 'Edit Delivery Address' : 'Add New Delivery Address'}
              </span>
              <IconButton onClick={() => setAddressModalOpen(false)} size="small" disabled={addressSaving}>
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent className="pt-3">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold text-muted mb-1">RECIPIENT FULL NAME *</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    placeholder="Recipient's name"
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold text-muted mb-1">CONTACT PHONE NUMBER *</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-muted mb-1">ADDRESS LINE 1 (FLAT / BUILDING / STREET) *</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={addressForm.addressLine1}
                    onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                    placeholder="Flat 304, Green Meadows, 12th Main"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-muted mb-1">ADDRESS LINE 2 (LANDMARK / LOCALITY)</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={addressForm.addressLine2}
                    onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                    placeholder="Near City Center / Opp. Botanical Garden"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label small fw-bold text-muted mb-1">CITY *</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label small fw-bold text-muted mb-1">STATE *</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label small fw-bold text-muted mb-1">PINCODE *</label>
                  <TextField
                    fullWidth
                    size="small"
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    placeholder="560038"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold text-muted mb-1 d-block">ADDRESS TYPE</label>
                  <RadioGroup
                    row
                    value={addressForm.addressType}
                    onChange={(e) => setAddressForm({ ...addressForm, addressType: e.target.value })}
                  >
                    <FormControlLabel value="Home" control={<Radio size="small" />} label="Home (All Day Delivery)" />
                    <FormControlLabel value="Work" control={<Radio size="small" />} label="Work (Office Hours 9AM - 6PM)" />
                    <FormControlLabel value="Other" control={<Radio size="small" />} label="Other" />
                  </RadioGroup>
                </div>

                <div className="col-12">
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={addressForm.isDefault}
                        onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                      />
                    }
                    label={<span style={{ fontSize: '0.85rem' }}>Set as default delivery address</span>}
                  />
                </div>
              </div>
            </DialogContent>

            <DialogActions className="px-4 pb-3 border-top">
              <Button
                onClick={() => setAddressModalOpen(false)}
                disabled={addressSaving}
                sx={{ color: '#77708F', textTransform: 'none', fontWeight: 600 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={addressSaving}
                sx={{
                  backgroundColor: '#77708F',
                  color: '#ffffff',
                  fontWeight: 600,
                  borderRadius: '20px',
                  px: 3,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#5f5773' }
                }}
              >
                {addressSaving ? 'Saving...' : editingAddressId ? 'Update Address' : 'Save Address'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* MODAL 3: Delete Address Confirmation */}
        <Dialog
          open={Boolean(deleteConfirmId)}
          onClose={() => setDeleteConfirmId(null)}
          maxWidth="xs"
          fullWidth
          PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
        >
          <DialogTitle className="fw-bold" style={{ color: '#292536' }}>
            Delete Address?
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary">
              Are you sure you want to remove this delivery address from your account? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions className="px-3 pb-3">
            <Button onClick={() => setDeleteConfirmId(null)} sx={{ color: '#77708F', textTransform: 'none', fontWeight: 600 }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAddress}
              variant="contained"
              color="error"
              sx={{ borderRadius: '20px', textTransform: 'none', fontWeight: 600, px: 3 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Toast Feedback */}
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={() => setToast({ ...toast, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity={toast.severity} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

