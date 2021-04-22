import React from 'react';
import PropTypes from 'prop-types';

import customPrimaryColors from 'components/utils/customPrimaryColors';

import { ThemeProvider } from '@material-ui/core/styles';

/**
 * Sets a new primary color for the ThemeProvider and wraps passed children wtih it. Returns children intact if themeColor is unknown or undefined.
 * @param {Object}                           props
 * @param {'green'|'yellow'|'red'|'default'} [props.themeColor] - A color of the theme to set to the ThemeProvider.
 * @param {JSX.Element}                      props.children     - Content to be wrapped with the ThemeProvider.
 */
const CustomPrimaryThemeProvider = ({ themeColor = 'default', children }) => {
    const isCustomColor = customPrimaryColors.colors.includes(themeColor);
    const getCustomPrimary = theme => {
        const { palette } = theme;
        const customColor = customPrimaryColors[palette.type][themeColor];

        return ({
            ...theme,
            palette: {
                ...palette,
                primary: palette.augmentColor(
                    {
                        main: customColor.main,
                        contrastText: palette.background.default
                    },
                    ...customColor.shades
                )
            }
        });
    };

    return (
        isCustomColor ? (
            <ThemeProvider theme={getCustomPrimary}>
                {children}
            </ThemeProvider>
        )
        : children
    );
};

CustomPrimaryThemeProvider.propTypes = {
    themeColor: PropTypes.oneOf(['green', 'yellow', 'red', 'default']),
    children:   PropTypes.node.isRequired
};

export default CustomPrimaryThemeProvider;
