import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { homePageService } from '../services/homePageService';
import { subscribeToProductUpdates } from '../utils/productSync';
import ProductCard from '../components/ProductCard';
import FragrancePyramid from '../components/FragrancePyramid';
import HomeCarousel from '../components/HomeCarousel';
import PromotionalOfferBanner from '../components/PromotionalOfferBanner';
import CustomerReviewsSlider from '../components/CustomerReviewsSlider';
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Rating
} from '@mui/material';
import {
  VerifiedOutlined,
  AccessTimeOutlined,
  LocalShippingOutlined,
  DiamondOutlined,
  ArrowForward,
  AutoAwesomeOutlined
} from '@mui/icons-material';

const HOME_CONFIG_CACHE_KEY = 'luxury_perfume_home_config_v10';

// 100% verified single perfume bottle product photography directly mapped to PostgreSQL records
const CATEGORY_DISPLAY_CONFIG = [
  {
    slug: 'mens-perfumes',
    title: "Men's Perfume",
    dbName: "Men's Perfumes",
    defaultImageUrl: '/images/categories/mens-perfumes.jpg'
  },
  {
    slug: 'womens-perfumes',
    title: "Women's Perfume",
    dbName: "Women's Perfumes",
    defaultImageUrl: '/images/categories/womens-perfumes.jpg'
  },
  {
    slug: 'arabic-perfumes',
    title: 'Arabic Perfume',
    dbName: 'Arabic Perfumes',
    defaultImageUrl: '/images/categories/arabic-perfumes.jpg'
  },
  {
    slug: 'luxury-perfumes',
    title: 'Luxury Perfume',
    dbName: 'Luxury Perfumes',
    defaultImageUrl: '/images/categories/luxury-perfumes.jpg'
  },
  {
    slug: 'unisex-perfumes',
    title: 'Unisex Perfume',
    dbName: 'Unisex Perfumes',
    defaultImageUrl: '/images/categories/unisex-perfumes.jpg'
  }
];

export default function Home() {
  // Synchronous cache retrieval so on refresh the page renders the admin panel image instantly with ZERO flicker
  const [homeConfig, setHomeConfig] = useState(() => {
    try {
      // Clear older version caches
      localStorage.removeItem('luxury_perfume_home_config');
      localStorage.removeItem('luxury_perfume_home_config_v4');
      localStorage.removeItem('luxury_perfume_home_config_v5');
      localStorage.removeItem('luxury_perfume_home_config_v6');
      localStorage.removeItem('luxury_perfume_home_config_v7');
      localStorage.removeItem('luxury_perfume_home_config_v8');
      localStorage.removeItem('luxury_perfume_home_config_v9');
      const cached = localStorage.getItem(HOME_CONFIG_CACHE_KEY);
      if (!cached) return null;
      return JSON.parse(cached);
    } catch (_) {
      return null;
    }
  });
  const [featuredProducts, setFeaturedProducts] = useState(() => {
    try {
      const cached = localStorage.getItem(HOME_CONFIG_CACHE_KEY);
      return cached ? (JSON.parse(cached).featuredProducts || []) : [];
    } catch (_) {
      return [];
    }
  });
  const [categories, setCategories] = useState(() => {
    try {
      const cached = localStorage.getItem(HOME_CONFIG_CACHE_KEY);
      return cached ? (JSON.parse(cached).categories || []) : [];
    } catch (_) {
      return [];
    }
  });
  const [loading, setLoading] = useState(!homeConfig);

  useEffect(() => {
    async function loadData() {
      try {
        const [homeRes, prodRes, catRes] = await Promise.all([
          homePageService.getPublicHomePage().catch(() => ({ success: false })),
          productService.getFeatured().catch(() => ({ success: false })),
          productService.getCategories().catch(() => ({ success: false }))
        ]);

        if (homeRes && homeRes.success && homeRes.data) {
          setHomeConfig(homeRes.data);
          try {
            localStorage.setItem(HOME_CONFIG_CACHE_KEY, JSON.stringify(homeRes.data));
          } catch (_) {}
          setFeaturedProducts(homeRes.data.featuredProducts || []);
          setCategories(homeRes.data.categories || []);
        } else {
          if (prodRes && prodRes.success) setFeaturedProducts(prodRes.data || []);
          if (catRes && catRes.success) setCategories(catRes.data || []);
        }
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    // Real-Time Synchronization Listener: Immediately update when Admin changes an image
    const unsubscribe = subscribeToProductUpdates(({ productId, imageUrl }) => {
      const numId = Number(productId);

      // 1. Instant zero-latency UI update for featured products
      setFeaturedProducts((prev) =>
        prev.map((p) => (p.id === numId ? { ...p, image_url: imageUrl } : p))
      );

      // 2. Instant zero-latency UI update for homeConfig collections (Bestsellers & New Arrivals)
      setHomeConfig((prev) => {
        if (!prev) return prev;
        const updateList = (list) =>
          Array.isArray(list) ? list.map((p) => (p.id === numId ? { ...p, image_url: imageUrl } : p)) : list;
        return {
          ...prev,
          featuredProducts: updateList(prev.featuredProducts),
          bestSellers: updateList(prev.bestSellers),
          newArrivals: updateList(prev.newArrivals)
        };
      });

      // 3. Clear stale localStorage cache and silently re-query backend for complete PostgreSQL alignment
      try {
        localStorage.removeItem(HOME_CONFIG_CACHE_KEY);
      } catch (_) {}
      homePageService.getPublicHomePage().then((res) => {
        if (res && res.success && res.data) {
          setHomeConfig(res.data);
          setFeaturedProducts(res.data.featuredProducts || []);
          setCategories(res.data.categories || []);
          try {
            localStorage.setItem(HOME_CONFIG_CACHE_KEY, JSON.stringify(res.data));
          } catch (_) {}
        }
      }).catch(() => {});
    });

    return () => unsubscribe();
  }, []);

  const getSection = (key) => {
    if (!homeConfig?.sections) return { is_enabled: true };
    const found = homeConfig.sections.find(s => s.section_key === key);
    return found || { is_enabled: true };
  };

  return (
    <div>
      {/* 1. HERO SLIDER (DYNAMIC 4-SLIDE FULL-WIDTH CAROUSEL) */}
      {getSection('hero_slider').is_enabled && (
        <HomeCarousel dynamicSlides={homeConfig?.sliders} />
      )}

      {/* 2. VALUE PROPOSITIONS BAR */}
      {getSection('value_props').is_enabled && (
        <section className="bg-white py-4 border-bottom shadow-sm">
          <div className="container">
            <div className="row g-3 text-center">
              <div className="col-6 col-md-3 d-flex align-items-center justify-content-center gap-3">
                <VerifiedOutlined sx={{ color: '#77708F', fontSize: 32 }} />
                <div className="text-start">
                  <div className="fw-bold" style={{ fontSize: '0.85rem', color: '#292536' }}>IFRA Certified</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Skin safe formulations</div>
                </div>
              </div>

              <div className="col-6 col-md-3 d-flex align-items-center justify-content-center gap-3">
                <AccessTimeOutlined sx={{ color: '#77708F', fontSize: 32 }} />
                <div className="text-start">
                  <div className="fw-bold" style={{ fontSize: '0.85rem', color: '#292536' }}>12+ Hours Wear</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Tested in Indian climate</div>
                </div>
              </div>

              <div className="col-6 col-md-3 d-flex align-items-center justify-content-center gap-3">
                <DiamondOutlined sx={{ color: '#77708F', fontSize: 32 }} />
                <div className="text-start">
                  <div className="fw-bold" style={{ fontSize: '0.85rem', color: '#292536' }}>French Essence</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Imported perfume oils</div>
                </div>
              </div>

              <div className="col-6 col-md-3 d-flex align-items-center justify-content-center gap-3">
                <LocalShippingOutlined sx={{ color: '#77708F', fontSize: 32 }} />
                <div className="text-start">
                  <div className="fw-bold" style={{ fontSize: '0.85rem', color: '#292536' }}>Fast 48h Dispatch</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>Free shipping over ₹999</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. CATEGORY HIGHLIGHTS (FRAGRANCE FAMILIES) */}
      {getSection('categories').is_enabled && (
        <section className="py-5" style={{ backgroundColor: '#F7F5FA' }}>
          <div className="container">
            <div className="text-center mb-5">
              <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#77708F', fontWeight: 600 }}>
                {getSection('categories').subtitle || 'Curated By Scent Family'}
              </span>
              <h2 className="fw-bold mt-1" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
                {getSection('categories').title || 'Explore Fragrance Families'}
              </h2>
              <div style={{ width: '50px', height: '2px', backgroundColor: '#77708F', margin: '12px auto' }} />
              <p style={{ maxWidth: '580px', margin: '0 auto', fontSize: '0.9rem', color: '#5f5773' }}>
                From dark, smoldering smoky ouds to airy aquatic marine breezes and delicate French rose bouquets.
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              {CATEGORY_DISPLAY_CONFIG.map(({ slug, title, dbName, defaultImageUrl }) => {
                const found = categories.find(
                  (c) => c.slug === slug || c.name === title || c.name === dbName
                );
                const name = title;
                const count = found && found.product_count ? `${found.product_count} Scents` : 'Explore';
                // Strictly single image URL loaded from PostgreSQL database
                const imageUrl = (found && found.image_url) || defaultImageUrl;

                return (
                  <div key={slug} className="col-6 col-sm-4 col-md-4 col-lg-2" style={{ maxWidth: '230px' }}>
                    <Link
                      to={`/products?category=${slug}`}
                      className="text-decoration-none d-block text-center p-3 bg-white rounded-3 border h-100 shadow-sm"
                      style={{
                        borderColor: '#E2DFEB',
                        color: '#292536',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#77708F';
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = '0 12px 26px rgba(41, 37, 54, 0.1)';
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.transform = 'scale(1.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E2DFEB';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(41, 37, 54, 0.04)';
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.transform = 'scale(1)';
                      }}
                    >
                      {/* STRICT REQUIREMENT: IMAGES MUST FILL 100% OF THE CATEGORY CARD IMAGE AREA */}
                      <div
                        className="category-card"
                        style={{
                          width: '100%',
                          height: '130px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          margin: '0 auto 12px auto',
                          padding: 0,
                          background: 'transparent'
                        }}
                      >
                        <img
                          src={imageUrl}
                          alt={name}
                          loading="lazy"
                          style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            margin: 0,
                            padding: 0,
                            border: 'none',
                            transition: 'transform 0.4s ease'
                          }}
                        />
                      </div>
                      <h6 className="fw-bold mb-1" style={{ fontSize: '0.88rem', color: '#292536', letterSpacing: '0.2px' }}>
                        {name}
                      </h6>
                      <span style={{ fontSize: '0.74rem', color: '#77708F', fontWeight: 500 }}>
                        {count}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. FEATURED PRODUCTS (TRENDING ARTISANAL BLENDS) */}
      {getSection('featured_products').is_enabled && (
        <section className="py-5 bg-white">
          <div className="container-fluid px-3 px-md-4 px-xl-5" style={{ maxWidth: '1720px', margin: '0 auto' }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-4">
              <div>
                <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#77708F', fontWeight: 600 }}>
                  {getSection('featured_products').subtitle || 'Artisanal Bestsellers'}
                </span>
                <h2 className="fw-bold mt-1 mb-0" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
                  {getSection('featured_products').title || 'Trending Artisanal Blends'}
                </h2>
              </div>
              <Button
                component={Link}
                to="/products"
                endIcon={<ArrowForward />}
                sx={{ color: '#77708F', fontWeight: 700, mt: { xs: 2, md: 0 } }}
              >
                View Full Catalog
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <CircularProgress sx={{ color: '#77708F' }} />
              </div>
            ) : (
              <div className="home-product-grid">
                {featuredProducts.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. SPECIAL PROMOTIONAL OFFER BANNER & COUPON REVEAL */}
      {getSection('special_offer').is_enabled && (
        Array.isArray(homeConfig?.offers) && homeConfig.offers.length > 0 ? (
          homeConfig.offers.filter(o => o.is_active).map((o) => (
            <PromotionalOfferBanner key={o.id} offer={o} />
          ))
        ) : homeConfig?.offer ? (
          <PromotionalOfferBanner offer={homeConfig.offer} />
        ) : null
      )}

      {/* 6. BEST SELLERS SECTION */}
      {getSection('best_sellers').is_enabled && homeConfig?.bestSellers?.length > 0 && (
        <section className="py-5" style={{ backgroundColor: '#F7F5FA' }}>
          <div className="container-fluid px-3 px-md-4 px-xl-5" style={{ maxWidth: '1720px', margin: '0 auto' }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-4">
              <div>
                <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#77708F', fontWeight: 600 }}>
                  {getSection('best_sellers').subtitle || 'Most Coveted Scents'}
                </span>
                <h2 className="fw-bold mt-1 mb-0" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
                  {getSection('best_sellers').title || 'Signature Bestsellers'}
                </h2>
              </div>
              <Button
                component={Link}
                to="/products?sort=rating"
                endIcon={<ArrowForward />}
                sx={{ color: '#77708F', fontWeight: 700, mt: { xs: 2, md: 0 } }}
              >
                View All Bestsellers
              </Button>
            </div>
            <div className="home-product-grid">
              {homeConfig.bestSellers.slice(0, 8).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. NEW ARRIVALS SECTION */}
      {getSection('new_arrivals').is_enabled && homeConfig?.newArrivals?.length > 0 && (
        <section className="py-5 bg-white border-top border-bottom">
          <div className="container-fluid px-3 px-md-4 px-xl-5" style={{ maxWidth: '1720px', margin: '0 auto' }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-4">
              <div>
                <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#77708F', fontWeight: 600 }}>
                  {getSection('new_arrivals').subtitle || 'Fresh From Grasse'}
                </span>
                <h2 className="fw-bold mt-1 mb-0" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
                  {getSection('new_arrivals').title || 'New In The House'}
                </h2>
              </div>
              <Button
                component={Link}
                to="/products?sort=newest"
                endIcon={<ArrowForward />}
                sx={{ color: '#77708F', fontWeight: 700, mt: { xs: 2, md: 0 } }}
              >
                Explore New Extraits
              </Button>
            </div>
            <div className="home-product-grid">
              {homeConfig.newArrivals.slice(0, 8).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. INTERACTIVE FRAGRANCE PYRAMID EXPLORER */}
      {getSection('fragrance_pyramid').is_enabled && (
        <section className="perfume-pyramid-section py-5 py-lg-6">
          <div className="container pyramid-container">
            <div className="row align-items-center g-4 g-lg-5">
              {/* Left Content Column */}
              <div className="col-12 col-lg-5 pyramid-left-col">
                <div className="pyramid-eyebrow">
                  <DiamondOutlined sx={{ fontSize: 13, color: '#C5A059' }} />
                  <span>{getSection('fragrance_pyramid').subtitle || 'The Science of Scent'}</span>
                </div>

                <h2 className="pyramid-heading-editorial">
                  {getSection('fragrance_pyramid').title || 'Understanding The Perfume Pyramid'}
                </h2>
                <div className="pyramid-gold-underline" />

                <p className="pyramid-lead-paragraph mb-4">
                  A truly masterfully blended perfume isn’t static; it evolves dynamically on your pulse points. As body heat releases each molecular layer, new aromatic facets reveal themselves over 14+ hours.
                </p>

                {/* Redesigned Luxury PRO TIP Card */}
                <div className="pyramid-pro-tip-card mb-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="pyramid-pro-tip-icon-wrap">
                      <AutoAwesomeOutlined sx={{ fontSize: 17 }} />
                    </div>
                    <span className="pyramid-pro-tip-badge">PRO TIP</span>
                    <strong style={{ fontSize: '0.88rem', color: '#1A1822', letterSpacing: '0.2px' }}>
                      How to maximize longevity
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#5A5466', lineHeight: 1.7, margin: 0 }}>
                    Apply fragrance onto moisturized skin on pulse points: behind the ears, inner wrists, and collarbones. Avoid rubbing wrists together as friction fractures top notes prematurely.
                  </p>
                </div>

                {/* Redesigned "Browse All Formulations" Button */}
                <div className="pt-2">
                  <Link
                    to="/products"
                    className="btn-pyramid-browse"
                  >
                    <span>Browse All Formulations</span>
                    <ArrowForward className="btn-arrow-icon" sx={{ fontSize: 18 }} />
                  </Link>
                </div>
              </div>

              {/* Right Fragrance Pyramid Column */}
              <div className="col-12 col-lg-7">
                <FragrancePyramid
                  topNotes={['Sicilian Bergamot', 'French Lavender', 'Cardamom', 'Pink Pepper']}
                  heartNotes={['Damask Rose', 'Smoky Cedarwood', 'Patchouli', 'Night Jasmine']}
                  baseNotes={['Precious Agarwood (Oud)', 'Golden Ambergris', 'Madagascar Bourbon Vanilla', 'White Musk']}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. SOCIAL PROOF / REVIEWS */}
      {getSection('testimonials').is_enabled && (
        <section className="py-5 bg-white border-top">
          <div className="container">
            <div className="text-center mb-5">
              <span style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#77708F', fontWeight: 600 }}>
                {getSection('testimonials').subtitle || 'Loved By Fragrance Connoisseurs'}
              </span>
              <h2 className="fw-bold mt-1" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
                {getSection('testimonials').title || 'What Our Customers Say'}
              </h2>
              <div style={{ width: '50px', height: '2px', backgroundColor: '#77708F', margin: '12px auto' }} />
            </div>

            <CustomerReviewsSlider />
          </div>
        </section>
      )}
    </div>
  );
}
