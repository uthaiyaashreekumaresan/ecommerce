import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
  Chip
} from '@mui/material';
import {
  DiamondOutlined,
  VerifiedOutlined,
  AccessTimeOutlined,
  SpaOutlined,
  EmojiNatureOutlined,
  LocalShippingOutlined,
  ArrowForward,
  AutoAwesomeOutlined
} from '@mui/icons-material';

export default function About() {
  return (
    <div style={{ backgroundColor: '#FAF9FC', minHeight: '100vh' }}>
      {/* Hero Header - Compact 320px-350px Luxury Hero */}
      <section className="about-hero-section">
        <Container maxWidth="lg">
          <Box className="about-hero-content" sx={{ maxWidth: 720, mx: 'auto', textAlign: 'center' }}>
            <Chip
              icon={<DiamondOutlined sx={{ fontSize: '13px !important', color: '#B8AFCB' }} />}
              label="HAUTE PARFUMERIE HERITAGE"
              className="about-hero-badge"
            />
            <h1 className="about-hero-title">
              The Art of Exceptional Fragrance
            </h1>
            <p className="about-hero-desc">
              Born from a reverent passion for French artisanal perfumery, ÉLIXIR PARFUMS bridges rare natural botanical essences with modern olfactory innovation.
            </p>
          </Box>
        </Container>
      </section>

      {/* Brand Story & Philosophy */}
      <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 6 }, pb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(41, 37, 54, 0.12)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&q=80"
                alt="Artisanal Perfume Crafting"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 3,
                  background: 'linear-gradient(to top, rgba(41, 37, 54, 0.92) 0%, transparent 100%)',
                  color: '#ffffff'
                }}
              >
                <Typography variant="subtitle2" sx={{ letterSpacing: '1px', textTransform: 'uppercase', color: '#B8AFCB' }}>
                  Distilled in Grasse, France
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                  Over 30% Pure Perfume Concentration
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Chip
              label="OUR PHILOSOPHY"
              sx={{
                backgroundColor: '#ECE9F2',
                color: '#292536',
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '1.5px',
                mb: 2
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '2.3rem' },
                color: '#292536',
                lineHeight: 1.25,
                mb: 2.5
              }}
            >
              Luxury scents without the luxury markup.
            </Typography>
            <Typography variant="body1" sx={{ color: '#5D5674', lineHeight: 1.8, mb: 2 }}>
              In traditional prestige fragrance retail, over 80% of bottle prices cover celebrity sponsorships, opulent licensing royalties, and multi-tier distributor markups.
            </Typography>
            <Typography variant="body1" sx={{ color: '#5D5674', lineHeight: 1.8, mb: 3.5 }}>
              At ÉLIXIR PARFUMS, we invest directly into what matters most: authentic Grasse rose, nocturnal Indian jasmine, certified sustainable Cambodian agarwood, and aged vanilla absolutes.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: '#292536',
                  color: '#ffffff',
                  fontWeight: 600,
                  px: 3.5,
                  py: 1.4,
                  borderRadius: '30px',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#3D384D' }
                }}
              >
                Explore All Fragrances
              </Button>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                sx={{
                  borderColor: '#292536',
                  color: '#292536',
                  fontWeight: 600,
                  px: 3.5,
                  py: 1.4,
                  borderRadius: '30px',
                  textTransform: 'none',
                  '&:hover': { borderColor: '#3D384D', backgroundColor: '#F3F0F9' }
                }}
              >
                Speak with a Perfumer
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 4 Pillars of Excellence */}
      <section className="pillars-section">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <span
              style={{
                fontSize: '0.74rem',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                color: '#9B783E',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}
            >
              <DiamondOutlined sx={{ fontSize: 13, color: '#C5A059' }} />
              ARTISANAL INTEGRITY
            </span>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#1F1B2B',
                mb: 1.5,
                letterSpacing: '-0.015em',
                fontSize: { xs: '1.75rem', md: '2.15rem' }
              }}
            >
              The Four Pillars of Élixir Parfums
            </Typography>
            <Typography variant="body1" sx={{ color: '#77708F', maxWidth: 580, mx: 'auto', fontSize: '0.94rem', lineHeight: 1.7 }}>
              Every bottle undergoes meticulous artisanal maceration to ensure timeless quality and intoxicating projection.
            </Typography>
          </Box>

          <Grid container spacing={3.5} alignItems="stretch">
            {[
              {
                tag: 'PILLAR I • CERTIFIED',
                className: 'pillar-card-1',
                icon: <VerifiedOutlined sx={{ fontSize: 28 }} />,
                title: 'IFRA Certified & Safe',
                desc: 'Compliant with International Fragrance Association safety directives. Formulated without phthalates, parabens or harsh stabilizers.'
              },
              {
                tag: 'PILLAR II • LONGEVITY',
                className: 'pillar-card-2',
                icon: <AccessTimeOutlined sx={{ fontSize: 28 }} />,
                title: '12+ Hours Extrait Longevity',
                desc: 'Blended at Extrait and Eau de Parfum concentrations (25–35% perfume oil) ensuring deep, persistent sillage from dawn to dusk.'
              },
              {
                tag: 'PILLAR III • ETHICS',
                className: 'pillar-card-3',
                icon: <EmojiNatureOutlined sx={{ fontSize: 28 }} />,
                title: '100% Cruelty-Free & Vegan',
                desc: 'Ethically composed without animal musks. We use plant-derived ambrette seeds and cruelty-free accords for radiant warmth.'
              },
              {
                tag: 'PILLAR IV • MACERATION',
                className: 'pillar-card-4',
                icon: <SpaOutlined sx={{ fontSize: 28 }} />,
                title: 'Aged Maceration Process',
                desc: 'Each batch is rested in climate-controlled barrels for 6 weeks, allowing natural extracts to bond into seamless sensory harmonies.'
              }
            ].map((pillar, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx} sx={{ display: 'flex' }}>
                <div className={`pillar-luxury-card ${pillar.className} w-100`}>
                  <div className="pillar-icon-box">
                    {pillar.icon}
                  </div>
                  <span className="pillar-tag">{pillar.tag}</span>
                  <h3 className="pillar-title">
                    {pillar.title}
                  </h3>
                  <p className="pillar-desc">
                    {pillar.desc}
                  </p>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Scent Guarantee & CTA */}
      <Container maxWidth="md" sx={{ py: 9, textAlign: 'center' }}>
        <DiamondOutlined sx={{ fontSize: 44, color: '#77708F', mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#292536', mb: 2 }}>
          Experience the Difference on Your Skin
        </Typography>
        <Typography variant="body1" sx={{ color: '#5D5674', mb: 4, lineHeight: 1.8, maxWidth: 620, mx: 'auto' }}>
          Discover over 200 artisanal Eau de Parfums and Extraits designed for unforgettable impressions. All orders include complimentary express shipping and gift packaging.
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            backgroundColor: '#292536',
            color: '#ffffff',
            fontWeight: 700,
            px: 5,
            py: 1.6,
            borderRadius: '30px',
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#3D384D' }
          }}
        >
          Browse All Perfumes
        </Button>
      </Container>
    </div>
  );
}

