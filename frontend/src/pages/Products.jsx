import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { subscribeToProductUpdates } from '../utils/productSync';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Chip,
  Button,
  Drawer,
  Box
} from '@mui/material';
import { FilterList, Close, DiamondOutlined } from '@mui/icons-material';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters from URL or default
  const categoryParam = searchParams.get('category') || '';
  const brandParam = searchParams.get('brand') || '';
  const genderParam = searchParams.get('gender') || '';
  const notesParam = searchParams.get('notes') || '';
  const sizeParam = searchParams.get('size') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'featured';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pagination, setPagination] = useState({ page: pageParam, limit: 20, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([999, 45000]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(135);

  // Dynamically measure sticky navbar height to guarantee zero overlap
  useEffect(() => {
    const updateNavHeight = () => {
      const nav = document.querySelector('header.sticky-top');
      if (nav) {
        setNavbarHeight(nav.offsetHeight);
      }
    };
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    let observer;
    const navEl = document.querySelector('header.sticky-top');
    if (navEl && window.ResizeObserver) {
      observer = new ResizeObserver(() => updateNavHeight());
      observer.observe(navEl);
    }

    return () => {
      window.removeEventListener('resize', updateNavHeight);
      if (observer) observer.disconnect();
    };
  }, []);

  const activeFilterCount = [
    categoryParam,
    brandParam,
    genderParam,
    notesParam,
    sizeParam,
    searchParam
  ].filter(Boolean).length;

  // Load Categories & Brands
  useEffect(() => {
    async function loadMeta() {
      try {
        const [catRes, brandRes] = await Promise.all([
          productService.getCategories(),
          productService.getBrands()
        ]);
        if (catRes.success) setCategories(catRes.data);
        if (brandRes.success) setBrands(brandRes.data);
      } catch (err) {
        console.error('Error fetching categories/brands:', err);
      }
    }
    loadMeta();
  }, []);

  // Fetch Products whenever filters, sort, or page change
  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true);
      try {
        const params = {
          category: categoryParam,
          brand: brandParam,
          gender: genderParam,
          notes: notesParam,
          size: sizeParam,
          search: searchParam,
          sort: sortParam,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          page: pageParam,
          limit: 20
        };
        const res = await productService.getProducts(params);
        if (res.success) {
          setProducts(res.data);
          setPagination(res.pagination);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCatalog();
  }, [categoryParam, brandParam, genderParam, notesParam, sizeParam, searchParam, sortParam, priceRange, pageParam]);

  // Real-time synchronization listener for catalog items
  useEffect(() => {
    const unsubscribe = subscribeToProductUpdates(({ productId, imageUrl }) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === Number(productId) ? { ...p, image_url: imageUrl } : p))
      );
    });
    return () => unsubscribe();
  }, []);

  // When changing filters or sorting, always reset to page 1
  const updateFilter = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    if (key !== 'page') {
      nextParams.set('page', '1');
    }
    setSearchParams(nextParams);
  };

  // Dedicated page change handler that updates ONLY the page number
  const handlePageChange = (event, newPage) => {
    if (event && event.preventDefault) event.preventDefault();
    const targetPage = Number(newPage);
    if (!targetPage || targetPage === pageParam || targetPage < 1 || targetPage > (pagination.pages || 1)) return;
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', targetPage.toString());
    setSearchParams(nextParams);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const totalPages = pagination.pages || 1;
  const currentPage = Math.min(Math.max(1, pageParam || pagination.page || 1), totalPages);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const handlePriceRangeChange = (val) => {
    setPriceRange(val);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  const resetAllFilters = () => {
    setPriceRange([999, 45000]);
    setSearchParams({ page: '1' });
  };

  return (
    <div className="py-4" style={{ backgroundColor: '#F7F5FA', minHeight: '80vh' }}>
      <div className="container-fluid px-3 px-md-4 px-xl-5" style={{ maxWidth: '1720px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb" style={{ fontSize: '0.8rem' }}>
            <li className="breadcrumb-item"><Link to="/" style={{ color: '#77708F' }}>Home</Link></li>
            <li className="breadcrumb-item"><Link to="/products" style={{ color: '#77708F' }}>Perfumes</Link></li>
            {categoryParam && (
              <li className="breadcrumb-item active text-capitalize" aria-current="page" style={{ color: '#292536', fontWeight: 600 }}>
                {categoryParam.replace('-', ' ')}
              </li>
            )}
          </ol>
        </nav>

        {/* Selected Category Header Banner: ONE Category = ONE Image Only from PostgreSQL */}
        {categoryParam && (() => {
          const activeCategory = categories.find((c) => c.slug === categoryParam);
          if (!activeCategory) return null;
          return (
            <div
              className="p-3 p-md-4 bg-white rounded-3 border mb-4 shadow-sm d-flex flex-column flex-sm-row align-items-center gap-3 gap-md-4"
              style={{ borderColor: '#E2DFEB' }}
            >
              {/* Single Official Perfume Bottle Image for this Category - 100% Fill */}
              <div
                className="category-card"
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  padding: 0,
                  background: 'transparent',
                  flexShrink: 0
                }}
              >
                <img
                  src={activeCategory.image_url}
                  alt={activeCategory.name}
                  loading="lazy"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    margin: 0,
                    padding: 0,
                    border: 'none'
                  }}
                />
              </div>
              <div className="text-center text-sm-start">
                <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2 mb-1">
                  <span className="badge" style={{ backgroundColor: '#292536', color: '#fff', fontSize: '0.7rem' }}>
                    FRAGRANCE FAMILY
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#77708F', fontWeight: 600 }}>
                    {pagination.total} Fragrances
                  </span>
                </div>
                <h3 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
                  {activeCategory.name}
                </h3>
                {activeCategory.description && (
                  <p className="text-muted mb-0" style={{ fontSize: '0.88rem', maxWidth: '640px' }}>
                    {activeCategory.description}
                  </p>
                )}
              </div>
            </div>
          );
        })()}

        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom" style={{ borderColor: '#E2DFEB' }}>
          <div>
            <h2 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif', color: '#292536' }}>
              {searchParam
                ? `Results for "${searchParam}"`
                : categoryParam
                ? `${categoryParam.replace('-', ' ').toUpperCase()} FRAGRANCES`
                : 'All Luxury Perfumes'}
            </h2>
            <Typography variant="body2" sx={{ color: '#77708F' }}>
              Showing {pagination.total > 0 ? ((pagination.page - 1) * pagination.limit + 1) : 0}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} artisanal Eau de Parfums (Page {pagination.page} of {pagination.pages})
            </Typography>
          </div>

          {/* Sort & Mobile Filter Button */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
            <Button
              variant="outlined"
              color="inherit"
              className="d-lg-none"
              startIcon={<FilterList />}
              onClick={() => setMobileFilterOpen(true)}
              sx={{
                borderColor: activeFilterCount > 0 ? '#292536' : '#77708F',
                fontSize: '0.82rem',
                color: '#292536',
                fontWeight: 600,
                backgroundColor: '#fff',
                px: 2,
                '&:hover': { backgroundColor: '#ECE9F2' }
              }}
            >
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>

            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel id="sort-select-label" sx={{ fontSize: '0.85rem' }}>Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                value={sortParam}
                label="Sort By"
                onChange={(e) => updateFilter('sort', e.target.value)}
                sx={{ fontSize: '0.85rem', backgroundColor: '#fff', '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#77708F' } }}
              >
                <MenuItem value="featured" sx={{ fontSize: '0.85rem' }}>Featured & Bestsellers</MenuItem>
                <MenuItem value="price-asc" sx={{ fontSize: '0.85rem' }}>Price: Low to High</MenuItem>
                <MenuItem value="price-desc" sx={{ fontSize: '0.85rem' }}>Price: High to Low</MenuItem>
                <MenuItem value="rating" sx={{ fontSize: '0.85rem' }}>Customer Rating</MenuItem>
                <MenuItem value="newest" sx={{ fontSize: '0.85rem' }}>Newest Arrivals</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(categoryParam || genderParam || notesParam || sizeParam || searchParam) && (
          <div className="d-flex flex-wrap align-items-center gap-1.5 mb-3">
            <span style={{ fontSize: '0.78rem', color: '#77708F', fontWeight: 600 }}>Active Filters:</span>
            {categoryParam && (
              <Chip
                label={`Family: ${categoryParam}`}
                size="small"
                onDelete={() => updateFilter('category', '')}
                sx={{ backgroundColor: '#fff', border: '1px solid #77708F', color: '#292536', fontSize: '0.75rem' }}
              />
            )}
            {genderParam && (
              <Chip
                label={`Gender: ${genderParam}`}
                size="small"
                onDelete={() => updateFilter('gender', '')}
                sx={{ backgroundColor: '#fff', border: '1px solid #77708F', color: '#292536', fontSize: '0.75rem' }}
              />
            )}
            {notesParam && (
              <Chip
                label={`Note: ${notesParam}`}
                size="small"
                onDelete={() => updateFilter('notes', '')}
                sx={{ backgroundColor: '#fff', border: '1px solid #77708F', color: '#292536', fontSize: '0.75rem' }}
              />
            )}
            {sizeParam && (
              <Chip
                label={`Size: ${sizeParam}ml`}
                size="small"
                onDelete={() => updateFilter('size', '')}
                sx={{ backgroundColor: '#fff', border: '1px solid #77708F', color: '#292536', fontSize: '0.75rem' }}
              />
            )}
            {searchParam && (
              <Chip
                label={`Search: "${searchParam}"`}
                size="small"
                onDelete={() => updateFilter('search', '')}
                sx={{ backgroundColor: '#fff', border: '1px solid #77708F', color: '#292536', fontSize: '0.75rem' }}
              />
            )}
            <Button
              size="small"
              onClick={resetAllFilters}
              sx={{ fontSize: '0.72rem', color: '#d32f2f', textTransform: 'none' }}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Main Layout: Fixed Left Filter & Exactly 4 Product Cards Per Row Beside It */}
        <div className="d-flex flex-column flex-lg-row gap-4 w-100 align-items-start">
          {/* Desktop Filter Sidebar (Fixed/Sticky while scrolling through products) */}
          <aside
            className="d-none d-lg-block flex-shrink-0 products-sticky-sidebar-aside"
            style={{
              width: '270px',
              top: `${navbarHeight + 16}px`,
              maxHeight: `calc(100vh - ${navbarHeight + 32}px)`,
              height: `calc(100vh - ${navbarHeight + 32}px)`
            }}
          >
            <div
              className="products-sidebar-scroll-box"
              style={{
                maxHeight: `calc(100vh - ${navbarHeight + 32}px)`
              }}
            >
              <FilterSidebar
                categories={categories}
                brands={brands}
                selectedCategory={categoryParam}
                onSelectCategory={(val) => updateFilter('category', val)}
                selectedBrand={brandParam}
                onSelectBrand={(val) => updateFilter('brand', val)}
                selectedGender={genderParam}
                onSelectGender={(val) => updateFilter('gender', val)}
                selectedNotes={notesParam}
                onToggleNote={(val) => updateFilter('notes', val)}
                selectedSize={sizeParam}
                onSelectSize={(val) => updateFilter('size', val)}
                priceRange={priceRange}
                onChangePriceRange={(val) => setPriceRange(val)}
                onResetFilters={resetAllFilters}
              />
            </div>
          </aside>

          {/* Products Section (Independently scrolling product listing with 4 cards per row) */}
          <main className="flex-grow-1 w-100 products-catalog-main" style={{ minWidth: 0 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress sx={{ color: '#77708F' }} />
              </Box>
            ) : products.length === 0 ? (
              <div className="bg-white p-5 text-center rounded border" style={{ borderColor: '#E2DFEB' }}>
                <DiamondOutlined sx={{ fontSize: 48, color: '#B8AFCB', mb: 2 }} />
                <h5 className="fw-bold" style={{ color: '#292536' }}>No Perfumes Found</h5>
                <p className="text-muted" style={{ fontSize: '0.88rem' }}>
                  We could not find any fragrances matching your selected criteria. Try adjusting or resetting your filters.
                </p>
                <Button
                  variant="contained"
                  onClick={resetAllFilters}
                  sx={{ backgroundColor: '#77708F', color: '#fff', fontWeight: 600, mt: 1, '&:hover': { backgroundColor: '#645D7B' } }}
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="category-products-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Bootstrap Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Product pagination" className="mt-5 d-flex justify-content-center">
                    <ul className="pagination shadow-sm">
                      {/* Previous Button */}
                      <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                        {currentPage <= 1 ? (
                          <span className="page-link" style={{ borderColor: '#E2DFEB', color: '#9ca3af' }}>
                            Previous
                          </span>
                        ) : (
                          <a
                            className="page-link"
                            href="#previous"
                            onClick={(e) => handlePageChange(e, currentPage - 1)}
                            style={{ borderColor: '#E2DFEB', color: '#292536' }}
                          >
                            Previous
                          </a>
                        )}
                      </li>

                      {/* Numbered Page Links */}
                      {getPageNumbers().map((item, idx) => {
                        if (item === '...') {
                          return (
                            <li key={`ellipsis-${idx}`} className="page-item disabled">
                              <span className="page-link" style={{ borderColor: '#E2DFEB', color: '#9ca3af' }}>
                                ...
                              </span>
                            </li>
                          );
                        }

                        const isActive = item === currentPage;
                        if (isActive) {
                          return (
                            <li key={item} className="page-item active" aria-current="page">
                              <span
                                className="page-link"
                                style={{
                                  backgroundColor: '#77708F',
                                  borderColor: '#77708F',
                                  color: '#ffffff',
                                  fontWeight: 700
                                }}
                              >
                                {item}
                              </span>
                            </li>
                          );
                        }

                        return (
                          <li key={item} className="page-item">
                            <a
                              className="page-link"
                              href={`#page-${item}`}
                              onClick={(e) => handlePageChange(e, item)}
                              style={{ borderColor: '#E2DFEB', color: '#292536' }}
                            >
                              {item}
                            </a>
                          </li>
                        );
                      })}

                      {/* Next Button */}
                      <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                        {currentPage >= totalPages ? (
                          <span className="page-link" style={{ borderColor: '#E2DFEB', color: '#9ca3af' }}>
                            Next
                          </span>
                        ) : (
                          <a
                            className="page-link"
                            href="#next"
                            onClick={(e) => handlePageChange(e, currentPage + 1)}
                            style={{ borderColor: '#E2DFEB', color: '#292536' }}
                          >
                            Next
                          </a>
                        )}
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile & Tablet Collapsible Filter Drawer */}
      <Drawer
        anchor="left"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '88vw', sm: '340px' },
            maxWidth: '380px',
            backgroundColor: '#F7F5FA',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
          }
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #E2DFEB',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#292536' }}>
              Filter Fragrances
            </Typography>
            {activeFilterCount > 0 && (
              <span className="badge" style={{ backgroundColor: '#292536', color: '#FFFFFF', fontSize: '0.7rem' }}>
                {activeFilterCount}
              </span>
            )}
          </div>
          <Button
            size="small"
            onClick={() => setMobileFilterOpen(false)}
            sx={{ minWidth: 'auto', p: 0.5, color: '#292536' }}
            aria-label="Close filters"
          >
            <Close fontSize="small" />
          </Button>
        </Box>

        {/* Drawer Scrollable Content */}
        <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <FilterSidebar
            categories={categories}
            brands={brands}
            selectedCategory={categoryParam}
            onSelectCategory={(val) => { updateFilter('category', val); }}
            selectedBrand={brandParam}
            onSelectBrand={(val) => { updateFilter('brand', val); }}
            selectedGender={genderParam}
            onSelectGender={(val) => { updateFilter('gender', val); }}
            selectedNotes={notesParam}
            onToggleNote={(val) => { updateFilter('notes', val); }}
            selectedSize={sizeParam}
            onSelectSize={(val) => { updateFilter('size', val); }}
            priceRange={priceRange}
            onChangePriceRange={(val) => setPriceRange(val)}
            onResetFilters={() => { resetAllFilters(); }}
          />
        </Box>

        {/* Drawer Sticky Footer Action Bar */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid #E2DFEB',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            gap: 1.5,
            flexShrink: 0
          }}
        >
          {activeFilterCount > 0 && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => { resetAllFilters(); }}
              sx={{ borderColor: '#E2DFEB', color: '#d32f2f', fontWeight: 600, fontSize: '0.8rem', whiteSpace: 'nowrap' }}
            >
              Reset
            </Button>
          )}
          <Button
            variant="contained"
            fullWidth
            onClick={() => setMobileFilterOpen(false)}
            sx={{
              backgroundColor: '#292536',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              py: 1,
              '&:hover': { backgroundColor: '#3D384D' }
            }}
          >
            Show {pagination.total} Fragrances
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
