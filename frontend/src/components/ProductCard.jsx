import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Rating, Button, Snackbar, Alert } from '@mui/material';
import { ShoppingBagOutlined, Check, Favorite, FavoriteBorder } from '@mui/icons-material';

export const getVolumeDisplay = (product) => {
  if (!product) return '50ml';

  const parseMl = (val) => {
    if (typeof val === 'number') return val > 0 ? val : null;
    if (typeof val === 'string') {
      const match = val.match(/\d+/);
      return match ? parseInt(match[0], 10) : null;
    }
    return null;
  };

  // 1. Check variants array
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    const sizes = [
      ...new Set(
        product.variants
          .map((v) => parseMl(v.size_ml || v.volume_ml || v))
          .filter((s) => s && s > 0)
      )
    ].sort((a, b) => a - b);

    if (sizes.length === 1) return `${sizes[0]}ml`;
    if (sizes.length === 2) return `${sizes[0]}ml / ${sizes[1]}ml`;
    if (sizes.length > 2) return `${sizes[0]}ml - ${sizes[sizes.length - 1]}ml`;
  }

  // 2. Check available_sizes or sizes array
  const sizeArr = product.available_sizes || product.sizes;
  if (Array.isArray(sizeArr) && sizeArr.length > 0) {
    const sizes = [
      ...new Set(
        sizeArr
          .map((s) => parseMl(typeof s === 'object' ? s.size_ml || s.volume_ml : s))
          .filter((s) => s && s > 0)
      )
    ].sort((a, b) => a - b);

    if (sizes.length === 1) return `${sizes[0]}ml`;
    if (sizes.length === 2) return `${sizes[0]}ml / ${sizes[1]}ml`;
    if (sizes.length > 2) return `${sizes[0]}ml - ${sizes[sizes.length - 1]}ml`;
  }

  // 3. Fallback to product.volume_ml or size_ml
  const vol = parseMl(product.volume_ml) || parseMl(product.size_ml) || 50;
  return `${vol}ml`;
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const [animatingHeart, setAnimatingHeart] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const isWishlisted = isInWishlist(product.id);
  const volumeDisplay = getVolumeDisplay(product);

  const price = Number(product.price);
  const discountPrice = product.discount_price ? Number(product.discount_price) : null;
  const currentPrice = discountPrice || price;
  const discountPercent = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

  const notesSnippet = [
    ...(product.top_notes || []).slice(0, 1),
    ...(product.heart_notes || []).slice(0, 1),
    ...(product.base_notes || []).slice(0, 1)
  ].join(' • ');

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.volume_ml || 50, 1);
    setAdded(true);
    setToast({ open: true, message: `Added ${product.name} to your bag!`, severity: 'success' });
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimatingHeart(true);
    const res = await toggleWishlist(product);
    setToast({
      open: true,
      message: res.message || (res.added ? `Added ${product.name} to wishlist` : `Removed ${product.name} from wishlist`),
      severity: res.added ? 'success' : 'info'
    });
    setTimeout(() => setAnimatingHeart(false), 450);
  };

  return (
    <div className="perfume-card w-100 h-100">
      <Link to={`/products/${product.id}`} className="text-decoration-none d-flex flex-column h-100" style={{ color: '#292536' }}>
        {/* Image Container with Badges & Wishlist Heart */}
        <div className="image-wrapper position-relative" style={{ width: '100%', overflow: 'hidden', margin: 0, padding: 0 }}>
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              margin: 0,
              padding: 0
            }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80';
            }}
          />

          {/* Top-Right: Wishlist Heart Icon inside circular white container */}
          <button
            type="button"
            className={`wishlist-heart-btn ${animatingHeart ? 'heart-bounce' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
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
              <Favorite sx={{ fontSize: 20, color: '#ef4444' }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: 20, color: '#292536' }} />
            )}
          </button>

          {/* Floating Badges */}
          <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
            {discountPercent > 0 && (
              <span className="badge-discount">{discountPercent}% OFF</span>
            )}
            {product.is_featured && (
              <span className="badge-luxury">Bestseller</span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-3 d-flex flex-column flex-grow-1">
          {/* Brand & Volume ML Tag directly BELOW product image, ABOVE product name */}
          <div className="d-flex justify-content-between align-items-center mb-1.5">
            <div className="d-flex align-items-center gap-1.5 overflow-hidden me-2">
              <span
                className="text-truncate"
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#77708F',
                  fontWeight: 700
                }}
              >
                {product.brand_name || 'ÉLIXIR PARFUMS'}
              </span>
              <span style={{ fontSize: '0.65rem', color: '#B8AFCB' }}>•</span>
              <span style={{ fontSize: '0.7rem', color: '#77708F', whiteSpace: 'nowrap' }}>
                {product.gender || 'Unisex'}
              </span>
            </div>

            {/* Perfume Volume ML Badge outside the image container */}
            <span
              className="perfume-volume-pill flex-shrink-0"
              title={`Volume: ${volumeDisplay}`}
            >
              {volumeDisplay}
            </span>
          </div>

          {/* Title - Product Name: Inter Medium (500–600) */}
          <h6
            className="mb-1 text-truncate"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.98rem', color: '#292536', lineHeight: 1.35 }}
            title={product.name}
          >
            {product.name}
          </h6>

          {/* Scent notes summary: Inter Regular (400) */}
          <p
            className="mb-2 text-truncate"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '0.78rem', color: '#5f5773' }}
            title={notesSnippet}
          >
            {notesSnippet || 'Precious Woody & Amber accords'}
          </p>

          {/* Rating */}
          <div className="d-flex align-items-center gap-1.5 mb-2">
            <Rating
              value={Number(product.rating || 4.8)}
              precision={0.1}
              size="small"
              readOnly
              sx={{ color: '#77708F', fontSize: '0.9rem' }}
            />
            <span style={{ fontSize: '0.75rem', color: '#77708F', fontWeight: 500 }}>
              ({product.review_count || 120})
            </span>
          </div>

          {/* Price & Add to Cart button */}
          <div className="mt-auto pt-2.5 border-top d-flex justify-content-between align-items-center" style={{ borderColor: '#E2DFEB' }}>
            <div className="d-flex align-items-baseline">
              <span className="fw-bold" style={{ fontSize: '1.08rem', color: '#292536' }}>
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {discountPrice && (
                <span className="ms-2 text-muted text-decoration-line-through" style={{ fontSize: '0.8rem' }}>
                  ₹{price.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <Button
              size="small"
              variant={added ? 'contained' : 'outlined'}
              onClick={handleQuickAdd}
              disabled={product.stock <= 0}
              sx={{
                minWidth: 'auto',
                px: 2,
                py: 0.6,
                fontSize: '0.78rem',
                borderRadius: '20px',
                borderColor: '#77708F',
                color: added ? '#fff' : '#292536',
                backgroundColor: added ? '#77708F' : 'transparent',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#77708F',
                  color: '#ffffff',
                  borderColor: '#77708F',
                  transform: 'scale(1.03)'
                }
              }}
            >
              {product.stock <= 0 ? (
                'Sold Out'
              ) : added ? (
                <Check fontSize="small" />
              ) : (
                <>
                  <ShoppingBagOutlined sx={{ fontSize: 16, mr: 0.5 }} />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </Link>

      <Snackbar
        open={toast.open}
        autoHideDuration={2200}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={toast.severity}
          sx={{
            width: '100%',
            backgroundColor: '#292536',
            color: '#ffffff',
            '& .MuiAlert-icon': { color: toast.severity === 'info' ? '#ef4444' : '#77708F' }
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
