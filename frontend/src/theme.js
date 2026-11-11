import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#77708F',
      light: '#958EA9',
      dark: '#5D5674',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#B8AFCB',
      light: '#D3CCE2',
      dark: '#9E94B3',
      contrastText: '#292536',
    },
    accent: {
      main: '#C0C0C0',
      contrastText: '#292536',
    },
    background: {
      default: '#F7F5FA',
      paper: '#ffffff',
    },
    text: {
      primary: '#292536',
      secondary: '#77708F',
    },
    divider: '#E2DFEB',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontFamily: '"Inter", sans-serif', fontWeight: 700, color: '#292536' },
    h2: { fontFamily: '"Inter", sans-serif', fontWeight: 700, color: '#292536' },
    h3: { fontFamily: '"Inter", sans-serif', fontWeight: 700, color: '#292536' },
    h4: { fontFamily: '"Inter", sans-serif', fontWeight: 700, color: '#292536' },
    h5: { fontFamily: '"Inter", sans-serif', fontWeight: 600, color: '#292536' },
    h6: { fontFamily: '"Inter", sans-serif', fontWeight: 600, color: '#292536' },
    subtitle1: { fontFamily: '"Inter", sans-serif', fontWeight: 600 },
    subtitle2: { fontFamily: '"Inter", sans-serif', fontWeight: 500 },
    body1: { fontFamily: '"Inter", sans-serif', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontFamily: '"Inter", sans-serif', fontWeight: 400, lineHeight: 1.6 },
    button: { fontFamily: '"Inter", sans-serif', textTransform: 'none', fontWeight: 600, letterSpacing: '0.2px' },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 22px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#77708F',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#645D7B',
          },
        },
        containedSecondary: {
          backgroundColor: '#B8AFCB',
          color: '#292536',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#A69BBF',
          },
        },
        outlinedPrimary: {
          borderColor: '#77708F',
          color: '#77708F',
          '&:hover': {
            borderColor: '#645D7B',
            backgroundColor: 'rgba(119, 112, 143, 0.08)',
          },
        },
        outlinedSecondary: {
          borderColor: '#B8AFCB',
          color: '#292536',
          '&:hover': {
            borderColor: '#9E94B3',
            backgroundColor: 'rgba(184, 175, 203, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #E2DFEB',
          boxShadow: '0 2px 8px rgba(41, 37, 54, 0.04)',
        },
      },
    },
  },
});

export default theme;
