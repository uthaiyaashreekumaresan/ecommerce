import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import {
  Box,
  InputBase,
  IconButton,
  CircularProgress,
  Typography,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import {
  Search,
  Close,
  DiamondOutlined,
  LocalOfferOutlined,
  ArrowForward,
  Star
} from '@mui/icons-material';

export default function LiveSearchBar({
  placeholder = 'Search perfumes, families, brands...',
  isMobile = false,
  onAfterNavigate
}) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState({
    products: [],
    categories: [],
    brands: [],
    totalMatches: 0
  });
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions with 220ms debounce
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 1) {
      setSuggestions({ products: [], categories: [], brands: [], totalMatches: 0 });
      setIsOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await productService.getSuggestions(trimmed);
        if (res.success && res.data) {
          setSuggestions(res.data);
          setIsOpen(true);
          setActiveIndex(-1);
        }
      } catch (err) {
        console.warn('Failed to fetch search suggestions:', err.message);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Navigate to full search results
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setIsOpen(false);
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      if (onAfterNavigate) onAfterNavigate();
    }
  };

  const handleSelectProduct = (product) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/products/${product.id}`);
    if (onAfterNavigate) onAfterNavigate();
  };

  const handleSelectCategory = (slug) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/products?category=${slug}`);
    if (onAfterNavigate) onAfterNavigate();
  };

  const handleSelectBrand = (slug) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/products?brand=${slug}`);
    if (onAfterNavigate) onAfterNavigate();
  };

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    const totalItems = suggestions.products.length;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen && query.trim()) {
        setIsOpen(true);
        return;
      }
      setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && suggestions.products[activeIndex]) {
        e.preventDefault();
        handleSelectProduct(suggestions.products[activeIndex]);
      } else {
        handleSubmit(e);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const hasMatches =
    suggestions.products.length > 0 ||
    suggestions.categories.length > 0 ||
    suggestions.brands.length > 0;

  // Highlight matched keyword in text
  const highlightMatch = (text, term) => {
    if (!term || !text) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={i} style={{ backgroundColor: '#ECE7F3', color: '#292536', fontWeight: 800, borderRadius: '2px', padding: '0 2px' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '100%' : '260px'
      }}
    >
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F7F5FA',
            borderRadius: '24px',
            px: 1.5,
            height: 38,
            width: '100%',
            border: '1px solid #E2DFEB',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#77708F',
              backgroundColor: '#ffffff'
            },
            '&:focus-within': {
              borderColor: '#77708F',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 10px rgba(119, 112, 143, 0.2)'
            }
          }}
        >
          <Search fontSize="small" sx={{ color: '#77708F', mr: 0.8 }} />
          <InputBase
            ref={inputRef}
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query.trim().length >= 1) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            sx={{
              fontSize: '0.84rem',
              flex: 1,
              fontWeight: 500,
              color: '#292536',
              '& input::placeholder': {
                color: '#8A849F',
                opacity: 1
              }
            }}
          />

          {loading ? (
            <CircularProgress size={16} sx={{ color: '#77708F', mr: 0.5 }} />
          ) : query ? (
            <IconButton
              size="small"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                if (inputRef.current) inputRef.current.focus();
              }}
              sx={{ p: 0.3, color: '#77708F' }}
            >
              <Close fontSize="small" sx={{ fontSize: 14 }} />
            </IconButton>
          ) : null}
        </Box>
      </form>

      {/* Floating Auto-Suggestions Dropdown */}
      {isOpen && query.trim().length >= 1 && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: isMobile ? 0 : 'auto',
            right: 0,
            width: isMobile ? '100%' : { xs: '320px', sm: '380px', md: '420px' },
            maxHeight: '480px',
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid #E2DFEB',
            boxShadow: '0 12px 36px rgba(41, 37, 54, 0.16)',
            zIndex: 1500,
            py: 1
          }}
        >
          {loading && !hasMatches && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, gap: 1.5 }}>
              <CircularProgress size={20} sx={{ color: '#77708F' }} />
              <Typography variant="body2" sx={{ color: '#77708F', fontSize: '0.84rem' }}>
                Searching fragrances...
              </Typography>
            </Box>
          )}

          {!loading && !hasMatches && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <DiamondOutlined sx={{ fontSize: 32, color: '#B8AFCB', mb: 1 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#292536', mb: 0.5 }}>
                No fragrances found for "{query}"
              </Typography>
              <Typography variant="caption" sx={{ color: '#77708F', display: 'block', fontSize: '0.78rem' }}>
                Try searching by perfume name, fragrance family (e.g. Woody, Citrus), or brand (e.g. Florencia).
              </Typography>
            </Box>
          )}

          {/* 1. Category & Brand Suggestions */}
          {(suggestions.categories.length > 0 || suggestions.brands.length > 0) && (
            <Box sx={{ px: 2, pt: 1, pb: 1.5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#77708F',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                  display: 'block',
                  mb: 1
                }}
              >
                Families & Brands
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {suggestions.categories.map((c) => (
                  <Chip
                    key={`cat-${c.id}`}
                    label={`Family: ${c.name}`}
                    size="small"
                    onClick={() => handleSelectCategory(c.slug)}
                    sx={{
                      backgroundColor: '#F3F0F8',
                      color: '#292536',
                      fontWeight: 600,
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      border: '1px solid #E2DFEB',
                      '&:hover': {
                        backgroundColor: '#77708F',
                        color: '#FFFFFF'
                      }
                    }}
                  />
                ))}
                {suggestions.brands.map((b) => (
                  <Chip
                    key={`brand-${b.id}`}
                    icon={<LocalOfferOutlined sx={{ fontSize: '13px !important' }} />}
                    label={b.name}
                    size="small"
                    onClick={() => handleSelectBrand(b.slug)}
                    sx={{
                      backgroundColor: '#FFFFFF',
                      color: '#292536',
                      fontWeight: 600,
                      fontSize: '0.74rem',
                      cursor: 'pointer',
                      border: '1px solid #D6D0E3',
                      '&:hover': {
                        backgroundColor: '#292536',
                        color: '#FFFFFF'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {(suggestions.categories.length > 0 || suggestions.brands.length > 0) &&
            suggestions.products.length > 0 && <Divider sx={{ my: 0.5, borderColor: '#ECE7F3' }} />}

          {/* 2. Product Suggestions */}
          {suggestions.products.length > 0 && (
            <Box sx={{ py: 0.5 }}>
              <Box sx={{ px: 2, py: 0.8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#77708F',
                    fontWeight: 700,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    fontSize: '0.7rem'
                  }}
                >
                  Matching Perfumes
                </Typography>
                <Typography variant="caption" sx={{ color: '#8E85A3', fontSize: '0.72rem' }}>
                  {suggestions.totalMatches} total
                </Typography>
              </Box>

              {suggestions.products.map((product, idx) => {
                const isSelected = activeIndex === idx;
                const discount =
                  product.discount_price && product.discount_price < product.price
                    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
                    : 0;

                return (
                  <Box
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1.2,
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#F4F1F8' : 'transparent',
                      transition: 'background-color 0.15s ease',
                      borderLeft: isSelected ? '3px solid #77708F' : '3px solid transparent',
                      '&:hover': {
                        backgroundColor: '#F4F1F8'
                      }
                    }}
                  >
                    {/* Thumbnail Image */}
                    <Box
                      component="img"
                      src={product.image_url}
                      alt={product.name}
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '8px',
                        objectFit: 'cover',
                        backgroundColor: '#F7F5FA',
                        border: '1px solid #ECE7F3',
                        mr: 1.5,
                        flexShrink: 0
                      }}
                    />

                    {/* Product Info */}
                    <Box sx={{ flex: 1, minWidth: 0, mr: 1.5 }}>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{
                          fontWeight: 600,
                          color: '#292536',
                          fontSize: '0.85rem',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        {highlightMatch(product.name, query.trim())}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.2 }}>
                        <Typography
                          variant="caption"
                          noWrap
                          sx={{
                            color: '#77708F',
                            fontSize: '0.73rem',
                            fontWeight: 500
                          }}
                        >
                          {product.brand_name || 'Élixir'} • {product.category_name || 'Artisanal'}
                        </Typography>
                        {product.rating > 0 && (
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', color: '#f59e0b', fontSize: '0.7rem', fontWeight: 600 }}>
                            <Star sx={{ fontSize: 12, mr: 0.2 }} />
                            <span>{Number(product.rating).toFixed(1)}</span>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Price */}
                    <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#292536', fontSize: '0.86rem' }}>
                        ₹{(product.discount_price || product.price).toLocaleString('en-IN')}
                      </Typography>
                      {discount > 0 && (
                        <Typography
                          variant="caption"
                          sx={{
                            textDecoration: 'line-through',
                            color: '#9CA3AF',
                            fontSize: '0.72rem',
                            display: 'block'
                          }}
                        >
                          ₹{product.price.toLocaleString('en-IN')}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}

          {/* 3. Footer: "View all results" */}
          {suggestions.totalMatches > 0 && (
            <>
              <Divider sx={{ my: 0.5, borderColor: '#ECE7F3' }} />
              <Box
                onClick={handleSubmit}
                sx={{
                  px: 2,
                  py: 1.2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  backgroundColor: '#FAF9FC',
                  color: '#292536',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  transition: 'background-color 0.15s ease',
                  '&:hover': {
                    backgroundColor: '#F3EFF8',
                    color: '#77708F'
                  }
                }}
              >
                <span>View all {suggestions.totalMatches} results for "{query.trim()}"</span>
                <ArrowForward sx={{ fontSize: 15 }} />
              </Box>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
}

