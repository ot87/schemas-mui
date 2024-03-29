import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { lxs } from 'components/utils/customBreakpoints';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';

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
            backgroundColor: theme.palette.primary.main,
            cursor: 'auto'
        }
    }
}));

/**
 * Callback for events handling.
 * @callback EventHandler
 */

/**
 * Functional component which renders a custom clickable or togglable button.
 * @param {Object}                                 props
 * @param {boolean}                                [props.isCustomColor] - Color theme of the CustomButton.
 * @param {'clicked'|'toggled'|'disabled'|'shown'} [props.type]          - Indicates a type of the CustomButton. If it's clicked, onClick is nullified; if it's toggled, the CustomButton is clicked and stayed clickable; if it's disabled, the CustomButton is disabled.
 * @param {EventHandler}                           props.onClick         - On click function for the CustomButton.
 * @param {string}                                 props.text            - Text to display on the CustomButton.
 */
const CustomButton = ({
    isCustomColor = false,
    type = 'shown',
    onClick,
    text
}) => {
    const isClicked  = type === 'clicked';
    const isToggled  = type === 'toggled';
    const isDisabled = type === 'disabled';

    const classes   = useStyles();
    const xxsScreen = useMediaQuery(theme => theme.breakpoints.down(lxs));
    const xsScreen  = useMediaQuery(theme => theme.breakpoints.down('xs'));

    return (
        <Button
            classes={{
                root: cn({
                    [classes.root]: true,
                    [classes.clicked]: isClicked
                }),
                outlined: classes.outlined
            }}
            color={isCustomColor || isClicked ? 'primary' : 'default'}
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
};

CustomButton.propTypes = {
    isCustomColor: PropTypes.bool,
    type:          PropTypes.oneOf(['clicked', 'toggled', 'disabled', 'shown']),
    onClick:       PropTypes.func.isRequired,
    text:          PropTypes.string.isRequired
};

export default CustomButton;
