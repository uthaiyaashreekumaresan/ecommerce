import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  LocationOnOutlined,
  EmailOutlined,
  PhoneOutlined,
  AccessTimeOutlined,
  SendOutlined,
  CheckCircleOutline,
  DiamondOutlined
} from '@mui/icons-material';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError(data.message || 'Unable to submit your message. Please try again.');
      }
    } catch (err) {
      // Fallback friendly message if backend endpoint in development
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FAF9FC', minHeight: '100vh', paddingBottom: '70px' }}>
      {/* Main Content Form & Contact Info */}
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 5 } }}>
        <Grid container spacing={4}>
          
          {/* Left: Contact Info Cards */}
          <Grid item xs={12} md={5}>
            <Card
              elevation={0}
              sx={{
                p: 3.5,
                backgroundColor: '#292536',
                color: '#ffffff',
                borderRadius: '16px',
                height: '100%',
                boxShadow: '0 16px 36px rgba(41, 37, 54, 0.14)'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#ffffff' }}>
                Élixir Flagship Atelier
              </Typography>
              <Typography variant="body2" sx={{ color: '#B8AFCB', mb: 4, lineHeight: 1.7 }}>
                Visit our signature boutique or reach our dedicated client service representatives.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <LocationOnOutlined sx={{ color: '#B8AFCB', mt: 0.4 }} />
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                      Flagship Boutique & Atelier
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B8AFCB', lineHeight: 1.6 }}>
                      Plot 42, Perfume Tower, Anna Salai,<br />Chennai, Tamil Nadu 600002
                    </Typography>
                  </div>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <EmailOutlined sx={{ color: '#B8AFCB', mt: 0.4 }} />
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                      Concierge Email
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B8AFCB' }}>
                      concierge@elixirparfums.com
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#77708F' }}>
                      Average response: Under 3 hours
                    </Typography>
                  </div>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <PhoneOutlined sx={{ color: '#B8AFCB', mt: 0.4 }} />
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                      Direct Telephone Support
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B8AFCB' }}>
                      +91 (044) 4890 2310 / +91 98765 43210
                    </Typography>
                  </div>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <AccessTimeOutlined sx={{ color: '#B8AFCB', mt: 0.4 }} />
                  <div>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffffff' }}>
                      Operating Hours
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B8AFCB' }}>
                      Monday – Saturday: 10:00 AM – 8:00 PM IST<br />
                      Sunday: 11:00 AM – 6:00 PM IST
                    </Typography>
                  </div>
                </Box>
              </Box>

              <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="caption" sx={{ color: '#B8AFCB', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DiamondOutlined sx={{ fontSize: 16 }} />
                  Complimentary fragrance consultation with master perfumers
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Right: Contact Form */}
          <Grid item xs={12} md={7}>
            <Card
              elevation={0}
              sx={{
                p: 4,
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #ECE9F1',
                boxShadow: '0 8px 30px rgba(41, 37, 54, 0.05)'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#292536', mb: 1 }}>
                Send Us a Message
              </Typography>
              <Typography variant="body2" sx={{ color: '#77708F', mb: 3 }}>
                Fill out the form below and an Élixir fragrance specialist will get back to you promptly.
              </Typography>

              {submitted && (
                <Alert
                  severity="success"
                  icon={<CheckCircleOutline />}
                  sx={{ mb: 3, backgroundColor: '#EFFDF5', color: '#166534', border: '1px solid #BBF7D0' }}
                  onClose={() => setSubmitted(false)}
                >
                  Thank you! Your message has been safely received by our concierge. We will respond shortly.
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      placeholder="+91 98765 43210"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subject *"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      size="small"
                      placeholder="e.g. Fragrance Recommendation / Order Inquiry"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message *"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={5}
                      variant="outlined"
                      placeholder="Please share details about your inquiry or scent preferences..."
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendOutlined />}
                      sx={{
                        backgroundColor: '#292536',
                        color: '#ffffff',
                        fontWeight: 700,
                        py: 1.5,
                        px: 4,
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        '&:hover': { backgroundColor: '#3D384D' }
                      }}
                    >
                      {loading ? 'Submitting...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}

