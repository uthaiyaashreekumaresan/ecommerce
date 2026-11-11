import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { productService } from '../../services/productService';
import { broadcastProductUpdate } from '../../utils/productSync';
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  IconButton,
  Alert,
  Snackbar,
  Chip,
  Box,
  Tooltip
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  CloudUpload,
  Search,
  CheckCircle,
  WarningAmber,
  PhotoCamera,
  Sync,
  Image as ImageIcon,
  Visibility,
  OpenInNew,
  CategoryOutlined,
  FilterList
} from '@mui/icons-material';

export default function AdminProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Category-Wise Filter State (Defaults to first category, NOT all products mixed together)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // View Product Formulation Modal State
  const [viewModal, setViewModal] = useState({ open: false, product: null, activeImgIdx: 0 });

  // Dialog State
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Dedicated 3-Image Management Modal State
  const [imageModal, setImageModal] = useState({ open: false, product: null });
  const [imagesState, setImagesState] = useState({
    1: { currentUrl: '', previewUrl: '', file: null, customUrl: '', isRemoved: false },
    2: { currentUrl: '', previewUrl: '', file: null, customUrl: '', isRemoved: false },
    3: { currentUrl: '', previewUrl: '', file: null, customUrl: '', isRemoved: false }
  });
  const [savingIndex, setSavingIndex] = useState(null); // 'all' or 1, 2, 3
  const [imageError, setImageError] = useState('');

  // Add/Edit Form Direct Image Upload State (Min 1, Max 3)
  const [formImages, setFormImages] = useState({
    1: { file: null, previewUrl: '', existingUrl: '' },
    2: { file: null, previewUrl: '', existingUrl: '' },
    3: { file: null, previewUrl: '', existingUrl: '' }
  });

  // Form State
  const initialForm = {
    name: '',
    brand_id: '',
    category_id: '',
    gender: 'Unisex',
    price: '',
    discount_price: '',
    stock: 50,
    volume_ml: 50,
    concentration: 'Eau De Parfum (EDP)',
    top_notes: '',
    heart_notes: '',
    base_notes: '',
    image_url: '',
    image_url_1: '',
    image_url_2: '',
    image_url_3: '',
    description: '',
    short_description: '',
    is_featured: false
  };
  const [formData, setFormData] = useState(initialForm);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodsRes, catsRes, brandsRes] = await Promise.all([
        adminService.getAllProducts(),
        productService.getCategories(),
        productService.getBrands()
      ]);
      if (prodsRes.success) setProducts(prodsRes.data);
      if (catsRes.success) {
        setCategories(catsRes.data);

        // Sync category selection with URL search param or default to the first category (Requirement 1 & 7)
        const urlCatParam = searchParams.get('category');
        if (urlCatParam === 'all') {
          setSelectedCategoryId('all');
        } else if (urlCatParam) {
          const matched = catsRes.data.find(
            (c) => c.slug === urlCatParam || String(c.id) === String(urlCatParam)
          );
          if (matched) {
            setSelectedCategoryId(matched.id);
          } else if (catsRes.data.length > 0) {
            setSelectedCategoryId(catsRes.data[0].id);
          }
        } else {
          // Default to the first category from database (Category-wise view by default)
          setSelectedCategoryId((prev) => prev !== null ? prev : (catsRes.data[0]?.id || null));
        }
      }
      if (brandsRes.success) setBrands(brandsRes.data);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Category switch handler with URL param persistence
  const handleCategorySelect = (catId, slug) => {
    setSelectedCategoryId(catId);
    if (catId === 'all') {
      setSearchParams({ category: 'all' });
    } else {
      setSearchParams({ category: slug });
    }
  };

  // Helper to dynamically calculate product count per category
  const getCategoryCount = (catId) => {
    return products.filter((p) => Number(p.category_id) === Number(catId)).length;
  };

  const activeCategory = categories.find((c) => c.id === selectedCategoryId);

  const handleOpenView = (p) => {
    setViewModal({ open: true, product: p, activeImgIdx: 0 });
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    // Pre-select category to the currently viewed category tab (Requirement 9)
    const defaultCatId =
      (selectedCategoryId && selectedCategoryId !== 'all')
        ? selectedCategoryId
        : (categories[0]?.id || '');

    setFormData({
      ...initialForm,
      brand_id: brands[0]?.id || '',
      category_id: defaultCatId
    });
    setFormImages({
      1: { file: null, previewUrl: '', existingUrl: '' },
      2: { file: null, previewUrl: '', existingUrl: '' },
      3: { file: null, previewUrl: '', existingUrl: '' }
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingId(p.id);
    const img1 = p.image_url_1 || p.image_url || p.gallery_urls?.[0] || '';
    const img2 = p.image_url_2 || (p.gallery_urls && p.gallery_urls[1] !== img1 ? p.gallery_urls[1] : '') || '';
    const img3 = p.image_url_3 || (p.gallery_urls && p.gallery_urls[2] !== img1 && p.gallery_urls[2] !== img2 ? p.gallery_urls[2] : '') || '';

    setFormData({
      name: p.name || '',
      brand_id: p.brand_id || '',
      category_id: p.category_id || '',
      gender: p.gender || 'Unisex',
      price: p.price || '',
      discount_price: p.discount_price || '',
      stock: p.stock ?? 50,
      volume_ml: p.volume_ml || 50,
      concentration: p.concentration || 'Eau De Parfum (EDP)',
      top_notes: Array.isArray(p.top_notes) ? p.top_notes.join(', ') : (p.top_notes || ''),
      heart_notes: Array.isArray(p.heart_notes) ? p.heart_notes.join(', ') : (p.heart_notes || ''),
      base_notes: Array.isArray(p.base_notes) ? p.base_notes.join(', ') : (p.base_notes || ''),
      image_url: img1,
      image_url_1: img1,
      image_url_2: img2,
      image_url_3: img3,
      description: p.description || '',
      short_description: p.short_description || '',
      is_featured: Boolean(p.is_featured)
    });

    setFormImages({
      1: { file: null, previewUrl: img1, existingUrl: img1 },
      2: { file: null, previewUrl: img2, existingUrl: img2 },
      3: { file: null, previewUrl: img3, existingUrl: img3 }
    });

    setOpenModal(true);
  };

  const handleFormImageSelect = (slot, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      alert(error);
      return;
    }

    try {
      const objectUrl = URL.createObjectURL(file);
      setFormImages((prev) => ({
        ...prev,
        [slot]: {
          file,
          previewUrl: objectUrl,
          existingUrl: prev[slot]?.existingUrl || ''
        }
      }));
    } catch (_) {}
  };

  const handleFormImageRemove = (slot) => {
    setFormImages((prev) => ({
      ...prev,
      [slot]: {
        file: null,
        previewUrl: '',
        existingUrl: ''
      }
    }));
  };

  const validateImageFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return 'Invalid file type. Only JPG, PNG, WEBP, and AVIF perfume bottle images are supported.';
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'File size exceeds 5MB limit. Please select an image under 5MB.';
    }
    return null;
  };

  const handleOpenImageModal = async (product) => {
    setImageModal({ open: true, product });
    setImageError('');
    setSavingIndex(null);

    const fallback1 = product.image_url_1 || product.image_url || product.gallery_urls?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80';
    const fallback2 = product.image_url_2 || product.gallery_urls?.[1] || 'https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80';
    const fallback3 = product.image_url_3 || product.gallery_urls?.[2] || 'https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80';

    setImagesState({
      1: { currentUrl: fallback1, previewUrl: fallback1, file: null, customUrl: '', isRemoved: false },
      2: { currentUrl: fallback2, previewUrl: fallback2, file: null, customUrl: '', isRemoved: false },
      3: { currentUrl: fallback3, previewUrl: fallback3, file: null, customUrl: '', isRemoved: false }
    });

    try {
      const res = await adminService.getProductImages(product.id);
      if (res && res.success && res.data) {
        setImagesState({
          1: { currentUrl: res.data.image_url_1 || fallback1, previewUrl: res.data.image_url_1 || fallback1, file: null, customUrl: '', isRemoved: false },
          2: { currentUrl: res.data.image_url_2 || fallback2, previewUrl: res.data.image_url_2 || fallback2, file: null, customUrl: '', isRemoved: false },
          3: { currentUrl: res.data.image_url_3 || fallback3, previewUrl: res.data.image_url_3 || fallback3, file: null, customUrl: '', isRemoved: false }
        });
      }
    } catch (_) {}
  };

  const handleSingleImageFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      setImageError(`Image ${index}: ${error}`);
      return;
    }

    setImageError('');
    try {
      const objectUrl = URL.createObjectURL(file);
      setImagesState((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          file,
          previewUrl: objectUrl,
          customUrl: '',
          isRemoved: false
        }
      }));
    } catch (_) {}
  };

  const handleSingleCustomUrlChange = (index, url) => {
    setImageError('');
    setImagesState((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        customUrl: url,
        previewUrl: url.trim() || prev[index].currentUrl,
        file: null,
        isRemoved: false
      }
    }));
  };

  const handleSingleImageRemove = (index) => {
    setImagesState((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        file: null,
        customUrl: '',
        previewUrl: '',
        isRemoved: true
      }
    }));
  };

  const handleSingleImageReset = (index) => {
    setImagesState((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        file: null,
        customUrl: '',
        previewUrl: prev[index].currentUrl,
        isRemoved: false
      }
    }));
  };

  // Save only ONE individual image without changing the other two!
  const handleSaveSingleImage = async (index) => {
    if (!imageModal.product) return;
    const imgData = imagesState[index];
    const hasChange = imgData.file || (imgData.customUrl && imgData.customUrl !== imgData.currentUrl) || imgData.isRemoved;
    if (!hasChange) {
      setImageError(`Image ${index} has not been modified.`);
      return;
    }

    setSavingIndex(index);
    setImageError('');

    try {
      let res = null;
      if (imgData.file) {
        const formData = new FormData();
        formData.append('image', imgData.file);
        res = await adminService.updateProductImageIndex(imageModal.product.id, index, formData, true);
      } else if (imgData.customUrl) {
        res = await adminService.updateProductImageIndex(imageModal.product.id, index, { imageUrl: imgData.customUrl.trim() }, false);
      } else if (imgData.isRemoved) {
        const fallback = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80';
        res = await adminService.updateProductImageIndex(imageModal.product.id, index, { imageUrl: fallback }, false);
      }

      if (res && res.success && res.data) {
        const updatedProduct = res.data;
        const newUrl = res.imageUrl || updatedProduct[`image_url_${index}`];

        setImagesState((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            currentUrl: newUrl,
            previewUrl: newUrl,
            file: null,
            customUrl: '',
            isRemoved: false
          }
        }));

        setProducts((prev) =>
          prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
        );

        setImageModal((prev) => ({ ...prev, product: updatedProduct }));

        broadcastProductUpdate({
          productId: updatedProduct.id,
          imageUrl: updatedProduct.image_url_1 || updatedProduct.image_url,
          image_url_1: updatedProduct.image_url_1,
          image_url_2: updatedProduct.image_url_2,
          image_url_3: updatedProduct.image_url_3,
          product: updatedProduct
        });

        const otherIndices = [1, 2, 3].filter((i) => i !== index);
        setToastMessage(`✓ Image ${index} updated in PostgreSQL! Images ${otherIndices.join(' & ')} remain unchanged.`);
      }
    } catch (err) {
      console.error(`Failed to update Image ${index}:`, err);
      setImageError(err.response?.data?.message || `Error updating Image ${index} in PostgreSQL.`);
    } finally {
      setSavingIndex(null);
    }
  };

  // Save all 3 images at once
  const handleSaveAllImages = async () => {
    if (!imageModal.product) return;
    setSavingIndex('all');
    setImageError('');

    try {
      const formData = new FormData();
      const jsonPayload = {};
      let hasFile = false;
      let hasAnyChange = false;

      for (let i = 1; i <= 3; i++) {
        const img = imagesState[i];
        if (img.file) {
          formData.append(`image${i}`, img.file);
          hasFile = true;
          hasAnyChange = true;
        } else if (img.customUrl && img.customUrl !== img.currentUrl) {
          jsonPayload[`image_url_${i}`] = img.customUrl.trim();
          hasAnyChange = true;
        } else if (img.isRemoved) {
          jsonPayload[`image_url_${i}`] = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80';
          hasAnyChange = true;
        }
      }

      if (!hasAnyChange) {
        setImageModal({ open: false, product: null });
        return;
      }

      let res = null;
      if (hasFile) {
        for (const [key, val] of Object.entries(jsonPayload)) {
          formData.append(key, val);
        }
        res = await adminService.updateProduct3Images(imageModal.product.id, formData, true);
      } else {
        res = await adminService.updateProduct3Images(imageModal.product.id, jsonPayload, false);
      }

      if (res && res.success && res.data) {
        const updatedProduct = res.data;

        setProducts((prev) =>
          prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
        );

        broadcastProductUpdate({
          productId: updatedProduct.id,
          imageUrl: updatedProduct.image_url_1 || updatedProduct.image_url,
          image_url_1: updatedProduct.image_url_1,
          image_url_2: updatedProduct.image_url_2,
          image_url_3: updatedProduct.image_url_3,
          product: updatedProduct
        });

        setToastMessage(`✓ All modified images saved to PostgreSQL and synchronized!`);
        setImageModal({ open: false, product: null });
      }
    } catch (err) {
      console.error('Failed to save all images:', err);
      setImageError(err.response?.data?.message || 'Error updating product images in PostgreSQL.');
    } finally {
      setSavingIndex(null);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      alert(error);
      return;
    }

    const uploadData = new FormData();
    uploadData.append('image', file);

    setUploadingImage(true);
    try {
      const res = await adminService.uploadImage(uploadData);
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, image_url: res.url }));
        setToastMessage('Image uploaded and preview updated!');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify minimum 1 image is provided for Image 1
    const hasImage1 = formImages[1]?.file || formImages[1]?.previewUrl || formImages[1]?.existingUrl || formData.image_url_1 || formData.image_url;
    if (!hasImage1) {
      alert('Please upload at least 1 image (Image 1 – Main Product Image is required).');
      return;
    }

    setUploadingImage(true);
    try {
      // 1. Upload any newly selected image files
      const finalImageUrls = {
        1: formImages[1]?.existingUrl || formData.image_url_1 || formData.image_url || '',
        2: formImages[2]?.existingUrl || formData.image_url_2 || '',
        3: formImages[3]?.existingUrl || formData.image_url_3 || ''
      };

      for (let i = 1; i <= 3; i++) {
        if (formImages[i]?.file) {
          const uploadData = new FormData();
          uploadData.append('image', formImages[i].file);
          const uploadRes = await adminService.uploadImage(uploadData);
          if (uploadRes.success && uploadRes.url) {
            finalImageUrls[i] = uploadRes.url;
          }
        } else if (!formImages[i]?.previewUrl) {
          finalImageUrls[i] = '';
        }
      }

      const img1 = finalImageUrls[1] || formData.image_url_1 || formData.image_url;
      const img2 = finalImageUrls[2] || null;
      const img3 = finalImageUrls[3] || null;
      const galleryUrls = [img1, img2, img3].filter(Boolean);

      const payload = {
        ...formData,
        price: Number(formData.price),
        discount_price: formData.discount_price ? Number(formData.discount_price) : null,
        stock: Number(formData.stock),
        volume_ml: Number(formData.volume_ml),
        top_notes: formData.top_notes.split(',').map((s) => s.trim()).filter(Boolean),
        heart_notes: formData.heart_notes.split(',').map((s) => s.trim()).filter(Boolean),
        base_notes: formData.base_notes.split(',').map((s) => s.trim()).filter(Boolean),
        image_url: img1,
        image_url_1: img1,
        image_url_2: img2,
        image_url_3: img3,
        gallery_urls: galleryUrls
      };

      if (editingId) {
        const res = await adminService.updateProduct(editingId, payload);
        broadcastProductUpdate({
          productId: editingId,
          imageUrl: img1,
          image_url_1: img1,
          image_url_2: img2,
          image_url_3: img3,
          images: galleryUrls,
          product: res.data
        });
        setToastMessage('✓ Perfume & images updated in PostgreSQL and synchronized across customer store!');
      } else {
        const res = await adminService.createProduct(payload);
        if (res.data) {
          broadcastProductUpdate({
            productId: res.data.id,
            imageUrl: img1,
            image_url_1: img1,
            image_url_2: img2,
            image_url_3: img3,
            images: galleryUrls,
            product: res.data
          });
        }
        setToastMessage('✓ New perfume & images uploaded to PostgreSQL successfully!');
      }
      setOpenModal(false);
      loadData();
    } catch (err) {
      console.error('Error saving product:', err);
      alert(err.response?.data?.message || 'Error saving product');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminService.deleteProduct(id);
      setDeleteConfirmId(null);
      setToastMessage('Perfume deleted.');
      loadData();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const filteredProducts = products.filter((p) => {
    // 1. Category Filter: default is category-wise (only matches selected category unless 'all' is explicitly chosen)
    const matchesCategory =
      selectedCategoryId === 'all' ||
      (selectedCategoryId !== null && Number(p.category_id) === Number(selectedCategoryId));

    if (!matchesCategory) return false;

    // 2. Search Filter
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.brand_name && p.brand_name.toLowerCase().includes(q)) ||
      (p.category_name && p.category_name.toLowerCase().includes(q)) ||
      (p.short_description && p.short_description.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <div>
          <h3 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Perfume Products Catalog
          </h3>
          <Typography variant="body2" color="text.secondary">
            Manage fragrance inventory, pricing, bottle notes, and high-res imagery by category
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenAdd}
          sx={{
            backgroundColor: '#77708F',
            color: '#292536',
            fontWeight: 700,
            mt: { xs: 2, md: 0 },
            '&:hover': { backgroundColor: '#645D7B' }
          }}
        >
          Add New Perfume
        </Button>
      </div>

      {/* CATEGORY TABS FILTER BAR (Dynamic from PostgreSQL DB) */}
      <div className="bg-white p-3 rounded border mb-3 shadow-sm" style={{ borderColor: '#E2DFEB' }}>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-2">
            <CategoryOutlined sx={{ color: '#77708F', fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#292536', letterSpacing: '0.2px' }}>
              Olfactory Fragrance Families (Categories)
            </Typography>
          </div>
          <span className="badge bg-light text-muted border" style={{ fontSize: '0.72rem' }}>
            Category-Wise Segmented View
          </span>
        </div>

        {/* Scrollable Category Filter Pills with Live Product Counts */}
        <div
          className="d-flex gap-2 py-1 overflow-auto"
          style={{
            whiteSpace: 'nowrap',
            scrollbarWidth: 'thin'
          }}
        >
          {categories.map((c) => {
            const isSelected = selectedCategoryId === c.id;
            const count = getCategoryCount(c.id);

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleCategorySelect(c.id, c.slug)}
                className="btn btn-sm d-inline-flex align-items-center gap-2 rounded-pill px-3 py-1.5"
                style={{
                  backgroundColor: isSelected ? '#292536' : '#FAF9FC',
                  color: isSelected ? '#ffffff' : '#4A4458',
                  border: isSelected ? '1.5px solid #292536' : '1px solid #E2DFEB',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.82rem',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <span>{c.name}</span>
                <span
                  className="badge rounded-pill"
                  style={{
                    backgroundColor: isSelected ? '#77708F' : '#E2DFEB',
                    color: isSelected ? '#ffffff' : '#292536',
                    fontSize: '0.72rem',
                    padding: '3px 7px'
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* All Categories Option (At the end for optional broad view) */}
          <div className="vr mx-1 my-auto" style={{ height: '24px', opacity: 0.2 }} />
          <button
            type="button"
            onClick={() => handleCategorySelect('all', 'all')}
            className="btn btn-sm d-inline-flex align-items-center gap-2 rounded-pill px-3 py-1.5"
            style={{
              backgroundColor: selectedCategoryId === 'all' ? '#292536' : '#FAF9FC',
              color: selectedCategoryId === 'all' ? '#ffffff' : '#666',
              border: selectedCategoryId === 'all' ? '1.5px solid #292536' : '1px dashed #D8D2E4',
              fontWeight: selectedCategoryId === 'all' ? 700 : 500,
              fontSize: '0.82rem',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            <span>All Categories</span>
            <span
              className="badge rounded-pill"
              style={{
                backgroundColor: selectedCategoryId === 'all' ? '#77708F' : '#E2DFEB',
                color: selectedCategoryId === 'all' ? '#ffffff' : '#292536',
                fontSize: '0.72rem',
                padding: '3px 7px'
              }}
            >
              {products.length}
            </span>
          </button>
        </div>
      </div>

      {/* Active Category Header & Search Info */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center px-1 mb-2">
        <div className="d-flex align-items-center gap-2">
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#292536', fontSize: '1.05rem' }}>
            {activeCategory ? activeCategory.name : 'All Perfume Formulations'}
          </Typography>
          <span className="badge bg-dark text-white rounded-pill px-2.5 py-1" style={{ fontSize: '0.75rem' }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Perfume' : 'Perfumes'}
          </span>
          {activeCategory && activeCategory.description && (
            <span className="text-muted d-none d-lg-inline" style={{ fontSize: '0.8rem' }}>
              • {activeCategory.description}
            </span>
          )}
        </div>
        <Typography variant="caption" sx={{ color: '#77708F', fontWeight: 600 }}>
          {selectedCategoryId === 'all'
            ? 'Viewing all categories combined'
            : `Showing perfumes assigned to "${activeCategory?.name || 'Category'}"`}
        </Typography>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded border mb-4 shadow-sm" style={{ borderColor: '#E2DFEB' }}>
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <TextField
              fullWidth
              size="small"
              placeholder={`Search ${activeCategory ? `within ${activeCategory.name}...` : 'perfumes by title, brand, or notes...'}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: '#888', mr: 1 }} />
              }}
            />
          </div>
          <div className="col-12 col-md-6 text-md-end mt-2 mt-md-0 text-muted" style={{ fontSize: '0.85rem' }}>
            Showing {filteredProducts.length} {activeCategory ? `in ${activeCategory.name}` : 'total'}
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#77708F' }} />
          </Box>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
              <thead className="table-light">
                <tr>
                  <th style={{ width: '60px' }}>Image</th>
                  <th>Perfume Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Featured</th>
                  <th style={{ width: '130px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5 text-muted">
                      <div className="py-3">
                        <CategoryOutlined sx={{ fontSize: 40, color: '#B8AFCB', mb: 1 }} />
                        <div className="fw-bold">No perfumes found in this category</div>
                        <small className="text-muted">
                          {search ? 'Try adjusting your search keywords.' : `Click "+ Add New Perfume" to add the first formulation to ${activeCategory?.name || 'this category'}.`}
                        </small>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <Tooltip title="Click to Manage 3 Product Images (Image 1, 2, 3)" arrow>
                          <div
                            className="d-flex align-items-center gap-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleOpenImageModal(p)}
                          >
                            {[
                              p.image_url_1 || p.image_url,
                              p.image_url_2 || p.gallery_urls?.[1],
                              p.image_url_3 || p.gallery_urls?.[2]
                            ].map((imgUrl, idx) => (
                              <div
                                key={idx}
                                style={{
                                  position: 'relative',
                                  width: idx === 0 ? '42px' : '26px',
                                  height: idx === 0 ? '42px' : '26px',
                                  borderRadius: '6px',
                                  overflow: 'hidden',
                                  border: idx === 0 ? '1.5px solid #77708F' : '1px solid #E2DFEB',
                                  backgroundColor: '#FFFFFF',
                                  flexShrink: 0
                                }}
                                title={`Image ${idx + 1}: ${idx === 0 ? 'Main' : idx === 1 ? 'Secondary' : 'Additional'}`}
                              >
                                <img
                                  src={imgUrl || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80'}
                                  alt={`Img ${idx + 1}`}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80';
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </Tooltip>
                      </td>
                      <td>
                        <div className="fw-bold">{p.name}</div>
                        <small className="text-muted">{p.volume_ml || 50}ml • {p.gender}</small>
                      </td>
                      <td>{p.brand_name || 'Florencia Luxe'}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {p.category_name || 'Fragrance'}
                        </span>
                      </td>
                      <td>
                        <span className="fw-bold">₹{p.discount_price || p.price}</span>
                        {p.discount_price && (
                          <small className="ms-1 text-muted text-decoration-line-through">₹{p.price}</small>
                        )}
                      </td>
                      <td>
                        {p.stock <= 10 ? (
                          <span className="badge bg-danger-subtle text-danger border border-danger">
                            {p.stock} units ⚠️
                          </span>
                        ) : (
                          <span className="badge bg-success-subtle text-success border border-success">
                            {p.stock} units
                          </span>
                        )}
                      </td>
                      <td>
                        {p.is_featured ? (
                          <span className="badge bg-dark text-warning">Bestseller</span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        {/* Requirement 8: Add, Edit, Delete and View actions for every product */}
                        <div className="d-flex gap-1">
                          <Tooltip title="View Perfume Details" arrow>
                            <IconButton size="small" onClick={() => handleOpenView(p)} sx={{ color: '#292536' }}>
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Update 3 Fragrance Images" arrow>
                            <IconButton size="small" onClick={() => handleOpenImageModal(p)} sx={{ color: '#77708F' }}>
                              <PhotoCamera fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Perfume Formulation & Category" arrow>
                            <IconButton size="small" onClick={() => handleOpenEdit(p)} color="primary">
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Perfume" arrow>
                            <IconButton size="small" onClick={() => setDeleteConfirmId(p.id)} color="error">
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL DIALOG */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
            {editingId ? 'Edit Perfume Formulation' : 'Create New Perfume Formulation'}
          </DialogTitle>
          <DialogContent dividers>
            <div className="row g-3">
              <div className="col-12 col-md-8">
                <TextField
                  fullWidth
                  label="Perfume Title"
                  size="small"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="col-12 col-md-4">
                <FormControl fullWidth size="small">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formData.gender}
                    label="Gender"
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <MenuItem value="Unisex">Unisex</MenuItem>
                    <MenuItem value="Men">Men</MenuItem>
                    <MenuItem value="Women">Women</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-12 col-md-6">
                <FormControl fullWidth size="small">
                  <InputLabel>Brand</InputLabel>
                  <Select
                    value={formData.brand_id}
                    label="Brand"
                    onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
                  >
                    {brands.map((b) => (
                      <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-12 col-md-6">
                <FormControl fullWidth size="small">
                  <InputLabel>Fragrance Family (Category)</InputLabel>
                  <Select
                    value={formData.category_id}
                    label="Fragrance Family (Category)"
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  >
                    {categories.map((c) => (
                      <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="col-6 col-md-3">
                <TextField
                  fullWidth
                  label="MRP Price (₹)"
                  type="number"
                  size="small"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="col-6 col-md-3">
                <TextField
                  fullWidth
                  label="Discount Price (₹)"
                  type="number"
                  size="small"
                  value={formData.discount_price}
                  onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                />
              </div>

              <div className="col-6 col-md-3">
                <TextField
                  fullWidth
                  label="Stock Inventory"
                  type="number"
                  size="small"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>

              <div className="col-6 col-md-3">
                <TextField
                  fullWidth
                  label="Bottle Size (ML)"
                  type="number"
                  size="small"
                  value={formData.volume_ml}
                  onChange={(e) => setFormData({ ...formData, volume_ml: e.target.value })}
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  label="Concentration Label"
                  size="small"
                  placeholder="e.g. Eau De Parfum (15% Oil Concentration)"
                  value={formData.concentration}
                  onChange={(e) => setFormData({ ...formData, concentration: e.target.value })}
                />
              </div>

              {/* Fragrance Notes Breakdown */}
              <div className="col-12 col-md-4">
                <TextField
                  fullWidth
                  label="Top Notes (comma-separated)"
                  size="small"
                  placeholder="Sicilian Bergamot, Cardamom"
                  value={formData.top_notes}
                  onChange={(e) => setFormData({ ...formData, top_notes: e.target.value })}
                />
              </div>

              <div className="col-12 col-md-4">
                <TextField
                  fullWidth
                  label="Heart Notes (comma-separated)"
                  size="small"
                  placeholder="Turkish Rose, Smoky Cedarwood"
                  value={formData.heart_notes}
                  onChange={(e) => setFormData({ ...formData, heart_notes: e.target.value })}
                />
              </div>

              <div className="col-12 col-md-4">
                <TextField
                  fullWidth
                  label="Base Notes (comma-separated)"
                  size="small"
                  placeholder="Agarwood (Oud), Ambergris, Vanilla"
                  value={formData.base_notes}
                  onChange={(e) => setFormData({ ...formData, base_notes: e.target.value })}
                />
              </div>

              {/* Product Images Direct Upload Section (Minimum 1 Image, Maximum 3 Images) */}
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#292536' }}>
                    Fragrance Bottle Images (Min 1 Required, Max 3 Images)
                  </Typography>
                  <span className="badge bg-light text-dark border" style={{ fontSize: '0.72rem' }}>
                    Direct File Upload • No URLs
                  </span>
                </div>
                <small className="text-muted d-block mb-3" style={{ fontSize: '0.78rem' }}>
                  Upload actual perfume bottle images directly from your computer. Image 1 is required for the storefront catalog; Images 2 and 3 are optional.
                </small>

                <div className="row g-3">
                  {[
                    { slot: 1, title: 'Image 1 – Main Image *', required: true, desc: 'Primary bottle displayed on Catalog & Details' },
                    { slot: 2, title: 'Image 2 – Secondary Image', required: false, desc: 'Optional bottle angle or cap view' },
                    { slot: 3, title: 'Image 3 – Additional Image', required: false, desc: 'Optional packaging or lifestyle view' }
                  ].map(({ slot, title, required, desc }) => {
                    const data = formImages[slot] || {};
                    const hasImage = Boolean(data.previewUrl || data.existingUrl);

                    return (
                      <div key={slot} className="col-12 col-md-4">
                        <div
                          className="p-3 rounded border text-center h-100 d-flex flex-column"
                          style={{
                            borderColor: hasImage ? '#77708F' : required ? '#c5a265' : '#E2DFEB',
                            borderWidth: hasImage ? '1.5px' : '1px',
                            borderStyle: hasImage ? 'solid' : 'dashed',
                            backgroundColor: hasImage ? '#FFFFFF' : '#FAF9FC',
                            borderRadius: '10px',
                            boxShadow: hasImage ? '0 2px 8px rgba(41, 37, 54, 0.05)' : 'none'
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="fw-bold text-start" style={{ fontSize: '0.82rem', color: required ? '#292536' : '#555' }}>
                              {title}
                            </span>
                            {hasImage ? (
                              <span className="badge bg-success" style={{ fontSize: '0.65rem' }}>Ready</span>
                            ) : required ? (
                              <span className="badge bg-danger" style={{ fontSize: '0.65rem' }}>Required</span>
                            ) : (
                              <span className="badge bg-secondary" style={{ fontSize: '0.65rem' }}>Optional</span>
                            )}
                          </div>
                          <small className="text-muted d-block mb-2 text-start" style={{ fontSize: '0.72rem' }}>
                            {desc}
                          </small>

                          {/* Image Box / Live Preview */}
                          <div
                            style={{
                              width: '100%',
                              height: '145px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              backgroundColor: '#FAF9FC',
                              border: '1px solid #ECE7F3',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '10px',
                              position: 'relative'
                            }}
                          >
                            {hasImage ? (
                              <img
                                src={data.previewUrl || data.existingUrl}
                                alt={`Slot ${slot}`}
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80';
                                }}
                              />
                            ) : (
                              <div className="text-muted p-2">
                                <CloudUpload sx={{ fontSize: 32, color: required ? '#77708F' : '#B8AFCB', mb: 0.5 }} />
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: required ? '#292536' : '#77708F' }}>
                                  {required ? 'Upload Main Image' : 'Upload Optional Image'}
                                </div>
                                <small style={{ fontSize: '0.68rem', color: '#999' }}>JPG, PNG, WEBP</small>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-auto d-flex gap-1">
                            <Button
                              variant={hasImage ? 'outlined' : 'contained'}
                              component="label"
                              size="small"
                              startIcon={<CloudUpload />}
                              fullWidth
                              sx={{
                                py: 0.8,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                backgroundColor: hasImage ? 'transparent' : '#292536',
                                color: hasImage ? '#292536' : '#fff',
                                borderColor: '#77708F',
                                '&:hover': {
                                  backgroundColor: hasImage ? '#f5f5f5' : '#15131C'
                                }
                              }}
                            >
                              {hasImage ? 'Change Image' : 'Choose File'}
                              <input
                                type="file"
                                hidden
                                accept="image/jpeg,image/png,image/webp,image/avif"
                                onChange={(e) => handleFormImageSelect(slot, e)}
                              />
                            </Button>

                            {hasImage && !required && (
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleFormImageRemove(slot)}
                                sx={{ minWidth: '40px', px: 1, fontSize: '0.72rem' }}
                                title="Remove this optional image"
                              >
                                Remove
                              </Button>
                            )}
                          </div>

                          {data.file && (
                            <small className="text-success mt-1 d-block text-truncate fw-semibold text-start" style={{ fontSize: '0.7rem' }}>
                              ✓ {data.file.name}
                            </small>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  label="Short Description (Summary tag)"
                  size="small"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                />
              </div>

              <div className="col-12">
                <TextField
                  fullWidth
                  label="Full Artisanal Scent Story & Description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="col-12">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      sx={{ color: '#77708F', '&.Mui-checked': { color: '#77708F' } }}
                    />
                  }
                  label="Highlight as Bestseller / Featured Perfume on Homepage"
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenModal(false)} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={uploadingImage}
              startIcon={uploadingImage ? <CircularProgress size={16} color="inherit" /> : null}
              sx={{
                backgroundColor: '#292536',
                color: '#fff',
                px: 3,
                fontWeight: 700,
                '&:hover': { backgroundColor: '#15131C' }
              }}
            >
              {uploadingImage ? 'Uploading & Syncing...' : (editingId ? 'Update Perfume Formulation' : 'Create Perfume Formulation')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* DEDICATED 3-IMAGE MANAGEMENT MODAL */}
      <Dialog
        open={imageModal.open}
        onClose={() => savingIndex === null && setImageModal({ open: false, product: null })}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="d-flex align-items-center gap-2">
            <PhotoCamera sx={{ color: '#77708F' }} />
            <span>Product Images Management (3 Images per Fragrance)</span>
          </div>
          {imageModal.product && (
            <Chip
              label={`Product ID #${imageModal.product.id}`}
              size="small"
              sx={{ fontWeight: 600, backgroundColor: '#E2DFEB', color: '#292536' }}
            />
          )}
        </DialogTitle>
        <DialogContent dividers>
          {imageModal.product && (
            <div>
              {/* Product Info Bar */}
              <div className="mb-3 p-3 rounded bg-light border d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1.5px solid #77708F',
                      backgroundColor: '#fff',
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={imagesState[1]?.previewUrl || imageModal.product.image_url}
                      alt={imageModal.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#292536' }}>{imageModal.product.name}</h5>
                    <small className="text-muted">
                      {imageModal.product.brand_name || 'Artisanal Perfume'} • {imageModal.product.category_name || 'Fragrance Family'} • ₹{imageModal.product.discount_price || imageModal.product.price}
                    </small>
                  </div>
                </div>

                <div className="text-sm-end">
                  <span className="badge bg-dark px-2.5 py-1.5" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    PostgreSQL 3-Image Sync Active
                  </span>
                </div>
              </div>

              {imageError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {imageError}
                </Alert>
              )}

              {/* Description */}
              <p className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>
                Every perfume product requires <strong>exactly 3 images</strong> in PostgreSQL.
                Upload new bottle photographs or enter image URLs. You can preview before saving, update any individual image independently, or save all 3 images together.
              </p>

              {/* Three Image Columns */}
              <div className="row g-3">
                {[
                  { index: 1, title: 'Image 1 – Main Product Image', subtitle: 'Primary bottle displayed on Catalog & Details' },
                  { index: 2, title: 'Image 2 – Secondary Product Image', subtitle: 'Angle / box / cap view for thumbnail 1' },
                  { index: 3, title: 'Image 3 – Additional Product Image', subtitle: 'Lifestyle / ingredients for thumbnail 2' }
                ].map(({ index, title, subtitle }) => {
                  const imgData = imagesState[index] || {};
                  const isModified = Boolean(imgData.file || (imgData.customUrl && imgData.customUrl !== imgData.currentUrl) || imgData.isRemoved);
                  const isCurrentlySaving = savingIndex === index || savingIndex === 'all';

                  return (
                    <div key={index} className="col-12 col-md-4">
                      <div
                        className="card h-100 border p-3"
                        style={{
                          borderColor: isModified ? '#77708F' : '#E2DFEB',
                          borderWidth: isModified ? '2px' : '1px',
                          borderRadius: '12px',
                          backgroundColor: '#FFFFFF',
                          boxShadow: isModified ? '0 6px 16px rgba(119, 112, 143, 0.15)' : 'none',
                          transition: 'all 0.25s ease'
                        }}
                      >
                        {/* Title & Status */}
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <h6 className="fw-bold mb-0" style={{ fontSize: '0.9rem', color: '#292536' }}>
                            {title}
                          </h6>
                          {isModified ? (
                            <span className="badge bg-warning text-dark" style={{ fontSize: '0.68rem' }}>
                              Modified
                            </span>
                          ) : (
                            <span className="badge bg-success-subtle text-success border border-success" style={{ fontSize: '0.68rem' }}>
                              Saved in DB
                            </span>
                          )}
                        </div>
                        <small className="text-muted d-block mb-2" style={{ fontSize: '0.74rem' }}>
                          {subtitle}
                        </small>

                        {/* Live Image Preview Container */}
                        <div
                          style={{
                            width: '100%',
                            height: '180px',
                            borderRadius: '8px',
                            border: '1px solid #ECE7F3',
                            backgroundColor: '#FAF9FC',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            marginBottom: '12px',
                            padding: '6px'
                          }}
                        >
                          {imgData.previewUrl ? (
                            <img
                              src={imgData.previewUrl}
                              alt={`Preview ${index}`}
                              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                              onError={() => setImageError(`Failed to load preview for Image ${index}.`)}
                            />
                          ) : (
                            <div className="text-muted text-center p-2" style={{ fontSize: '0.8rem' }}>
                              No image selected
                            </div>
                          )}

                          {isModified && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 6,
                                right: 6,
                                backgroundColor: '#2E7D32',
                                color: '#fff',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '0.68rem',
                                fontWeight: 600
                              }}
                            >
                              Live Preview
                            </div>
                          )}
                        </div>

                        {/* Direct File Upload Button */}
                        <div className="mb-3">
                          <Button
                            variant={imgData.file ? 'contained' : 'outlined'}
                            component="label"
                            size="small"
                            startIcon={<CloudUpload />}
                            disabled={isCurrentlySaving}
                            fullWidth
                            sx={{
                              py: 1,
                              borderColor: '#77708F',
                              backgroundColor: imgData.file ? '#292536' : 'transparent',
                              color: imgData.file ? '#FFFFFF' : '#292536',
                              fontWeight: 600,
                              fontSize: '0.8rem',
                              textTransform: 'none',
                              '&:hover': {
                                backgroundColor: imgData.file ? '#15131C' : '#FAF9FC'
                              }
                            }}
                          >
                            {imgData.file ? `Selected: ${imgData.file.name.slice(0, 18)}...` : `Choose Image ${index} File`}
                            <input
                              type="file"
                              hidden
                              accept="image/jpeg,image/png,image/webp,image/avif"
                              onChange={(e) => handleSingleImageFileChange(index, e)}
                            />
                          </Button>
                          {imgData.file && (
                            <small className="text-success mt-1 d-block fw-semibold" style={{ fontSize: '0.72rem' }}>
                              ✓ Validated: {imgData.file.name} ({(imgData.file.size / 1024).toFixed(1)} KB)
                            </small>
                          )}
                        </div>

                        {/* Actions for this individual image */}
                        <div className="mt-auto d-flex gap-2">
                          <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            disabled={isCurrentlySaving || !isModified}
                            onClick={() => handleSaveSingleImage(index)}
                            startIcon={savingIndex === index ? <CircularProgress size={14} color="inherit" /> : <Sync />}
                            sx={{
                              backgroundColor: '#292536',
                              color: '#fff',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              py: 0.8,
                              '&:hover': { backgroundColor: '#15131C' }
                            }}
                          >
                            {savingIndex === index ? 'Saving...' : `Save Image ${index}`}
                          </Button>

                          {isModified ? (
                            <Button
                              variant="outlined"
                              size="small"
                              disabled={isCurrentlySaving}
                              onClick={() => handleSingleImageReset(index)}
                              sx={{ fontSize: '0.72rem', minWidth: '60px', borderColor: '#E2DFEB', color: '#666' }}
                            >
                              Reset
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              disabled={isCurrentlySaving}
                              onClick={() => handleSingleImageRemove(index)}
                              sx={{ fontSize: '0.72rem', minWidth: '60px' }}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Synchronization Info Banner */}
              <div className="p-2.5 rounded bg-light border mt-4" style={{ fontSize: '0.8rem', color: '#555' }}>
                <span className="fw-bold text-dark">⚡ Customer Store Synchronization:</span> Whenever you save an individual image or all 3 images, PostgreSQL is updated immediately and changes are synchronized to the customer-facing Product Details page and catalog in real time.
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, justifyContent: 'space-between' }}>
          <Button
            onClick={() => setImageModal({ open: false, product: null })}
            disabled={savingIndex !== null}
            color="inherit"
          >
            Close
          </Button>

          <div className="d-flex gap-2">
            <Button
              variant="contained"
              onClick={handleSaveAllImages}
              disabled={
                savingIndex !== null ||
                (!imagesState[1]?.file && !imagesState[1]?.customUrl &&
                 !imagesState[2]?.file && !imagesState[2]?.customUrl &&
                 !imagesState[3]?.file && !imagesState[3]?.customUrl &&
                 !imagesState[1]?.isRemoved && !imagesState[2]?.isRemoved && !imagesState[3]?.isRemoved)
              }
              startIcon={savingIndex === 'all' ? <CircularProgress size={16} color="inherit" /> : <Sync />}
              sx={{
                backgroundColor: '#292536',
                color: '#fff',
                px: 3,
                fontWeight: 700,
                '&:hover': { backgroundColor: '#15131C' }
              }}
            >
              {savingIndex === 'all' ? 'Saving All to PostgreSQL...' : 'Save All 3 Images & Sync'}
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {/* VIEW PERFUME FORMULATION MODAL (Requirement 8) */}
      <Dialog
        open={viewModal.open}
        onClose={() => setViewModal({ open: false, product: null, activeImgIdx: 0 })}
        maxWidth="md"
        fullWidth
      >
        {viewModal.product && (
          <div>
            <DialogTitle sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1.5 }}>
              <div className="d-flex align-items-center gap-2">
                <Visibility sx={{ color: '#77708F' }} />
                <span>Perfume Formulation Details</span>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <Chip
                  label={`Product ID #${viewModal.product.id}`}
                  size="small"
                  sx={{ fontWeight: 600, backgroundColor: '#E2DFEB', color: '#292536' }}
                />
                <Button
                  component="a"
                  href={`/products/${viewModal.product.id}`}
                  target="_blank"
                  rel="noreferrer"
                  size="small"
                  variant="outlined"
                  endIcon={<OpenInNew sx={{ fontSize: 14 }} />}
                  sx={{ textTransform: 'none', fontSize: '0.75rem', borderColor: '#77708F', color: '#292536' }}
                >
                  View on Storefront
                </Button>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <div className="row g-4">
                {/* Left: Images Strip & Active Preview */}
                <div className="col-12 col-md-5">
                  {(() => {
                    const g = [
                      viewModal.product.image_url_1 || viewModal.product.image_url,
                      viewModal.product.image_url_2 || viewModal.product.gallery_urls?.[1],
                      viewModal.product.image_url_3 || viewModal.product.gallery_urls?.[2]
                    ].filter(Boolean);
                    const currentImg = g[viewModal.activeImgIdx] || g[0];

                    return (
                      <div>
                        <div
                          style={{
                            width: '100%',
                            height: '280px',
                            borderRadius: '10px',
                            backgroundColor: '#FFFFFF',
                            border: '1.5px solid #E2DFEB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            padding: '12px'
                          }}
                        >
                          <img
                            src={currentImg}
                            alt={viewModal.product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          {viewModal.product.is_featured && (
                            <span className="badge bg-dark text-warning position-absolute top-0 start-0 m-2">
                              Bestseller
                            </span>
                          )}
                        </div>

                        {/* Thumbnails */}
                        {g.length > 1 && (
                          <div className="d-flex gap-2 justify-content-center mt-2">
                            {g.map((imgUrl, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setViewModal((prev) => ({ ...prev, activeImgIdx: idx }))}
                                style={{
                                  width: '56px',
                                  height: '56px',
                                  borderRadius: '6px',
                                  overflow: 'hidden',
                                  border: viewModal.activeImgIdx === idx ? '2px solid #292536' : '1px solid #E2DFEB',
                                  padding: 0,
                                  backgroundColor: '#fff',
                                  cursor: 'pointer'
                                }}
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Thumb ${idx + 1}`}
                                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }}
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Right: Formulation Details */}
                <div className="col-12 col-md-7">
                  <div className="d-flex gap-2 align-items-center mb-1">
                    <span className="badge bg-light text-dark border">{viewModal.product.brand_name || 'Brand'}</span>
                    <span className="badge" style={{ backgroundColor: '#292536', color: '#fff' }}>
                      {viewModal.product.category_name || 'Category'}
                    </span>
                    <span className="badge bg-secondary">{viewModal.product.gender || 'Unisex'}</span>
                  </div>

                  <h4 className="fw-bold mb-2" style={{ color: '#292536' }}>
                    {viewModal.product.name}
                  </h4>

                  <div className="d-flex align-items-baseline gap-2 mb-3">
                    <span className="fs-4 fw-bold" style={{ color: '#292536' }}>
                      ₹{Number(viewModal.product.discount_price || viewModal.product.price).toLocaleString('en-IN')}
                    </span>
                    {viewModal.product.discount_price && (
                      <>
                        <span className="text-muted text-decoration-line-through">
                          ₹{Number(viewModal.product.price).toLocaleString('en-IN')}
                        </span>
                        <span className="badge bg-success-subtle text-success border border-success">
                          {Math.round(((viewModal.product.price - viewModal.product.discount_price) / viewModal.product.price) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <div className="row g-2 mb-3 p-2.5 rounded bg-light border" style={{ fontSize: '0.82rem' }}>
                    <div className="col-6">
                      <span className="text-muted">Bottle Volume:</span>{' '}
                      <strong>{viewModal.product.volume_ml || 50} ML</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted">Inventory Stock:</span>{' '}
                      <strong className={viewModal.product.stock <= 10 ? 'text-danger' : 'text-success'}>
                        {viewModal.product.stock} units {viewModal.product.stock <= 10 && '⚠️'}
                      </strong>
                    </div>
                    <div className="col-12">
                      <span className="text-muted">Concentration:</span>{' '}
                      <strong>{viewModal.product.concentration || 'Eau De Parfum (EDP)'}</strong>
                    </div>
                  </div>

                  {/* Notes Breakdown */}
                  <div className="mb-3">
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#77708F', letterSpacing: '0.5px' }}>
                      OLFACTORY PYRAMID
                    </Typography>
                    <div className="mt-1 d-flex flex-column gap-1" style={{ fontSize: '0.8rem' }}>
                      <div>
                        <strong>Top Notes:</strong>{' '}
                        {Array.isArray(viewModal.product.top_notes)
                          ? viewModal.product.top_notes.join(', ')
                          : viewModal.product.top_notes || '—'}
                      </div>
                      <div>
                        <strong>Heart Notes:</strong>{' '}
                        {Array.isArray(viewModal.product.heart_notes)
                          ? viewModal.product.heart_notes.join(', ')
                          : viewModal.product.heart_notes || '—'}
                      </div>
                      <div>
                        <strong>Base Notes:</strong>{' '}
                        {Array.isArray(viewModal.product.base_notes)
                          ? viewModal.product.base_notes.join(', ')
                          : viewModal.product.base_notes || '—'}
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  {viewModal.product.description && (
                    <div>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#77708F', letterSpacing: '0.5px' }}>
                        SCENT STORY
                      </Typography>
                      <p className="text-muted mb-0 mt-1" style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                        {viewModal.product.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={() => setViewModal({ open: false, product: null, activeImgIdx: 0 })}
                color="inherit"
              >
                Close
              </Button>
              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                onClick={() => {
                  const p = viewModal.product;
                  setViewModal({ open: false, product: null, activeImgIdx: 0 });
                  handleOpenImageModal(p);
                }}
                sx={{ borderColor: '#77708F', color: '#292536' }}
              >
                Manage 3 Images
              </Button>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => {
                  const p = viewModal.product;
                  setViewModal({ open: false, product: null, activeImgIdx: 0 });
                  handleOpenEdit(p);
                }}
                sx={{ backgroundColor: '#292536', color: '#fff', '&:hover': { backgroundColor: '#000' } }}
              >
                Edit Formulation
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={Boolean(deleteConfirmId)} onClose={() => setDeleteConfirmId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to permanently remove this perfume from the catalog? This action cannot be undone.
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteConfirmId(null)} color="inherit">Cancel</Button>
          <Button onClick={() => handleDelete(deleteConfirmId)} color="error" variant="contained">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={3000}
        onClose={() => setToastMessage(null)}
        message={toastMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
}
