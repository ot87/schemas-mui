import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

export default (Component) => (props) => (
    props.colorTheme && !props.isDisabled ?
        <ThemeProvider theme={createMuiTheme({
            palette: {
                primary: (
                    props.colorTheme === 'green' ?
                        {main: green[600]}
                    : props.colorTheme === 'yellow' ?
                        {main: yellow[600], contrastText: '#fff'}
                    : {main: red[600]}
                )
            }
        })}>
            <Component {...props} />
        </ThemeProvider>
    : <Component {...props} />
);
