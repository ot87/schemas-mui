import React from 'react';
import PropTypes from 'prop-types';

import customPrimaryColors from 'components/utils/customPrimaryColors';
import CustomPrimaryThemeProvider from 'components/Common/CustomPrimaryThemeProvider/CustomPrimaryThemeProvider';
import CustomButton from './CustomButton';

/**
 * Callback for events handling.
 * @callback EventHandler
 */

/**
 * Functional component which renders a custom clickable or togglable button.
 * @param {Object}                                 props
 * @param {'green'|'yellow'|'red'|'default'}       [props.themeColor] - A color of the theme of the CustomButton.
 * @param {'clicked'|'toggled'|'disabled'|'shown'} [props.type]       - Indicates a type of the CustomButton. If it's clicked, onClick is nullified; if it's toggled, the CustomButton is clicked and stayed clickable; if it's disabled, the CustomButton is disabled.
 * @param {EventHandler}                           props.onClick      - On click function for the CustomButton.
 * @param {string}                                 props.text         - Text to display on the CustomButton.
 */
const CustomButtonContainer = ({
    themeColor = 'default',
    type = 'shown',
    ...restProps
}) => {
    const isCustomColor = customPrimaryColors.colors.includes(themeColor);

    return (
        <CustomPrimaryThemeProvider
            themeColor={type === 'disabled' ? 'default' : themeColor}
        >
            <CustomButton
                isCustomColor={isCustomColor}
                type={type}
                {...restProps}
            />
        </CustomPrimaryThemeProvider>
    );
};

CustomButtonContainer.propTypes = {
    themeColor: PropTypes.oneOf(['green', 'yellow', 'red', 'default']),
    type:       PropTypes.oneOf(['clicked', 'toggled', 'disabled', 'shown']),
    onClick:    PropTypes.func.isRequired,
    text:       PropTypes.string.isRequired
};

export default CustomButtonContainer;
