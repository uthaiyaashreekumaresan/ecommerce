import React from 'react';
import {
  Typography,
  Slider,
  FormControlLabel,
  Radio,
  FormGroup,
  Chip,
  Button,
  Box,
  Divider
} from '@mui/material';
import { RestartAlt } from '@mui/icons-material';

const POPULAR_NOTES = [
  'Oud',
  'Bergamot',
  'Amber',
  'Vanilla',
  'Rose',
  'Cedarwood',
  'Leather',
  'Lavender',
  'Saffron',
  'Patchouli'
];

export default function FilterSidebar({
  categories = [],
  brands = [],
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  selectedGender,
  onSelectGender,
  selectedNotes,
  onToggleNote,
  selectedSize,
  onSelectSize,
  priceRange,
  onChangePriceRange,
  onResetFilters
}) {
  return (
    <div className="bg-white p-3 rounded-3 border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#292536' }}>
          Filters
        </Typography>
        <Button
          size="small"
          startIcon={<RestartAlt />}
          onClick={onResetFilters}
          sx={{ fontSize: '0.75rem', color: '#77708F' }}
        >
          Reset
        </Button>
      </div>

      <Divider sx={{ mb: 2, borderColor: '#E2DFEB' }} />

      {/* Fragrance Families (Categories) */}
      <div className="mb-4">
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, letterSpacing: '0.5px', color: '#292536' }}>
          FRAGRANCE FAMILY
        </Typography>
        <FormGroup dense="true">
          <FormControlLabel
            control={
              <Radio
                size="small"
                checked={!selectedCategory}
                onChange={() => onSelectCategory('')}
                sx={{ color: '#77708F', '&.Mui-checked': { color: '#77708F' } }}
              />
            }
            label={<span style={{ fontSize: '0.82rem', color: '#292536' }}>All Families</span>}
          />
          {categories
            .filter((cat) => !['body-mists', 'best-sellers', 'floral-fragrances', 'oud-collection', 'new-arrivals'].includes(cat.slug))
            .map((cat) => (
            <FormControlLabel
              key={cat.id}
              control={
                <Radio
                  size="small"
                  checked={selectedCategory === cat.slug}
                  onChange={() => onSelectCategory(cat.slug)}
                  sx={{ color: '#77708F', '&.Mui-checked': { color: '#77708F' } }}
                />
              }
              label={
                <span style={{ fontSize: '0.82rem', color: '#292536' }}>
                  {cat.name} {cat.product_count !== undefined && <small style={{ color: '#77708F' }}>({cat.product_count})</small>}
                </span>
              }
            />
          ))}
        </FormGroup>
      </div>

      <Divider sx={{ mb: 3, borderColor: '#E2DFEB' }} />

      {/* Gender Filter */}
      <div className="mb-4">
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, letterSpacing: '0.5px', color: '#292536' }}>
          INTENDED GENDER
        </Typography>
        <div className="d-flex flex-wrap gap-1">
          {['', 'Men', 'Women', 'Unisex'].map((g) => {
            const isSelected = selectedGender === g;
            return (
              <Chip
                key={g || 'all'}
                label={g || 'All'}
                clickable
                onClick={() => onSelectGender(g)}
                size="small"
                sx={{
                  backgroundColor: isSelected ? '#77708F' : '#F7F5FA',
                  color: isSelected ? '#fff' : '#292536',
                  fontWeight: isSelected ? 700 : 500,
                  border: isSelected ? 'none' : '1px solid #E2DFEB',
                  '&:hover': { backgroundColor: isSelected ? '#645D7B' : '#ECE9F2' }
                }}
              />
            );
          })}
        </div>
      </div>

      <Divider sx={{ mb: 3, borderColor: '#E2DFEB' }} />

      {/* Price Range Slider */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: '0.5px', color: '#292536' }}>
            PRICE RANGE
          </Typography>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#77708F' }}>
            ₹{priceRange[0]} – ₹{priceRange[1]}
          </span>
        </div>
        <Box sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={(e, val) => onChangePriceRange(val)}
            valueLabelDisplay="auto"
            min={999}
            max={45000}
            step={250}
            sx={{
              color: '#77708F',
              '& .MuiSlider-thumb': { backgroundColor: '#77708F' },
              '& .MuiSlider-track': { backgroundColor: '#77708F' }
            }}
          />
        </Box>
      </div>

      <Divider sx={{ mb: 3, borderColor: '#E2DFEB' }} />

      {/* Scent Notes Tag Cloud */}
      <div className="mb-4">
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, letterSpacing: '0.5px', color: '#292536' }}>
          OLFACTORY NOTES
        </Typography>
        <div className="d-flex flex-wrap gap-1">
          {POPULAR_NOTES.map((note) => {
            const isSelected = selectedNotes.includes(note);
            return (
              <Chip
                key={note}
                label={note}
                clickable
                onClick={() => onToggleNote(note)}
                size="small"
                sx={{
                  backgroundColor: isSelected ? '#77708F' : '#F7F5FA',
                  color: isSelected ? '#ffffff' : '#292536',
                  border: isSelected ? 'none' : '1px solid #E2DFEB',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 600 : 400,
                  '&:hover': { backgroundColor: isSelected ? '#645D7B' : '#ECE9F2' }
                }}
              />
            );
          })}
        </div>
      </div>

      <Divider sx={{ mb: 3, borderColor: '#E2DFEB' }} />

      {/* Perfume Houses / Brands */}
      <div className="mb-3">
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, letterSpacing: '0.5px', color: '#292536' }}>
          PERFUME HOUSES
        </Typography>
        <FormGroup dense="true">
          <FormControlLabel
            control={
              <Radio
                size="small"
                checked={!selectedBrand}
                onChange={() => onSelectBrand('')}
                sx={{ color: '#77708F', '&.Mui-checked': { color: '#77708F' } }}
              />
            }
            label={<span style={{ fontSize: '0.82rem', color: '#292536' }}>All Brands</span>}
          />
          {brands.map((b) => (
            <FormControlLabel
              key={b.id}
              control={
                <Radio
                  size="small"
                  checked={selectedBrand === b.slug}
                  onChange={() => onSelectBrand(b.slug)}
                  sx={{ color: '#77708F', '&.Mui-checked': { color: '#77708F' } }}
                />
              }
              label={
                <span style={{ fontSize: '0.82rem', color: '#292536' }}>
                  {b.name}
                </span>
              }
            />
          ))}
        </FormGroup>
      </div>

      <Divider sx={{ mb: 3, borderColor: '#E2DFEB' }} />

      {/* Flacon Size */}
      <div>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, letterSpacing: '0.5px', color: '#292536' }}>
          BOTTLE SIZE
        </Typography>
        <div className="d-flex flex-wrap gap-1.5">
          {['', '30', '50', '100', '125', '250'].map((sz) => {
            const isSelected = selectedSize === sz;
            return (
              <Chip
                key={sz || 'all'}
                label={sz ? `${sz}ml` : 'All Sizes'}
                clickable
                onClick={() => onSelectSize(sz)}
                size="small"
                sx={{
                  backgroundColor: isSelected ? '#77708F' : '#F7F5FA',
                  color: isSelected ? '#fff' : '#292536',
                  fontWeight: isSelected ? 700 : 500,
                  border: isSelected ? 'none' : '1px solid #E2DFEB',
                  '&:hover': { backgroundColor: isSelected ? '#645D7B' : '#ECE9F2' }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
