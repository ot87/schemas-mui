import React from 'react';
import cn from 'classnames';

import withCustomPrimaryColor from '../../../hoc/withCustomPrimaryColor';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1)
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

    let buttonProps = {
        disableElevation: isClicked,
        disableFocusRipple: isClicked,
        disableRipple: isClicked,
        onClick: isClicked ? null : onClick
    };

    return (
        <Button
            className={cn({
                [classes.root]: true,
                [classes.clicked]: isClicked
            })}
            color={colorTheme || isClicked ? 'primary' : 'default'}
            disabled={isDisabled}
            size='large'
            variant={isClicked || isToggled ? 'contained' : 'outlined'}
            { ...buttonProps }
        >
            {text}
        </Button>
    );
};

export default withCustomPrimaryColor(CustomButton);
