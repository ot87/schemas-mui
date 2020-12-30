import React from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        [theme.breakpoints.down(390)]: {
            margin: theme.spacing(0.5)
        }
    },
    outlined: {
        backgroundColor: theme.palette.background.paper
    },
    clicked: {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            cursor: 'auto'
        }
    }
}));

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Functional component which renders a custom clickable or togglable button.
 * @param {Object}                 props
 * @param {'green'|'yellow'|'red'} [props.colorTheme] - Color theme of the CustomButton.
 * @param {boolean}                [props.isClicked]  - Indicates whether the CustomButton is clicked. If true, onClick will be nullified.
 * @param {boolean}                [props.isDisabled] - Indicates whether the CustomButton is disabled.
 * @param {boolean}                [props.isToggled]  - Indicates whether the CustomButton is clicked and stayed clickable.
 * @param {EventHandlerFunction}   props.onClick      - On click function for the CustomButton.
 * @param {string}                 props.text         - Text to display on the CustomButton.
 */
const CustomButton = ({
    colorTheme,
    isClicked = false,
    isDisabled = false,
    isToggled = false,
    onClick,
    text
}) => {
    const classes = useStyles();
    const xxsScreen = useMediaQuery(theme => theme.breakpoints.down(390));
    const xsScreen = useMediaQuery(theme => theme.breakpoints.down('xs'));

    const buttonProps = {
        disableElevation: isClicked,
        disableFocusRipple: isClicked,
        disableRipple: isClicked,
        onClick: isClicked ? null : onClick
    };
    let button = (
        <Button
            classes={{
                root: cn({
                    [classes.root]: true,
                    [classes.clicked]: isClicked
                }),
                outlined: classes.outlined
            }}
            color={colorTheme || isClicked ? 'primary' : 'default'}
            disabled={isDisabled}
            size={(
                xxsScreen ?
                    'small'
                : xsScreen ?
                    'medium'
                : 'large'
            )}
            variant={isClicked || isToggled ? 'contained' : 'outlined'}
            { ...buttonProps }
        >
            {text}
        </Button>
    );

    if (colorTheme && !isDisabled) {
        const currentTheme = createMuiTheme();

        button = (
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    primary: (
                        colorTheme === 'green' ?
                            {main: green[600]}
                        : colorTheme === 'yellow' ?
                            {main: yellow[600], contrastText: '#fff'}
                        : colorTheme === 'red' ?
                            {main: red[600]}
                        : currentTheme.palette.primary
                    )
                }
            })}>
                {button}
            </ThemeProvider>
        );
    }

    return button;
};

export default CustomButton;
