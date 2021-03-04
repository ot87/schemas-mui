import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import API from 'api';
import { loadSchemas } from 'redux/reducers/schemas';
import { selectDarkTheme } from 'redux/reducers/ui';

import Dashboard from 'components/Schemas/Dashboard/Dashboard';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
    const isDarkTheme = useSelector(selectDarkTheme);
    const dispatch    = useDispatch();

    const muiTheme = createMuiTheme({
        palette: {
            type: isDarkTheme ? 'dark' : 'light'
        }
    });

    useEffect(() => {
        // TODO demo profile
        API.init('Profile 1');
        dispatch(loadSchemas());
    }, [dispatch]);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Dashboard />
        </ThemeProvider>
    );
};

export default App;
