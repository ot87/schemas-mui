import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectDarkTheme, toggleDarkTheme } from 'redux/reducers/ui';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip       from '@material-ui/core/Tooltip';
import IconButton    from '@material-ui/core/IconButton';
import Brightness7OutlinedIcon from '@material-ui/icons/Brightness7Outlined';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';

const xxsScreenWidth = 435;

/**
 * Connected to the store DarkThemeSwitcher component with IconButton to toggle light/dark theme.
 */
const DarkThemeSwitcher = () => {
    const isDarkTheme = useSelector(selectDarkTheme);
    const dispatch    = useDispatch();

    const handleIconClick = () => dispatch(toggleDarkTheme());

    const themeIcon = isDarkTheme ?
        <Brightness7OutlinedIcon data-testid='light' />
    : <Brightness4OutlinedIcon data-testid='dark' />;
    const xxsScreen = useMediaQuery(theme => theme.breakpoints.down(xxsScreenWidth));

    return (
        <Tooltip title='Toggle light/dark theme' arrow>
            <IconButton
                size={xxsScreen ? 'small' : 'medium'}
                aria-label='mode'
                onClick={handleIconClick}
            >
                {themeIcon}
            </IconButton>
        </Tooltip>
    );
};

export default DarkThemeSwitcher;
