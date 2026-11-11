import React from 'react';
import {
  SpaOutlined,
  FilterVintageOutlined,
  ForestOutlined,
  AccessTimeOutlined,
  DiamondOutlined
} from '@mui/icons-material';

/**
 * Normalizes input notes from either an array of strings or a comma-separated string
 */
const parseNotes = (notes, defaultList = []) => {
  if (Array.isArray(notes) && notes.length > 0) return notes;
  if (typeof notes === 'string' && notes.trim().length > 0) {
    const split = notes.split(',').map((n) => n.trim()).filter(Boolean);
    if (split.length > 0) return split;
  }
  return defaultList;
};

export default function FragrancePyramid({ topNotes = [], heartNotes = [], baseNotes = [] }) {
  const topList = parseNotes(topNotes, ['Sicilian Bergamot', 'French Lavender', 'Cardamom', 'Pink Pepper']);
  const heartList = parseNotes(heartNotes, ['Damask Rose', 'Smoky Cedarwood', 'Patchouli', 'Night Jasmine']);
  const baseList = parseNotes(baseNotes, ['Precious Agarwood (Oud)', 'Golden Ambergris', 'Madagascar Bourbon Vanilla', 'White Musk']);

  return (
    <div className="pyramid-cards-stack">
      {/* Top Header Label */}
      <div className="d-flex align-items-center justify-content-between mb-3 pb-1">
        <div className="d-flex align-items-center gap-2">
          <DiamondOutlined sx={{ fontSize: 16, color: '#C5A059' }} />
          <span style={{ fontSize: '0.74rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#9B783E', fontWeight: 700 }}>
            Olfactory Architecture
          </span>
        </div>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.5px', color: '#77708F', fontWeight: 500 }}>
          3-Stage Molecular Evolution
        </span>
      </div>

      {/* 1. TOP NOTES (STAGE I) - Champagne & Ivory Theme */}
      <div className="luxury-pyramid-card card-top-notes">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div className="d-flex align-items-center gap-3">
            <div className="pyramid-icon-wrap icon-top-notes">
              <SpaOutlined sx={{ fontSize: 22 }} />
            </div>
            <div>
              <span className="pyramid-card-stage-label">STAGE I • FLASH NOTES</span>
              <h5 className="pyramid-card-title m-0">TOP NOTES</h5>
            </div>
          </div>

          <span className="pyramid-duration-badge">
            <AccessTimeOutlined sx={{ fontSize: 13 }} />
            <span>First 15 – 30 Minutes</span>
          </span>
        </div>

        <p className="pyramid-card-desc">
          The initial burst of freshness experienced upon spraying.
        </p>

        <div className="pyramid-tags-wrapper">
          {topList.map((note, i) => (
            <span key={i} className="pyramid-ingredient-tag">
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* 2. HEART NOTES (STAGE II) - Soft Rose-Gold Theme */}
      <div className="luxury-pyramid-card card-heart-notes">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div className="d-flex align-items-center gap-3">
            <div className="pyramid-icon-wrap icon-heart-notes">
              <FilterVintageOutlined sx={{ fontSize: 22 }} />
            </div>
            <div>
              <span className="pyramid-card-stage-label">STAGE II • THE HEART</span>
              <h5 className="pyramid-card-title m-0">HEART NOTES</h5>
            </div>
          </div>

          <span className="pyramid-duration-badge">
            <AccessTimeOutlined sx={{ fontSize: 13 }} />
            <span>Lasts 3 – 5 Hours</span>
          </span>
        </div>

        <p className="pyramid-card-desc">
          The true signature body and character of the fragrance.
        </p>

        <div className="pyramid-tags-wrapper">
          {heartList.map((note, i) => (
            <span key={i} className="pyramid-ingredient-tag">
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* 3. BASE NOTES (STAGE III) - Deep Bronze / Muted Gold Theme */}
      <div className="luxury-pyramid-card card-base-notes">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div className="d-flex align-items-center gap-3">
            <div className="pyramid-icon-wrap icon-base-notes">
              <ForestOutlined sx={{ fontSize: 22 }} />
            </div>
            <div>
              <span className="pyramid-card-stage-label">STAGE III • DRYDOWN & SILLAGE</span>
              <h5 className="pyramid-card-title m-0">BASE NOTES</h5>
            </div>
          </div>

          <span className="pyramid-duration-badge">
            <AccessTimeOutlined sx={{ fontSize: 13 }} />
            <span>Lingers 10 – 14+ Hours</span>
          </span>
        </div>

        <p className="pyramid-card-desc">
          Rich, heavy molecular oils that bond with your skin for deep sillage and longevity.
        </p>

        <div className="pyramid-tags-wrapper">
          {baseList.map((note, i) => (
            <span key={i} className="pyramid-ingredient-tag">
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
