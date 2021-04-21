import React from 'react';
import PropTypes from 'prop-types';

import CustomPrimaryThemeProvider from 'components/Common/CustomPrimaryThemeProvider/CustomPrimaryThemeProvider';
import CustomCard from './CustomCard';

/**
 * Callback for events handling.
 * @callback EventHandler
 */

/**
 * Wraps CustomCard with custom theme.
 * @param {Object}         props
 * @param {'yellow'|'red'} [props.colorTheme] - Color theme of the CustomCard.
 * @param {*}              props.content      - Content of the CustomCard.
 * @param {boolean}        [props.isClicked]  - Indicates whether the CustomCard is clicked.
 * @param {string}         props.name         - Name of the CustomCard.
 * @param {EventHandler}   [props.onClick]    - On click function for the CustomCard.
 */
const CustomCardContainer = ({ colorTheme = null, ...restProps }) => (
    <CustomPrimaryThemeProvider colorTheme={colorTheme}>
        <CustomCard {...restProps} />
    </CustomPrimaryThemeProvider>
);

CustomCardContainer.propTypes = {
    colorTheme: PropTypes.oneOf(['yellow', 'red']),
    content:    PropTypes.node.isRequired,
    isClicked:  PropTypes.bool,
    name:       PropTypes.string.isRequired,
    onClick:    PropTypes.func
};

export default CustomCardContainer;
