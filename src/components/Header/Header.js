import React from 'react';
import PropTypes from 'prop-types';

import CustomButton from 'components/Common/CustomButton/CustomButton';
import SchemasTabs  from 'components/Schemas/SchemasTabs/SchemasTabs';
import SchemasPanel from 'components/Schemas/SchemasPanel/SchemasPanel';

import { makeStyles } from '@material-ui/core/styles';
import AppBar  from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DarkThemeSwitcher from 'components/DarkThemeSwitcher/DarkThemeSwitcher';

const useStyles = makeStyles(theme => ({
    toolbar: {
        flexWrap: ({ isWrap }) => isWrap ? 'wrap' : 'nowrap',
        justifyContent: 'space-between',
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    button: {
        margin: theme.spacing(1)
    }
}));

/**
 * Callback for events handling.
 * @callback EventHandler
 */

/**
 * Header component with control buttons.
 * Consists of three parts - a clickable [CustomButton]{@link CustomButton}, a panel to display either the [SchemasTabs]{@link SchemasTabs} or the control [SchemasPanel]{@link SchemasPanel}, and a [DarkThemeSwitcher]{@link DarkThemeSwitcher} to toggle light/dark mode of the UI.
 * @param {Object}            props
 * @param {'static'|'sticky'} props.appBarPosition    - AppBar position.
 * @param {'panel'|'tabs'}    props.showInHeader      - Indicates a type of element to show - either a control panel or tabs of schemas.
 * @param {EventHandler}      props.handleButtonClick - A click handler of the left button.
 */
const Header = ({
    appBarPosition,
    showInHeader,
    handleButtonClick
}) => {
    const showPanel = showInHeader === 'panel';

    const classes = useStyles({ isWrap: showPanel });

    return (
        <AppBar
            color='inherit'
            position={appBarPosition}
        >
            <Toolbar className={classes.toolbar}>
                <CustomButton
                    onClick={handleButtonClick}
                    text={(showPanel ? 'Schemas' : 'Back')}
                    type={(showPanel ? 'clicked' : 'shown')}
                />
                {showPanel ?
                    <SchemasPanel />
                : <SchemasTabs />}
                {/* TODO <Plate text={profile.name} onClick={() => setContent(profile)} /> */}
                <DarkThemeSwitcher />
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    appBarPosition:    PropTypes.oneOf(['sticky', 'static']).isRequired,
    showInHeader:      PropTypes.oneOf(['panel', 'tabs']).isRequired,
    handleButtonClick: PropTypes.func.isRequired
};

export default Header;
