import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert } from '@mui/material';
import { DiamondOutlined, CheckCircleOutline } from '@mui/icons-material';

// Configurable social media URLs - replace with your actual profile links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/elixirparfums',
  facebook: 'https://www.facebook.com/elixirparfums',
  pinterest: 'https://www.pinterest.com/elixirparfums',
  youtube: 'https://www.youtube.com/@elixirparfums'
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ backgroundColor: '#292536', color: '#B8AFCB', paddingTop: '64px', paddingBottom: '32px' }} className="mt-5 border-top border-secondary">
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand Info */}
          <div className="col-12 col-md-4">
            <div className="mb-3">
              <Link to="/" className="text-decoration-none d-inline-block bg-white px-2 py-1 rounded-2 shadow-sm">
                <img
                  src="/images/elixir-parfums-logo.jpg"
                  alt="Élixir Parfums - Haute Parfumerie"
                  style={{
                    height: '38px',
                    width: 'auto',
                    maxWidth: '170px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </Link>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#C0C0C0', lineHeight: 1.7 }}>
              Crafted in the tradition of French Haute Parfumerie. We formulate luxurious, long-lasting Eau de Parfums using imported IFRA-certified fragrance oils at honest price points.
            </p>
            <div className="d-flex gap-3 text-secondary mt-3" style={{ fontSize: '0.8rem', color: '#B8AFCB' }}>
              <span>✓ IFRA Certified</span>
              <span>✓ Cruelty-Free</span>
              <span>✓ 12+ Hour Wear</span>
            </div>
          </div>

          {/* Scent Categories */}
          <div className="col-6 col-md-2">
            <h6 className="text-white text-uppercase mb-3" style={{ letterSpacing: '1.5px', fontSize: '0.8rem', fontWeight: 600 }}>
              Perfume Collections
            </h6>
            <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
              <li className="mb-2"><Link to="/products?category=mens-perfumes" style={{ color: '#B8AFCB' }}>Men's Perfumes</Link></li>
              <li className="mb-2"><Link to="/products?category=womens-perfumes" style={{ color: '#B8AFCB' }}>Women's Perfumes</Link></li>
              <li className="mb-2"><Link to="/products?category=unisex-perfumes" style={{ color: '#B8AFCB' }}>Unisex Perfumes</Link></li>
              <li className="mb-2"><Link to="/products?category=luxury-perfumes" style={{ color: '#B8AFCB' }}>Luxury Perfumes</Link></li>
              <li className="mb-2"><Link to="/products?category=arabic-perfumes" style={{ color: '#B8AFCB' }}>Arabic Perfumes</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="col-6 col-md-2">
            <h6 className="text-white text-uppercase mb-3" style={{ letterSpacing: '1.5px', fontSize: '0.8rem', fontWeight: 600 }}>
              Customer Care
            </h6>
            <ul className="list-unstyled" style={{ fontSize: '0.85rem' }}>
              <li className="mb-2"><Link to="/orders" style={{ color: '#B8AFCB' }}>Track Your Order</Link></li>
              <li className="mb-2"><Link to="/products" style={{ color: '#B8AFCB' }}>Fragrance Finder</Link></li>
              <li className="mb-2"><Link to="/cart" style={{ color: '#B8AFCB' }}>Shopping Bag</Link></li>
              <li className="mb-2"><span style={{ color: '#B8AFCB' }}>Shipping Policy (48h dispatch)</span></li>
              <li className="mb-2"><span style={{ color: '#B8AFCB' }}>7-Day Transit Replacement</span></li>
              <li className="mb-2"><Link to="/wishlist" style={{ color: '#B8AFCB' }}>Saved Fragrances</Link></li>
            </ul>
          </div>

          {/* Newsletter / Scent Club */}
          <div className="col-12 col-md-4">
            <h6 className="text-white text-uppercase mb-3" style={{ letterSpacing: '1.5px', fontSize: '0.8rem', fontWeight: 600 }}>
              Join The Élixir Circle
            </h6>
            <p style={{ fontSize: '0.85rem', color: '#C0C0C0' }}>
              Subscribe to receive exclusive access to private drops, olfactory guides, and ₹150 off your first artisanal bottle.
            </p>
            {subscribed ? (
              <Alert severity="success" icon={<CheckCircleOutline fontSize="inherit" />} sx={{ backgroundColor: '#3D384D', color: '#B8AFCB', py: 0.5 }}>
                Thank you! Use promo code <strong>NOIR10</strong> at checkout for 10% off.
              </Alert>
            ) : (
              <form onSubmit={handleSubscribe} className="d-flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control footer-newsletter-input"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF'
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#77708F',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    letterSpacing: '0.4px',
                    px: 2.5,
                    whiteSpace: 'nowrap',
                    borderRadius: '4px',
                    boxShadow: 'none',
                    '&:hover': { backgroundColor: '#645D7B' }
                  }}
                >
                  Join
                </Button>
              </form>
            )}
            <small style={{ color: '#8E85A3', fontSize: '0.75rem', marginTop: '8px', display: 'block' }}>
              We respect your privacy. No spam, unsub anytime.
            </small>

            {/* Social Media - Follow Us */}
            <div className="mt-4 pt-1">
              <span
                className="text-white text-uppercase d-block mb-2"
                style={{ letterSpacing: '1.5px', fontSize: '0.78rem', fontWeight: 600 }}
              >
                Follow Us
              </span>
              <div className="d-flex align-items-center gap-2">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Élixir Parfums on Instagram"
                  className="footer-social-btn footer-social-instagram"
                  title="Follow us on Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Élixir Parfums on Facebook"
                  className="footer-social-btn footer-social-facebook"
                  title="Follow us on Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href={SOCIAL_LINKS.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Élixir Parfums on Pinterest"
                  className="footer-social-btn footer-social-pinterest"
                  title="Follow us on Pinterest"
                >
                  <i className="bi bi-pinterest"></i>
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Élixir Parfums on YouTube"
                  className="footer-social-btn footer-social-youtube"
                  title="Follow us on YouTube"
                >
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-4 border-top" style={{ borderColor: '#3D384D', fontSize: '0.78rem', color: '#8E85A3' }}>
          <div>
            © {new Date().getFullYear()} ÉLIXIR PARFUMS India Private Limited. All rights reserved.
          </div>
          <div className="d-flex gap-3 mt-2 mt-md-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>IFRA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
