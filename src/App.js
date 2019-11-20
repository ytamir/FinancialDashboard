import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(','),
    props: {
      MuiButton: {
        size: 'small',
      },
      MuiFilledInput: {
        margin: 'dense',
      },
      MuiFormControl: {
        margin: 'dense',
      },
      MuiFormHelperText: {
        margin: 'dense',
      },
      MuiIconButton: {
        size: 'small',
      },
      MuiInputBase: {
        margin: 'dense',
      },
      MuiInputLabel: {
        margin: 'dense',
      },
      MuiListItem: {
        dense: true,
      },
      MuiOutlinedInput: {
        margin: 'dense',
      },
      MuiFab: {
        size: 'small',
      },
      MuiTable: {
        size: 'small',
      },
      MuiTextField: {
        margin: 'dense',
      },
      MuiToolbar: {
        variant: 'dense',
      },
    }
  }
});


class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
