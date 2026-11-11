import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Tooltip
} from '@mui/material';
import {
  LocalOfferOutlined,
  ContentCopyOutlined,
  CheckCircleOutline,
  Close,
  DiamondOutlined,
  CardGiftcardOutlined,
  ArrowForward,
  VerifiedOutlined
} from '@mui/icons-material';
import { couponService } from '../services/couponService';

export default function PromotionalOfferBanner({ offer }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealedCode, setRevealedCode] = useState('');
  const [couponDetails, setCouponDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!offer) return null;

  // Clean description to ensure coupon code is never leaked in text prior to reveal
  const cleanDescription = (offer.description || '').replace(
    /Use code\s+\S+\s+for/gi,
    'Unlock your exclusive coupon code below for'
  );

  // Handle GET CODE button click: dynamically fetch coupon code from database/backend
  const handleGetCode = async () => {
    if (isRevealed && revealedCode) {
      setPopupOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await couponService.getOfferCoupon(offer.id || 'active');
      if (res && res.success && res.data && res.data.code) {
        setRevealedCode(res.data.code);
        setCouponDetails(res.data);
      } else {
        // Fallback to offer code or default verified coupon
        setRevealedCode(offer.code || 'NOIR10');
      }
      setIsRevealed(true);
      setPopupOpen(true);
    } catch (err) {
      console.warn('Dynamic coupon fetch fallback:', err);
      setRevealedCode(offer.code || 'NOIR10');
      setIsRevealed(true);
      setPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy code to clipboard with cross-browser fallback & notification
  const handleCopyCode = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const codeToCopy = revealedCode || offer.code || 'NOIR10';

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = codeToCopy;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setSnackbarOpen(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Clipboard copy error:', err);
    }
  };

  // Dynamic button label: "GET CODE" -> "CODE REVEALED" or "COPIED"
  const getButtonText = () => {
    if (isLoading) return 'Unlocking...';
    if (copied) return 'COPIED';
    if (isRevealed) return 'CODE REVEALED';
    return 'GET CODE';
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#292536', color: '#fff' }}>
      <div className="container">
        <div
          className="row align-items-center g-4 p-4 p-md-5 rounded-4"
          style={{
            backgroundColor: '#1F1B2B',
            border: '1px solid rgba(184, 175, 203, 0.25)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
          }}
        >
          {/* Left Column: Offer Details & Actions */}
          <div className="col-12 col-md-7">
            <span
              className="badge px-3 py-1.5 rounded-pill mb-3"
              style={{
                backgroundColor: 'rgba(184, 175, 203, 0.2)',
                color: '#B8AFCB',
                border: '1px solid #77708F',
                fontSize: '0.75rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 700
              }}
            >
              {offer.badge || 'EXCLUSIVE PRIVILEGE'}
            </span>

            <h2 className="display-6 fw-bold mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#fff' }}>
              {offer.title}
            </h2>

            <p style={{ color: '#D3CCE2', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '540px' }} className="mb-4">
              {cleanDescription}
            </p>

            {/* Action Row: Primary Button + "GET CODE" / "CODE REVEALED" Button */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
              <Button
                variant="contained"
                component={Link}
                to={offer.link || '/products'}
                sx={{
                  backgroundColor: '#77708F',
                  color: '#fff',
                  fontWeight: 700,
                  px: 3.5,
                  py: 1.2,
                  letterSpacing: '0.5px',
                  borderRadius: '6px',
                  '&:hover': { backgroundColor: '#645D7B' }
                }}
              >
                {offer.btn_text || 'Claim Offer Now'}
              </Button>

              {/* STYLISH "GET CODE" / "CODE REVEALED" / "COPIED" BUTTON */}
              <button
                type="button"
                onClick={handleGetCode}
                disabled={isLoading}
                className={`btn-get-code-luxury d-inline-flex align-items-center gap-2 ${
                  isRevealed ? 'btn-code-revealed-state' : ''
                }`}
                title={isRevealed ? 'Click to view coupon popup' : 'Click to reveal exclusive coupon code'}
              >
                {isLoading ? (
                  <CircularProgress size={16} sx={{ color: '#E8C882' }} />
                ) : copied ? (
                  <CheckCircleOutline sx={{ fontSize: 18, color: '#4CAF50' }} />
                ) : isRevealed ? (
                  <VerifiedOutlined sx={{ fontSize: 18, color: '#E8C882' }} />
                ) : (
                  <LocalOfferOutlined sx={{ fontSize: 18, color: '#E8C882' }} />
                )}
                <span>{getButtonText()}</span>
              </button>
            </div>

            {/* INLINE REVEAL SECTION (Visible smoothly after clicking GET CODE) */}
            {isRevealed && revealedCode && (
              <div className="coupon-reveal-wrapper mt-3">
                <div className="coupon-inline-card">
                  <div className="d-flex flex-column">
                    <span style={{ fontSize: '0.68rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#E8C882', fontWeight: 700 }}>
                      EXCLUSIVE COUPON UNLOCKED
                    </span>
                    <div className="coupon-code-pill mt-1">
                      <span>{revealedCode}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className={copied ? 'btn-copied-luxury' : 'btn-copy-luxury'}
                    >
                      {copied ? '✓ COPIED' : 'COPY CODE'}
                    </button>
                    <Tooltip title="View offer details">
                      <IconButton
                        size="small"
                        onClick={() => setPopupOpen(true)}
                        sx={{ color: '#E8C882', backgroundColor: 'rgba(255,255,255,0.06)', '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)' } }}
                      >
                        <DiamondOutlined sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Promotional Image */}
          <div className="col-12 col-md-5 text-center">
            <img
              src={offer.banner_image || 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'}
              alt={offer.title}
              className="img-fluid rounded-3 shadow"
              style={{ maxHeight: '280px', width: '100%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
        </div>
      </div>

      {/* STYLISH LUXURY COUPON POPUP MODAL DIALOG */}
      <Dialog
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1E192B',
            color: '#FFFFFF',
            border: '1.5px solid rgba(232, 200, 130, 0.45)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            p: 1.5,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="d-flex align-items-center gap-2">
            <DiamondOutlined sx={{ color: '#E8C882', fontSize: 22 }} />
            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#E8C882', fontWeight: 700 }}>
              ÉLIXIR PRIVILEGE
            </span>
          </div>
          <IconButton
            aria-label="close"
            onClick={() => setPopupOpen(false)}
            sx={{ color: '#B8AFCB', '&:hover': { color: '#fff' } }}
            size="small"
          >
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center', pt: 1, pb: 3 }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(232, 200, 130, 0.12)',
              border: '1px solid rgba(232, 200, 130, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}
          >
            <CardGiftcardOutlined sx={{ color: '#E8C882', fontSize: 28 }} />
          </div>

          <h5 className="fw-bold mb-1" style={{ color: '#FFFFFF', letterSpacing: '0.3px' }}>
            Exclusive Coupon Unlocked
          </h5>
          <p style={{ color: '#B8AFCB', fontSize: '0.82rem', marginBottom: '20px' }}>
            {couponDetails?.description || 'Enjoy an additional 10% discount on artisanal master formulations at checkout.'}
          </p>

          {/* Coupon Code Reveal Card */}
          <div
            style={{
              backgroundColor: '#14111E',
              border: '2px dashed #E8C882',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#B8AFCB' }}>
              PROMO CODE
            </span>
            <span
              style={{
                fontFamily: 'SFMono-Regular, Consolas, monospace',
                fontSize: '1.6rem',
                fontWeight: 800,
                letterSpacing: '3px',
                color: '#F8E7BE',
                textShadow: '0 2px 10px rgba(232, 200, 130, 0.3)'
              }}
            >
              {revealedCode}
            </span>

            <Button
              variant="contained"
              onClick={handleCopyCode}
              startIcon={copied ? <CheckCircleOutline /> : <ContentCopyOutlined />}
              sx={{
                backgroundColor: copied ? '#2E7D32' : '#E8C882',
                color: copied ? '#FFFFFF' : '#1F1B2B',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.8px',
                px: 3.5,
                py: 1,
                borderRadius: '6px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 14px rgba(232, 200, 130, 0.25)',
                '&:hover': {
                  backgroundColor: copied ? '#2E7D32' : '#F5DDA7'
                }
              }}
            >
              {copied ? 'Code Copied!' : 'Copy Code'}
            </Button>
          </div>

          <small style={{ color: '#8E85A3', fontSize: '0.72rem', marginTop: '14px', display: 'block' }}>
            * Valid on all orders above ₹{couponDetails?.min_order_amount || 999}. One use per customer.
          </small>
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 0, justifyContent: 'center' }}>
          <Button
            component={Link}
            to={offer.link || '/products'}
            onClick={() => setPopupOpen(false)}
            endIcon={<ArrowForward />}
            sx={{
              color: '#B8AFCB',
              fontWeight: 600,
              fontSize: '0.82rem',
              '&:hover': { color: '#E8C882' }
            }}
          >
            Apply Code & Shop Formulations
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR NOTIFICATION: "Code Copied Successfully!" */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          icon={<CheckCircleOutline fontSize="inherit" />}
          sx={{
            backgroundColor: '#1E192B',
            color: '#FFFFFF',
            border: '1px solid #4CAF50',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            fontWeight: 600,
            fontSize: '0.88rem',
            alignItems: 'center',
            '& .MuiAlert-icon': {
              color: '#4CAF50'
            }
          }}
        >
          Code <strong>{revealedCode}</strong> Copied Successfully! Use it at checkout.
        </Alert>
      </Snackbar>
    </section>
  );
}

