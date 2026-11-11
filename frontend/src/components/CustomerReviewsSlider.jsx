import React, { useState, useEffect, useRef } from 'react';
import { Rating } from '@mui/material';
import {
  FormatQuote,
  ChevronLeft,
  ChevronRight,
  Verified
} from '@mui/icons-material';

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Arun Sundaram',
    location: 'Chennai, Tamil Nadu',
    fragrance: 'Oud Royale EDP',
    rating: 5,
    avatar: 'AS',
    avatarGradient: 'linear-gradient(135deg, #77708F 0%, #4A4260 100%)',
    comment: 'I was skeptical about buying an EDP online under ₹1,000, but Oud Royale genuinely blew me away. Lasted through a full 10-hour workday in humid Chennai heat without fading.',
    tag: 'Extrait Longevity'
  },
  {
    id: 2,
    name: 'Meera Nambiar',
    location: 'Kochi, Kerala',
    fragrance: 'Rouge Amber 540',
    rating: 5,
    avatar: 'MN',
    avatarGradient: 'linear-gradient(135deg, #C5A059 0%, #8E6D28 100%)',
    comment: 'Rouge Amber 540 is heavenly! The sweet saffron and amberwood projection is identical to high-end Parisian fragrances that cost 15 times more. Packing was top notch too.',
    tag: 'Parisian Elegance'
  },
  {
    id: 3,
    name: 'Vikram Singhania',
    location: 'Mumbai, Maharashtra',
    fragrance: 'Aqua Marine EDP',
    rating: 5,
    avatar: 'VS',
    avatarGradient: 'linear-gradient(135deg, #4A5B78 0%, #2A3850 100%)',
    comment: 'Aqua Marine is my everyday signature now. Clean, fresh, masculine and subtle without being overpowering in office meetings. Will definitely order the 100ml next!',
    tag: 'Signature Scent'
  },
  {
    id: 4,
    name: 'Kavita Menon',
    location: 'Bengaluru, Karnataka',
    fragrance: 'Velvet Rose & Oud',
    rating: 5,
    avatar: 'KM',
    avatarGradient: 'linear-gradient(135deg, #A85870 0%, #6E2D42 100%)',
    comment: 'Masterpiece longevity! Extremely luxurious fragrance that easily lasts 12+ hours on linen and skin. Sillage is captivating and I constantly receive compliments wherever I go.',
    tag: 'Verified Masterpiece'
  },
  {
    id: 5,
    name: 'Arjun Reddy',
    location: 'Hyderabad, Telangana',
    fragrance: 'Noir Extreme',
    rating: 5,
    avatar: 'AR',
    avatarGradient: 'linear-gradient(135deg, #3D384D 0%, #1F1B2B 100%)',
    comment: 'Unmatched scent profile. The blend of rich amber, smoky cardamom, and bergamot is exquisite. Compliments everywhere I wear it. Élixir Parfums has redefined artisanal perfumery.',
    tag: 'Artisanal Blend'
  },
  {
    id: 6,
    name: 'Ananya Deshmukh',
    location: 'Pune, Maharashtra',
    fragrance: 'French Lavender & Cardamom',
    rating: 5,
    avatar: 'AD',
    avatarGradient: 'linear-gradient(135deg, #7C6992 0%, #524268 100%)',
    comment: 'From the unboxing experience with the gold wax seal to the heavy glass flacon and micro-fine atomiser, everything screams Haute Parfumerie. Incredibly calming yet sophisticated.',
    tag: 'Haute Parfumerie'
  }
];

export default function CustomerReviewsSlider() {
  const [cardsPerView, setCardsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 992) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, REVIEWS_DATA.length - cardsPerView);

  // Keep index within valid bounds when cardsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Next & Prev handlers with smooth circular looping
  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play timer every 4.5 seconds (paused on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, maxIndex]);

  // Touch swipe support for mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchCurrentX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = touchStartX.current - touchCurrentX.current;
    const swipeThreshold = 45;
    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  // Step indicator count
  const totalSteps = maxIndex + 1;

  return (
    <div
      className="customer-reviews-slider-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slider Controls (Desktop & Mobile) */}
      <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
        <div className="d-flex align-items-center gap-2">
          <span className="reviews-count-badge">
            ★ 4.9/5 Overall Rating ({REVIEWS_DATA.length * 480}+ Verified Reviews)
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="reviews-slider-arrow"
            onClick={handlePrev}
            aria-label="Previous review"
          >
            <ChevronLeft fontSize="small" />
          </button>
          <button
            type="button"
            className="reviews-slider-arrow"
            onClick={handleNext}
            aria-label="Next review"
          >
            <ChevronRight fontSize="small" />
          </button>
        </div>
      </div>

      {/* Slider Viewport */}
      <div className="reviews-slider-viewport">
        <div
          className="reviews-slider-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="reviews-slide-item"
              style={{
                flex: `0 0 ${100 / cardsPerView}%`,
                maxWidth: `${100 / cardsPerView}%`
              }}
            >
              <div className="review-luxury-card">
                {/* Top Section: Quote Icon & Stars */}
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="review-quote-icon">
                      <FormatQuote sx={{ fontSize: 34, color: '#C5A059' }} />
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{
                          color: '#D4AF37',
                          '& .MuiRating-iconFilled': { color: '#D4AF37' }
                        }}
                      />
                      <span className="review-fragrance-tag mt-1">
                        {review.fragrance}
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="review-comment-text">
                    "{review.comment}"
                  </p>
                </div>

                {/* Bottom Section: Customer Details */}
                <div className="review-card-footer pt-3 mt-3 border-top">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="review-customer-avatar"
                      style={{ background: review.avatarGradient }}
                    >
                      {review.avatar}
                    </div>
                    <div className="flex-grow-1">
                      <div className="review-customer-name">
                        {review.name}
                      </div>
                      <div className="review-customer-location">
                        {review.location}
                      </div>
                    </div>
                    <div className="review-verified-pill">
                      <Verified sx={{ fontSize: 13, color: '#2E7D32' }} />
                      <span>Verified Buyer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="reviews-pagination-dots d-flex justify-content-center align-items-center gap-2 mt-4">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`reviews-dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

