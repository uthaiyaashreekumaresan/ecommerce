import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import {
  Typography,
  Button,
  IconButton,
  Chip,
  Box,
  Snackbar,
  Alert,
  Rating
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  DeleteOutline,
  ShoppingBagOutlined,
  ArrowForward,
  CheckCircleOutline
} from '@mui/icons-material';
import { getVolumeDisplay } from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleAddToCart = (product) => {
    addToCart(product, product.volume_ml || 50, 1);
    showToast(`Added ${product.name} to your shopping bag!`);
  };

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
    showToast(`Removed ${product.name} from wishlist.`, 'info');
  };

  return (
    <div className="py-4 py-md-5" style={{ backgroundColor: '#F7F5FA', minHeight: '75vh' }}>
      <div className="container-fluid px-3 px-md-4 px-xl-5" style={{ maxWidth: '1720px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: '#77708F', fontWeight: 600 }}>
              My Wishlist
            </li>
          </ol>
        </nav>

        {/* Page Title & Actions Header */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-3 border-bottom" style={{ borderColor: '#ECE9F1' }}>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h2 className="fw-bold mb-0" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
                My Wishlist
              </h2>
              <Chip
                label={`${wishlist.length} ${wishlist.length === 1 ? 'Item' : 'Items'}`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(119, 112, 143, 0.15)',
                  color: '#77708F',
                  fontWeight: 700,
                  fontSize: '0.75rem'
                }}
              />
            </div>
            <p className="text-muted small mb-0 mt-1">
              Your personal curation of coveted French artisanal fragrances.
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="d-flex gap-2">
              <Button
                variant="outlined"
                size="small"
                color="inherit"
                onClick={clearWishlist}
                sx={{
                  borderColor: '#D6CFE2',
                  color: '#666',
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  borderRadius: '20px',
                  '&:hover': { borderColor: '#dc2626', color: '#dc2626' }
                }}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3 border p-5 text-center my-4" style={{ borderColor: '#E2DFEB' }}>
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                backgroundColor: '#FAF9FC',
                border: '2px dashed #B8AFCB'
              }}
            >
              <FavoriteBorder sx={{ fontSize: 36, color: '#77708F' }} />
            </div>
            <h4 className="fw-bold mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
              Your Wishlist Is Empty
            </h4>
            <p className="text-muted mx-auto mb-4" style={{ maxWidth: '420px', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Explore our Haute Parfumerie collection of artisanal French extraits and tap the heart icon on any perfume you desire to save it here.
            </p>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: '#77708F',
                color: '#ffffff',
                fontWeight: 700,
                borderRadius: '30px',
                px: 4,
                py: 1.2,
                '&:hover': { backgroundColor: '#645D7B' }
              }}
            >
              Explore Fragrances
            </Button>
          </div>
        ) : (
          /* Wishlist Items Grid (4 Cards Per Row on Desktop) */
          <div className="category-products-grid">
            {wishlist.map((product) => {
              const price = Number(product.price);
              const discountPrice = product.discount_price ? Number(product.discount_price) : null;
              const currentPrice = discountPrice || price;
              const discountPercent = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

              return (
                <div key={product.id} className="perfume-card h-100 position-relative">
                  {/* Image Area with Delete Button */}
                  <div className="image-wrapper position-relative" style={{ width: '100%', overflow: 'hidden', margin: 0, padding: 0 }}>
                    <Link to={`/products/${product.id}`} className="d-block w-100 h-100" style={{ margin: 0, padding: 0 }}>
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
                    </Link>

                    {/* Remove Button in Top Right */}
                    <button
                      type="button"
                      className="wishlist-heart-btn"
                      onClick={() => handleRemove(product)}
                      title="Remove from wishlist"
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.14)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5,
                        padding: 0
                      }}
                    >
                      <Favorite sx={{ fontSize: 20, color: '#ef4444' }} />
                    </button>

                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge-discount">{discountPercent}% OFF</span>
                      </div>
                    )}
                  </div>

                  {/* Details Body */}
                  <div className="p-3 d-flex flex-column flex-grow-1">
                    {/* Brand & Volume ML Tag directly BELOW image, ABOVE product name */}
                    <div className="d-flex justify-content-between align-items-center mb-1.5">
                      <div className="d-flex align-items-center gap-1.5 overflow-hidden me-2">
                        <span style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#77708F', fontWeight: 700 }} className="text-truncate">
                          {product.brand_name || 'ÉLIXIR PARFUMS'}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: '#B8AFCB' }}>•</span>
                        <span style={{ fontSize: '0.7rem', color: '#77708F', whiteSpace: 'nowrap' }}>
                          {product.gender || 'Unisex'}
                        </span>
                      </div>

                      {/* Perfume Volume ML Badge outside the image container */}
                      <span className="perfume-volume-pill flex-shrink-0" title={`Volume: ${getVolumeDisplay(product)}`}>
                        {getVolumeDisplay(product)}
                      </span>
                    </div>

                    <Link to={`/products/${product.id}`} className="text-decoration-none" style={{ color: '#292536' }}>
                      <h6 className="mb-1 text-truncate fw-semibold" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.98rem', lineHeight: 1.35 }} title={product.name}>
                        {product.name}
                      </h6>
                    </Link>

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
                        ({product.rating || 4.8})
                      </span>
                    </div>

                    {/* Price & Action */}
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
                        variant="contained"
                        startIcon={<ShoppingBagOutlined sx={{ fontSize: 16 }} />}
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock <= 0}
                        sx={{
                          backgroundColor: '#292536',
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: '0.78rem',
                          textTransform: 'none',
                          py: 0.6,
                          px: 1.8,
                          borderRadius: '20px',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: '#77708F',
                            transform: 'scale(1.03)'
                          }
                        }}
                      >
                        Add To Bag
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={2400}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={toast.severity}
          sx={{
            width: '100%',
            backgroundColor: '#292536',
            color: '#ffffff',
            '& .MuiAlert-icon': { color: '#77708F' }
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

