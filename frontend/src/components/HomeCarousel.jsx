import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, ArrowForward, LocalOfferOutlined } from '@mui/icons-material';

const defaultSlides = [
  {
    id: 1,
    tag: "HAUTE PARFUMERIE • EXCLUSIVE COLLECTION",
    offer_badge: "30% OFF",
    title: "Discover Your Signature Scent",
    subtitle: "Immerse yourself in artisanal French master perfumery. Handcrafted with precious floral and rare woody essences to create a captivating, long-lasting luxury aura.",
    primary_btn_text: "Shop Now",
    primary_btn_link: "/products",
    secondary_btn_text: "Explore Collections",
    secondary_btn_link: "/products?sort=rating",
    image_url: "/uploads/perfume-1793512240544-960322898.jpg",
    bg_gradient: "linear-gradient(135deg, #F5F3F8 0%, #E9E5F2 50%, #DDD8E8 100%)",
    accent_color: "#292536",
    alt: "Luxury Haute Parfumerie Perfume Collection"
  },
  {
    id: 2,
    tag: "WOMEN'S COUTURE COLLECTION",
    offer_badge: "25% OFF",
    title: "Elegance in Every Drop.",
    subtitle: "Delicate bouquets of French Grasse rose, nocturnal jasmine, and velvet white musk crafted for timeless poise and grace.",
    primary_btn_text: "Explore Women's Collection",
    primary_btn_link: "/products?gender=Women",
    secondary_btn_text: "Floral Blends",
    secondary_btn_link: "/products?gender=Women&sort=rating",
    image_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=85",
    bg_gradient: "linear-gradient(135deg, #FAF3F6 0%, #F6E6ED 50%, #EED5E0 100%)",
    accent_color: "#9C3A63",
    alt: "Women's Elegant Floral Perfume"
  },
  {
    id: 3,
    tag: "GENDERLESS NICHE EDITIONS",
    offer_badge: "BUY 1 GET 1 OFFER",
    title: "Fragrance Without Limits.",
    subtitle: "Boundary-defying unisex creations uniting crisp ocean breezes, sparkling bergamot zest, and rich Madagascar vanilla.",
    primary_btn_text: "Explore Unisex Collection",
    primary_btn_link: "/products?gender=Unisex",
    secondary_btn_text: "View All Fragrances",
    secondary_btn_link: "/products?gender=Unisex&sort=newest",
    image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85",
    bg_gradient: "linear-gradient(135deg, #F1F6F4 0%, #E2ECE8 50%, #D1DFDB 100%)",
    accent_color: "#2E6656",
    alt: "Modern Unisex Niche Perfume Bottle"
  },
  {
    id: 4,
    tag: "HAUTE LUXURY RESERVE",
    offer_badge: "UP TO 40% OFF",
    title: "Experience Luxury Fragrances.",
    subtitle: "Precious aged Cambodian agarwood, crystal ambergris, and rare royal saffron formulations with 14+ hour sillage.",
    primary_btn_text: "Shop Luxury Collection",
    primary_btn_link: "/products?category=woody-earthy",
    secondary_btn_text: "Explore Oud Blends",
    secondary_btn_link: "/products?sort=rating",
    image_url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85",
    bg_gradient: "linear-gradient(135deg, #F9F5EC 0%, #F2E9D4 50%, #E7D8B6 100%)",
    accent_color: "#9A7322",
    alt: "Imperial Royal Oud Flacon"
  }
];

export default function HomeCarousel({ dynamicSlides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Normalize dynamic slides, fallback to default 4 slides if empty
  const rawSlides = (dynamicSlides && dynamicSlides.length > 0)
    ? dynamicSlides
    : defaultSlides;

  const slides = rawSlides.map((s, idx) => {
    const fallback = defaultSlides[idx % defaultSlides.length];
    return {
      id: s.id || idx + 1,
      tag: s.tag || fallback.tag,
      offerBadge: s.offer_badge || s.offerBadge || fallback.offer_badge,
      title: s.title || fallback.title,
      subtitle: s.subtitle || fallback.subtitle,
      primaryText: s.primary_btn_text || (s.primaryBtn && s.primaryBtn.text) || fallback.primary_btn_text,
      primaryLink: s.primary_btn_link || (s.primaryBtn && s.primaryBtn.link) || fallback.primary_btn_link,
      secondaryText: s.secondary_btn_text || (s.secondaryBtn && s.secondaryBtn.text) || fallback.secondary_btn_text,
      secondaryLink: s.secondary_btn_link || (s.secondaryBtn && s.secondaryBtn.link) || fallback.secondary_btn_link,
      image: s.image_url || s.image || fallback.image_url,
      alt: s.alt || s.title || fallback.alt,
      bgGradient: s.bg_gradient || fallback.bg_gradient,
      accentColor: s.accent_color || fallback.accent_color
    };
  });

  const slideCount = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Automatic slide rotation every 3.5 seconds, paused when hovered
  useEffect(() => {
    if (isHovered || slideCount <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovered, currentSlide, slideCount]);

  if (slideCount === 0) return null;

  return (
    <div
      className="hero-reversed-slider-wrapper position-relative overflow-hidden w-100"
      style={{
        backgroundColor: '#F7F5FA',
        borderBottom: '1px solid #ECE7F3',
        userSelect: 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Home Page Hero Slider"
    >
      <style>{`
        /* 2-Column Layout: Left (45% Content) | Right (55% Image) */
        @media (min-width: 768px) {
          .hero-split-content {
            flex: 0 0 45% !important;
            max-width: 45% !important;
            width: 45% !important;
          }
          .hero-split-image {
            flex: 0 0 55% !important;
            max-width: 55% !important;
            width: 55% !important;
          }
          .hero-slider-height {
            min-height: 520px;
            height: clamp(500px, 66vh, 620px);
          }
        }
        @media (max-width: 767.98px) {
          .hero-split-content {
            flex: 0 0 100% !important;
            max-width: 100% !important;
            width: 100% !important;
            padding-bottom: 1.5rem !important;
          }
          .hero-split-image {
            flex: 0 0 100% !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .hero-slider-height {
            min-height: auto;
            height: auto;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
        }

        /* Subtle Fade-in Animation for Active Text Content */
        .hero-fade-enter {
          animation: heroFadeInUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroFadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Sliding Track */}
      <div
        className="d-flex w-100"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id || index}
              className="position-relative w-100 flex-shrink-0 d-flex align-items-center"
              style={{
                width: '100%',
                flex: '0 0 100%',
                background: slide.bgGradient || 'linear-gradient(135deg, #F7F5FA 0%, #ECE7F3 100%)',
                transition: 'background 0.5s ease'
              }}
            >
              <div className="container hero-slider-height d-flex align-items-center py-4 py-md-0">
                <div className="row w-100 align-items-center m-0">
                  {/* ======================================================== */}
                  {/* LEFT SIDE: 45% WIDTH → PROMINENT OFFER + HEADING + DESC + CTA */}
                  {/* ======================================================== */}
                  <div className={`hero-split-content d-flex flex-column justify-content-center pe-md-4 pe-lg-5 ${isActive ? 'hero-fade-enter' : ''}`}>
                    {/* Top Badges Row: Prominent Offer Badge + Category Tag */}
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                      {slide.offerBadge && (
                        <div
                          className="d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill shadow-sm"
                          style={{
                            backgroundColor: slide.accentColor || '#292536',
                            color: '#FFFFFF',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            letterSpacing: '0.6px',
                            textTransform: 'uppercase',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.14)'
                          }}
                        >
                          <LocalOfferOutlined sx={{ fontSize: 16 }} />
                          <span>{slide.offerBadge}</span>
                        </div>
                      )}

                      {slide.tag && (
                        <div
                          className="d-inline-flex align-items-center px-3 py-1 rounded-pill"
                          style={{
                            backgroundColor: 'rgba(41, 37, 54, 0.08)',
                            border: '1px solid rgba(41, 37, 54, 0.15)',
                            fontSize: '0.74rem',
                            letterSpacing: '1.6px',
                            textTransform: 'uppercase',
                            color: '#292536',
                            fontWeight: 700
                          }}
                        >
                          {slide.tag}
                        </div>
                      )}
                    </div>

                    {/* Main Heading */}
                    <h1
                      className="fw-bold mb-3"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        color: '#292536',
                        fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                        lineHeight: 1.2,
                        letterSpacing: '-0.3px'
                      }}
                    >
                      {slide.title}
                    </h1>

                    {/* Short Description or Subtitle */}
                    {slide.subtitle && (
                      <p
                        className="mb-4"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          color: '#494459',
                          fontSize: 'clamp(0.92rem, 1.25vw, 1.05rem)',
                          lineHeight: 1.7,
                          maxWidth: '520px'
                        }}
                      >
                        {slide.subtitle}
                      </p>
                    )}

                    {/* Attractive CTA Button: Shop Now */}
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      {slide.primaryText && (
                        <Link
                          to={slide.primaryLink || '/products'}
                          className="btn d-inline-flex align-items-center gap-2 text-white shadow"
                          style={{
                            backgroundColor: slide.accentColor || '#292536',
                            borderColor: slide.accentColor || '#292536',
                            borderRadius: '30px',
                            fontWeight: 700,
                            padding: '12px 34px',
                            fontSize: '0.92rem',
                            letterSpacing: '0.5px',
                            transition: 'all 0.25s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter = 'brightness(0.9)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          {slide.primaryText}
                          <ArrowForward sx={{ fontSize: 18 }} />
                        </Link>
                      )}

                      {slide.secondaryText && (
                        <Link
                          to={slide.secondaryLink}
                          className="btn d-inline-flex align-items-center"
                          style={{
                            border: '1.5px solid rgba(41, 37, 54, 0.25)',
                            color: '#292536',
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '30px',
                            fontWeight: 600,
                            padding: '12px 28px',
                            fontSize: '0.92rem',
                            transition: 'all 0.25s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#292536';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
                            e.currentTarget.style.borderColor = 'rgba(41, 37, 54, 0.25)';
                          }}
                        >
                          {slide.secondaryText}
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* RIGHT SIDE: 55% WIDTH → FULL COVER IMAGE (OBJECT-FIT: COVER) */}
                  {/* ======================================================== */}
                  <div className="hero-split-image d-flex align-items-center justify-content-center p-0 p-md-2">
                    <div
                      className="w-100 position-relative overflow-hidden"
                      style={{
                        height: 'clamp(320px, 50vh, 520px)',
                        borderRadius: '20px',
                        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        margin: 0,
                        padding: 0
                      }}
                    >
                      <img
                        key={`${slide.id || index}-${slide.image}`}
                        src={slide.image}
                        alt={slide.alt || slide.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block',
                          margin: 0,
                          padding: 0,
                          transition: 'opacity 0.25s ease'
                        }}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {slideCount > 1 && (
        <>
          <IconButton
            onClick={prevSlide}
            aria-label="Previous Slide"
            sx={{
              position: 'absolute',
              left: { xs: 8, md: 20 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: '#FFFFFF',
              color: '#292536',
              border: '1px solid #E2DFEB',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              width: { xs: 38, md: 46 },
              height: { xs: 38, md: 46 },
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: '#77708F',
                color: '#FFFFFF',
                borderColor: '#77708F',
                transform: 'translateY(-50%) scale(1.08)'
              }
            }}
          >
            <ChevronLeft sx={{ fontSize: { xs: 22, md: 28 } }} />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            aria-label="Next Slide"
            sx={{
              position: 'absolute',
              right: { xs: 8, md: 20 },
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: '#FFFFFF',
              color: '#292536',
              border: '1px solid #E2DFEB',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              width: { xs: 38, md: 46 },
              height: { xs: 38, md: 46 },
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: '#77708F',
                color: '#FFFFFF',
                borderColor: '#77708F',
                transform: 'translateY(-50%) scale(1.08)'
              }
            }}
          >
            <ChevronRight sx={{ fontSize: { xs: 22, md: 28 } }} />
          </IconButton>

          {/* 4 Bottom Indicator Dots */}
          <div
            className="position-absolute d-flex align-items-center justify-content-center gap-2"
            style={{
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10
            }}
          >
            {slides.map((_, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? 'true' : 'false'}
                  style={{
                    width: isActive ? '32px' : '10px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? '#77708F' : '#B8AFCB',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                    boxShadow: isActive ? '0 2px 8px rgba(119, 112, 143, 0.4)' : 'none'
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
