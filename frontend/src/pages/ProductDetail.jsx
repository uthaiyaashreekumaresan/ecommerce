import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { subscribeToProductUpdates } from '../utils/productSync';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import FragrancePyramid from '../components/FragrancePyramid';
import ProductCard from '../components/ProductCard';
import {
  Typography,
  Button,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Chip,
  Box,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import {
  ExpandMore,
  ShoppingBagOutlined,
  Bolt,
  LocalShippingOutlined,
  VerifiedUserOutlined,
  CheckCircle,
  ArrowBack,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedSize, setSelectedSize] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [animatingHeart, setAnimatingHeart] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Image Hover & Tap Zoom states
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const imageBoxRef = useRef(null);

  const calculateZoomCoordinates = (clientX, clientY) => {
    if (!imageBoxRef.current) return { x: 50, y: 50 };
    const rect = imageBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    return {
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2))
    };
  };

  const handleMouseEnter = (e) => {
    const coords = calculateZoomCoordinates(e.clientX, e.clientY);
    setZoomOrigin(coords);
    setIsZoomed(true);
  };

  const handleMouseMove = (e) => {
    const coords = calculateZoomCoordinates(e.clientX, e.clientY);
    setZoomOrigin(coords);
    if (!isZoomed) setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
  };

  // Mobile / Touch devices tap-to-zoom
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      const coords = calculateZoomCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      setZoomOrigin(coords);
      setIsZoomed((prev) => !prev);
    }
  };

  const handleTouchMove = (e) => {
    if (isZoomed && e.touches && e.touches[0]) {
      const coords = calculateZoomCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      setZoomOrigin(coords);
    }
  };

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await productService.getProductById(id);
        if (res.success && res.data) {
          const p = res.data;
          setProduct(p);
          setSelectedSize(p.volume_ml || 50);
          setActiveImageIndex(0);

          // Fetch related
          const relRes = await productService.getRelated(p.id, p.category_id);
          if (relRes.success) setRelated(relRes.data);
        }
      } catch (err) {
        console.error('Error fetching perfume details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // Real-time synchronization: Update detail view when admin replaces any of the 3 perfume images
  useEffect(() => {
    const unsubscribe = subscribeToProductUpdates(({ productId, imageUrl, image_url_1, image_url_2, image_url_3, product: updatedProd }) => {
      const numId = Number(productId);
      if (Number(id) === numId) {
        setProduct((prev) => {
          if (!prev) return prev;
          const newImg1 = image_url_1 || (updatedProd && updatedProd.image_url_1) || imageUrl || prev.image_url_1 || prev.image_url;
          const newImg2 = image_url_2 || (updatedProd && updatedProd.image_url_2) || prev.image_url_2;
          const newImg3 = image_url_3 || (updatedProd && updatedProd.image_url_3) || prev.image_url_3;
          return {
            ...prev,
            ...(updatedProd || {}),
            image_url: newImg1,
            image_url_1: newImg1,
            image_url_2: newImg2,
            image_url_3: newImg3,
            gallery_urls: [newImg1, newImg2, newImg3]
          };
        });
      }
      setRelated((prev) =>
        prev.map((p) => (p.id === numId ? { ...p, image_url: imageUrl || p.image_url } : p))
      );
    });
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#77708F' }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h4>Perfume Not Found</h4>
        <p className="text-muted">The requested fragrance could not be located in our collection.</p>
        <Button variant="contained" component={Link} to="/products" sx={{ backgroundColor: '#77708F', color: '#292536' }}>
          Back to Catalog
        </Button>
      </div>
    );
  }

  // Price calculations based on selected size
  const baseDiscountPrice = product.discount_price ? Number(product.discount_price) : null;
  const basePrice = Number(product.price);

  const currentPrice = selectedSize === 100
    ? Math.round((baseDiscountPrice || basePrice) * 1.7)
    : (baseDiscountPrice || basePrice);

  const regularPrice = selectedSize === 100
    ? Math.round(basePrice * 1.7)
    : basePrice;

  const discountPercent = baseDiscountPrice
    ? Math.round(((regularPrice - currentPrice) / regularPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setToastMsg(`Added ${quantity}x ${product.name} (${selectedSize}ml) to your bag!`);
    setToastOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const handleWishlistToggle = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!product) return;
    setAnimatingHeart(true);
    const res = await toggleWishlist(product);
    setToastMsg(res.message);
    setToastOpen(true);
    setTimeout(() => setAnimatingHeart(false), 450);
  };

  // Support Minimum 1 Image up to Maximum 3 Images
  const defaultFallback = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80';
  const img1 = product?.image_url_1 || product?.image_url || product?.gallery_urls?.[0];
  const img2 = product?.image_url_2 || (product?.gallery_urls && product?.gallery_urls[1] && product?.gallery_urls[1] !== img1 ? product?.gallery_urls[1] : null);
  const img3 = product?.image_url_3 || (product?.gallery_urls && product?.gallery_urls[2] && product?.gallery_urls[2] !== img1 && product?.gallery_urls[2] !== img2 ? product?.gallery_urls[2] : null);

  const productImages = [];
  if (img1) productImages.push({ index: 0, label: 'Main Image', url: img1 });
  if (img2) productImages.push({ index: 1, label: 'Secondary Image', url: img2 });
  if (img3) productImages.push({ index: 2, label: 'Additional Image', url: img3 });

  if (productImages.length === 0) {
    productImages.push({ index: 0, label: 'Main Image', url: defaultFallback });
  }

  const activeImage = productImages.find((p) => p.index === activeImageIndex) || productImages[0];

  return (
    <div className="py-4" style={{ backgroundColor: '#F7F5FA' }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-muted">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/products" className="text-muted">Perfumes</Link></li>
            {product.category_slug && (
              <li className="breadcrumb-item">
                <Link to={`/products?category=${product.category_slug}`} className="text-muted">
                  {product.category_name}
                </Link>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        {/* Main Product Section: Gallery & Buy Box */}
        <div className="product-details-layout" style={{ overflow: 'visible', height: 'auto' }}>
          {/* LEFT: Image Section - Exactly 3 Images: 1 Large Main + 3 Thumbnails Strip Below */}
          <div className="product-details-left product-image-section">
            <div className="product-gallery product-gallery-container">
              {/* Main Image Display Box - Prominent 500px Container with Luxury Hover & Tap Zoom */}
              <div
                ref={imageBoxRef}
                className={`product-main-image-box ${isZoomed ? 'is-zoomed' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                style={{
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                  touchAction: isZoomed ? 'none' : 'pan-y'
                }}
              >
                <img
                  key={activeImage.url}
                  src={activeImage.url}
                  alt={`${product.name} - ${activeImage.label}`}
                  onError={(e) => {
                    e.target.src = defaultFallback;
                  }}
                  style={{
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
                  }}
                />

                {discountPercent > 0 && (
                  <span
                    className="badge-discount position-absolute top-0 start-0 m-3"
                    style={{ zIndex: 4, pointerEvents: 'none' }}
                  >
                    {discountPercent}% OFF
                  </span>
                )}

                {/* Wishlist Heart Button - Top Right of Main Image */}
                <button
                  type="button"
                  className={`wishlist-heart-btn ${animatingHeart ? 'heart-bounce' : ''}`}
                  onClick={handleWishlistToggle}
                  onTouchStart={(e) => e.stopPropagation()}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.16)',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                    padding: 0
                  }}
                >
                  {isWishlisted ? (
                    <Favorite sx={{ fontSize: 24, color: '#ef4444' }} />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: 24, color: '#292536' }} />
                  )}
                </button>
              </div>

              {/* All 3 Thumbnails Strip Displayed Below Main Image */}
              {productImages.length > 1 && (
                <div className="product-thumbnail-strip">
                  {productImages.map((thumb) => {
                    const isSelected = thumb.index === activeImage.index;
                    return (
                      <button
                        key={thumb.index}
                        type="button"
                        onClick={() => {
                          setIsZoomed(false);
                          setZoomOrigin({ x: 50, y: 50 });
                          setActiveImageIndex(thumb.index);
                        }}
                        className={`product-thumbnail-item ${isSelected ? 'active' : ''}`}
                        title={`Click to view ${thumb.label}`}
                        aria-label={`View ${thumb.label}`}
                      >
                        <img
                          src={thumb.url}
                          alt={`${product.name} - ${thumb.label}`}
                          onError={(e) => {
                            e.target.src = defaultFallback;
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Buy Box Details - Scrollable Content */}
          <div className="product-information product-details-right">
            {/* Brand & Concentration */}
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#77708F', fontWeight: 700 }}>
                {product.brand_name || 'Florencia Luxe'}
              </span>
              <span className="badge bg-light text-dark border" style={{ fontSize: '0.72rem' }}>
                {product.gender}
              </span>
            </div>

            {/* Title */}
            <h1 className="fw-bold mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.9rem', color: '#292536' }}>
              {product.name}
            </h1>

            {/* Rating & Concentration */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <Rating value={Number(product.rating || 4.9)} precision={0.1} readOnly size="small" sx={{ color: '#77708F' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{product.rating || 4.9}</span>
              <span style={{ fontSize: '0.78rem', color: '#777' }}>({product.review_count || 142} verified reviews)</span>
              <span className="mx-1 text-muted">•</span>
              <span style={{ fontSize: '0.78rem', color: '#555', fontWeight: 500 }}>
                {product.concentration || 'Eau De Parfum (EDP)'}
              </span>
            </div>

            {/* Price Box */}
            <div className="p-3 bg-white rounded border mb-4" style={{ borderColor: '#E2DFEB' }}>
              <div className="d-flex align-items-baseline gap-3 mb-1">
                <span className="fw-bold" style={{ fontSize: '1.8rem', color: '#292536' }}>
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {regularPrice > currentPrice && (
                  <span className="text-muted text-decoration-line-through" style={{ fontSize: '1.1rem' }}>
                    ₹{regularPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="badge bg-success" style={{ fontSize: '0.75rem' }}>
                    Save ₹{(regularPrice - currentPrice).toLocaleString('en-IN')} ({discountPercent}% OFF)
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#777' }}>
                Inclusive of all taxes. Free express shipping across India.
              </div>
            </div>

            {/* Short Description */}
            <p style={{ fontSize: '0.92rem', color: '#444', lineHeight: 1.7 }} className="mb-4">
              {product.short_description || product.description}
            </p>

            {/* Bottle Size Selector */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>CHOOSE BOTTLE SIZE:</strong>
                <span style={{ fontSize: '0.78rem', color: '#777' }}>Amber Glass Spray Flacon</span>
              </div>
              <div className="d-flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSize(50)}
                  className={`btn p-2 px-3 text-start border ${selectedSize === 50 ? 'border-dark bg-white shadow-sm' : 'bg-light'}`}
                  style={{
                    borderRadius: '6px',
                    borderColor: selectedSize === 50 ? '#292536' : '#ddd',
                    borderWidth: selectedSize === 50 ? '2px' : '1px'
                  }}
                >
                  <div className="fw-bold" style={{ fontSize: '0.9rem' }}>50 ML (Standard)</div>
                  <div style={{ fontSize: '0.78rem', color: '#666' }}>
                    ₹{(baseDiscountPrice || basePrice).toLocaleString('en-IN')}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSize(100)}
                  className={`btn p-2 px-3 text-start border ${selectedSize === 100 ? 'border-dark bg-white shadow-sm' : 'bg-light'}`}
                  style={{
                    borderRadius: '6px',
                    borderColor: selectedSize === 100 ? '#292536' : '#ddd',
                    borderWidth: selectedSize === 100 ? '2px' : '1px'
                  }}
                >
                  <div className="fw-bold" style={{ fontSize: '0.9rem' }}>100 ML (Luxe Size)</div>
                  <div style={{ fontSize: '0.78rem', color: '#666' }}>
                    ₹{Math.round((baseDiscountPrice || basePrice) * 1.7).toLocaleString('en-IN')} <span className="text-success fw-bold">(Value Pack)</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Stock Status & Quantity */}
            <div className="d-flex align-items-center gap-4 mb-4">
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>QUANTITY:</strong>
                <div className="d-flex align-items-center border rounded bg-white" style={{ borderColor: '#ccc' }}>
                  <button
                    type="button"
                    className="btn btn-sm px-2.5 py-1"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-3 fw-bold" style={{ fontSize: '0.9rem' }}>{quantity}</span>
                  <button
                    type="button"
                    className="btn btn-sm px-2.5 py-1"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>AVAILABILITY:</strong>
                {product.stock > 0 ? (
                  <span className="badge bg-success-subtle text-success border border-success px-2 py-1.5" style={{ fontSize: '0.75rem' }}>
                    ● In Stock ({product.stock} units ready to dispatch)
                  </span>
                ) : (
                  <span className="badge bg-danger-subtle text-danger border border-danger px-2 py-1.5" style={{ fontSize: '0.75rem' }}>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingBagOutlined />}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                sx={{
                  flex: 1,
                  py: 1.5,
                  backgroundColor: '#292536',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  '&:hover': { backgroundColor: '#000000' }
                }}
              >
                Add To Bag
              </Button>

              <Button
                variant="contained"
                size="large"
                startIcon={<Bolt />}
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                sx={{
                  flex: 1,
                  py: 1.5,
                  backgroundColor: '#77708F',
                  color: '#292536',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  '&:hover': { backgroundColor: '#645D7B' }
                }}
              >
                Buy Now
              </Button>
            </div>

            {/* Assurances */}
            <div className="p-3 bg-white rounded border mb-4" style={{ borderColor: '#E2DFEB' }}>
              <div className="row g-2 text-muted" style={{ fontSize: '0.8rem' }}>
                <div className="col-6 d-flex align-items-center gap-2">
                  <LocalShippingOutlined sx={{ color: '#77708F', fontSize: 18 }} />
                  <span>Dispatched in 24–48 Hours</span>
                </div>
                <div className="col-6 d-flex align-items-center gap-2">
                  <VerifiedUserOutlined sx={{ color: '#77708F', fontSize: 18 }} />
                  <span>100% IFRA Compliant Oils</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div>
              <Accordion defaultExpanded sx={{ mb: 1, boxShadow: 'none', border: '1px solid #E2DFEB' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.88rem' }}>Detailed Fragrance Notes & Pyramid</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FragrancePyramid
                    topNotes={product.top_notes}
                    heartNotes={product.heart_notes}
                    baseNotes={product.base_notes}
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 1, boxShadow: 'none', border: '1px solid #E2DFEB' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.88rem' }}>Scent Description & Inspiration</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
                    {product.description}
                  </p>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 1, boxShadow: 'none', border: '1px solid #E2DFEB' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.88rem' }}>How To Apply for 12+ Hour Wear</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
                    1. Spray directly onto pulse points where natural body heat radiates: base of the neck, inner wrists, and behind the ears.<br />
                    2. Spray from a distance of 6 to 8 inches.<br />
                    3. Do not rub your wrists together after spraying, as this breaks down the top notes before they can blossom.<br />
                    4. For enhanced projection, apply a small dab of unscented moisturizer or petroleum jelly prior to spraying.
                  </p>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 1, boxShadow: 'none', border: '1px solid #E2DFEB' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.88rem' }}>IFRA Safety & Transit Guarantee</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, margin: 0 }}>
                    Formulated adhering to International Fragrance Association (IFRA) 51st Amendment guidelines. Contains pure organic perfumer's grain alcohol, imported essence oils, and fixing resinoids. Free of toxic phthalates and parabens. If damaged in transit, we dispatch an immediate replacement within 24 hours.
                  </p>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>

        {/* RELATED PERFUMES */}
        {related.length > 0 && (
          <div className="mt-5 pt-5 border-top">
            <div className="text-center mb-4">
              <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#77708F', fontWeight: 600 }}>
                Olfactory Harmonies
              </span>
              <h3 className="fw-bold mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                You May Also Love
              </h3>
            </div>
            <div className="category-products-grid">
              {related.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%', backgroundColor: '#292536', color: '#ffffff' }}>
          {toastMsg || `Added ${quantity}x ${product.name} (${selectedSize}ml) to your bag!`}
        </Alert>
      </Snackbar>
    </div>
  );
}
