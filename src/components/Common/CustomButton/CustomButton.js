import React from 'react';
import cn from 'classnames';

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
 * @param {Object}               props
 * @param {string}               [props.color]      - Color of the CustomButton.
 * @param {string}               props.text         - Text to display on the CustomButton.
 * @param {'green'|'gold'|'red'} [props.colorTheme] - Color theme of the CustomButton.
 * @param {boolean}              [props.isClicked]  - Indicates whether the CustomButton is clicked. If true, onClick will be nullified.
 * @param {boolean}              [props.isToggled]  - Indicates whether the CustomButton is clicked and stayed clickable.
 * @param {boolean}              [props.isDisabled] - Indicates whether the CustomButton is disabled.
 * @param {EventHandlerFunction} props.onClick      - On click function for the CustomButton.
 */
const CustomButton = ({
    color = 'default',
    text,
    colorTheme,
    isClicked = false,
    isToggled,
    isDisabled,
    onClick
}) => {
    const classes = useStyles();
    // let customButtonCssObj = {
    //     [css.greenCustomButton]: colorTheme === 'green',
    //     [css.goldCustomButton]: colorTheme === 'gold',
    //     [css.redCustomButton]: colorTheme === 'red',
    //     [css.customButton]: ['green', 'gold', 'red'].indexOf(colorTheme) === -1
    // };

    // if (isDisabled) {
    //     customButtonCssObj[css.disabledCustomButton] = true;
    //     onClick = null;
    // } else {
    //    if (isClicked) {
    //        onClick = null;
    //    }
    //     Object.assign(customButtonCssObj, {
    //         [css.clickedCustomButton]: isClicked,
    //         [css.toggledCustomButton]: !isClicked && isToggled,
    //         [css.greenTheme]: isClicked && colorTheme === 'green',
    //         [css.goldTheme]: (isClicked || isToggled) && colorTheme === 'gold',
    //         [css.redTheme]: (isClicked || isToggled) && colorTheme === 'red'
    //     });
    // }

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
            color={isClicked ? 'primary' : 'default'}
            variant={isClicked ? 'contained' : 'outlined'}
            { ...buttonProps }
        >
            {text}
        </Button>
    );
};

export default CustomButton;