import React from 'react';
import css from './Plate.module.css';

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Functional component which renders a custom clickable or togglable Plate button.
 * @param {Object}               props
 * @param {string}               props.text         - Text to display on the Plate.
 * @param {'green'|'gold'|'red'} [props.colorTheme] - Color theme of the Plate.
 * @param {boolean}              [props.isClicked]  - Indicates whether the Plate is clicked. If true, onClick will be nullified.
 * @param {boolean}              [props.isToggled]  - Indicates whether the Plate is clicked and stayed clickable.
 * @param {boolean}              [props.isDisabled] - Indicates whether the Plate is disabled.
 * @param {EventHandlerFunction} props.onClick      - On click function for the Plate.
 */
const Plate = ({
    text,
    colorTheme,
    isClicked,
    isToggled,
    isDisabled,
    onClick
}) => {
    let plateCss = css.plate;

    if (colorTheme === 'green') {
        plateCss = css.greenPlate;
    } else if (colorTheme === 'gold') {
        plateCss = css.goldPlate;
    } else if (colorTheme === 'red') {
        plateCss = css.redPlate;
    }

    if (isDisabled) {
        plateCss += ' ' + css.disabledPlate;
        onClick = null;
    } else {
        if (isClicked) {
            plateCss += ' ' + css.clickedPlate;
            if (colorTheme === 'green') {
                plateCss += ' ' + css.greenTheme;
            } else if (colorTheme === 'gold') {
                plateCss += ' ' + css.goldTheme;
            } else if (colorTheme === 'red') {
                plateCss += ' ' + css.redTheme;
            }
            onClick = null;
        } else if (isToggled) {
            plateCss += ' ' + css.toggledPlate;
            if (colorTheme === 'gold') {
                plateCss += ' ' + css.goldTheme;
            } else if (colorTheme === 'red') {
                plateCss += ' ' + css.redTheme;
            }
        }
    }

    return (
        <div role="button" className={plateCss} onClick={onClick}>
            {text}
        </div>
    );
};

export default Plate;