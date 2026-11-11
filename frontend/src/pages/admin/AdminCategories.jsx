import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { adminService } from '../../services/adminService';
import {
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Snackbar,
  Box
} from '@mui/material';
import { Add, Edit, Delete, CategoryOutlined, Business } from '@mui/icons-material';

export default function AdminCategories() {
  const [tab, setTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Dialog State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', image_url: '', logo_url: '' });

  const loadData = async () => {
    setLoading(true);
    try {
      const [catRes, brandRes] = await Promise.all([
        productService.getCategories(),
        productService.getBrands()
      ]);
      if (catRes.success) setCategories(catRes.data);
      if (brandRes.success) setBrands(brandRes.data);
    } catch (err) {
      console.error('Failed to load categories/brands:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', slug: '', description: '', image_url: '', logo_url: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({
      name: item.name || '',
      slug: item.slug || '',
      description: item.description || '',
      image_url: item.image_url || '',
      logo_url: item.logo_url || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tab === 0) {
        // Category
        if (isEditing) {
          await adminService.updateCategory(currentId, formData);
          setToast('Category updated successfully.');
        } else {
          await adminService.createCategory(formData);
          setToast('Category created successfully.');
        }
      } else {
        // Brand
        if (isEditing) {
          await adminService.updateBrand(currentId, formData);
          setToast('Brand updated successfully.');
        } else {
          await adminService.createBrand(formData);
          setToast('Brand created successfully.');
        }
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Action failed. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (tab === 0) {
        await adminService.deleteCategory(id);
      } else {
        await adminService.deleteBrand(id);
      }
      setToast('Item deleted.');
      loadData();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Categories & Perfume Houses
          </h3>
          <Typography variant="body2" color="text.secondary">
            Configure fragrance olfactory families and brand houses
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenAdd}
          sx={{ backgroundColor: '#77708F', color: '#292536', fontWeight: 700, mt: { xs: 2, md: 0 } }}
        >
          {tab === 0 ? 'Add Category' : 'Add Brand'}
        </Button>
      </div>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, val) => setTab(val)}
          sx={{ '& .Mui-selected': { color: '#77708F !important' }, '& .MuiTabs-indicator': { backgroundColor: '#77708F' } }}
        >
          <Tab icon={<CategoryOutlined />} iconPosition="start" label="Fragrance Families (Categories)" />
          <Tab icon={<Business />} iconPosition="start" label="Perfume Houses (Brands)" />
        </Tabs>
      </Box>

      {/* Content Table */}
      <div className="bg-white rounded border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#77708F' }} />
          </Box>
        ) : tab === 0 ? (
          /* Categories Table */
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
              <thead className="table-light">
                <tr>
                  <th style={{ width: '60px' }}>Thumbnail</th>
                  <th>Family Name</th>
                  <th>Slug</th>
                  <th>Description</th>
                  <th>Perfumes Count</th>
                  <th style={{ width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <img
                        src={c.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=200&q=80'}
                        alt=""
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
                      />
                    </td>
                    <td className="fw-bold">{c.name}</td>
                    <td><code>{c.slug}</code></td>
                    <td className="text-muted" style={{ maxWidth: 300 }}>{c.description}</td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {c.product_count || 0} Perfumes
                      </span>
                    </td>
                    <td>
                      <IconButton size="small" onClick={() => handleOpenEdit(c)} color="primary"><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(c.id)} color="error"><Delete fontSize="small" /></IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Brands Table */
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
              <thead className="table-light">
                <tr>
                  <th style={{ width: '60px' }}>Logo/Icon</th>
                  <th>Brand House</th>
                  <th>Slug</th>
                  <th>Heritage Description</th>
                  <th>Perfumes</th>
                  <th style={{ width: '100px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <img
                        src={b.logo_url || 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=200&q=80'}
                        alt=""
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td className="fw-bold">{b.name}</td>
                    <td><code>{b.slug}</code></td>
                    <td className="text-muted" style={{ maxWidth: 300 }}>{b.description}</td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {b.product_count || 0} Perfumes
                      </span>
                    </td>
                    <td>
                      <IconButton size="small" onClick={() => handleOpenEdit(b)} color="primary"><Edit fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(b.id)} color="error"><Delete fontSize="small" /></IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT DIALOG */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            {isEditing ? `Edit ${tab === 0 ? 'Category' : 'Brand'}` : `Create New ${tab === 0 ? 'Category' : 'Brand'}`}
          </DialogTitle>
          <DialogContent dividers>
            <div className="row g-3">
              <div className="col-12">
                <TextField
                  fullWidth
                  label="Name"
                  size="small"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  label="Slug (optional, auto-generated from name)"
                  size="small"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  label={tab === 0 ? 'Image URL (Fragrance Family banner)' : 'Logo / Image URL'}
                  size="small"
                  value={tab === 0 ? formData.image_url : formData.logo_url}
                  onChange={(e) =>
                    tab === 0
                      ? setFormData({ ...formData, image_url: e.target.value })
                      : setFormData({ ...formData, logo_url: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  size="small"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setModalOpen(false)} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#292536', color: '#fff' }}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        message={toast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
}
