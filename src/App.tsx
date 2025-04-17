import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Library from './features/library/Library';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', 
    },
    secondary: {
      main: '#d32f2f', 
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Library />
    </ThemeProvider>
  );
}

export default App;
