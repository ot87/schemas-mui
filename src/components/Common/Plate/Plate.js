import React from 'react';
import cn from 'classnames';
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
    let plateCssObj = {
        [css.greenPlate]: colorTheme === 'green',
        [css.goldPlate]: colorTheme === 'gold',
        [css.redPlate]: colorTheme === 'red',
        [css.plate]: ['green', 'gold', 'red'].indexOf(colorTheme) === -1
    };

    if (isDisabled) {
        plateCssObj[css.disabledPlate] = true;
        onClick = null;
    } else {
        if (isClicked) {
            onClick = null;
        }
        Object.assign(plateCssObj, {
            [css.clickedPlate]: isClicked,
            [css.toggledPlate]: !isClicked && isToggled,
            [css.greenTheme]: isClicked && colorTheme === 'green',
            [css.goldTheme]: (isClicked || isToggled) && colorTheme === 'gold',
            [css.redTheme]: (isClicked || isToggled) && colorTheme === 'red'
        });
    }

    return (
        <div role="button" className={cn(plateCssObj)} onClick={onClick}>
            {text}
        </div>
    );
};

export default Plate;