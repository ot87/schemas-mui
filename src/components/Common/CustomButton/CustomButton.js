import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { lxs } from 'components/utils/customBreakpoints';

import {
    makeStyles,
    useTheme,
    ThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import green  from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red    from '@material-ui/core/colors/red';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        [theme.breakpoints.down(lxs)]: {
            margin: theme.spacing(0.5)
        }
    },
    outlined: {
        backgroundColor: theme.palette.background.paper
    },
    clicked: {
        '&:hover': {
            backgroundColor: ({ color }) => color,
            cursor: 'auto'
        }
    }
}));

const getColor = (colorTheme, { palette }, isDisabled) => (
    isDisabled ?
        palette.primary
    : (
        colorTheme === 'green' ?
            {main: green[700], contrastText: palette.background.default}
        : colorTheme === 'yellow' ?
            {main: yellow[700], contrastText: palette.background.default}
        : colorTheme === 'red' ?
            {main: red[700], contrastText: palette.background.default}
        : palette.primary
    )
);

/**
 * Callback for events handling.
 * @callback EventHandler
 */

/**
 * Functional component which renders a custom clickable or togglable button.
 * @param {Object}                                 props
 * @param {'green'|'yellow'|'red'|'default'}       [props.colorTheme] - Color theme of the CustomButton.
 * @param {'clicked'|'toggled'|'disabled'|'shown'} [props.type]       - Indicates a type of the CustomButton. If it's clicked, onClick is nullified; if it's toggled, the CustomButton is clicked and stayed clickable; if it's disabled, the CustomButton is disabled.
 * @param {EventHandler}                           props.onClick      - On click function for the CustomButton.
 * @param {string}                                 props.text         - Text to display on the CustomButton.
 */
const CustomButton = ({
    colorTheme = 'default',
    type = 'shown',
    onClick,
    text
}) => {
    const isClicked  = type === 'clicked';
    const isToggled  = type === 'toggled';
    const isDisabled = type === 'disabled';

    const color     = getColor(colorTheme, useTheme(), isDisabled);
    const classes   = useStyles({ color: color.main });
    const xxsScreen = useMediaQuery(theme => theme.breakpoints.down(lxs));
    const xsScreen  = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const isColorNotDefault = ['green', 'yellow', 'red'].includes(colorTheme);

    let button = (
        <Button
            classes={{
                root: cn({
                    [classes.root]: true,
                    [classes.clicked]: isClicked
                }),
                outlined: classes.outlined
            }}
            color={isColorNotDefault || isClicked ? 'primary' : 'default'}
            disabled={isDisabled}
            disableElevation={isClicked}
            disableFocusRipple={isClicked}
            disableRipple={isClicked}
            onClick={isClicked ? null : onClick}
            size={(
                xxsScreen ?
                    'small'
                : xsScreen ?
                    'medium'
                : 'large'
            )}
            variant={isClicked || isToggled ? 'contained' : 'outlined'}
        >
            {text}
        </Button>
    );

    if (isColorNotDefault && !isDisabled) {
        button = (
            <ThemeProvider theme={createMuiTheme({
                palette: { primary: color }
            })}>
                {button}
            </ThemeProvider>
        );
    }

    return button;
};

CustomButton.propTypes = {
    colorTheme: PropTypes.oneOf(['green', 'yellow', 'red', 'default']),
    type:       PropTypes.oneOf(['clicked', 'toggled', 'disabled', 'shown']),
    onClick:    PropTypes.func.isRequired,
    text:       PropTypes.string.isRequired
};

export default CustomButton;
