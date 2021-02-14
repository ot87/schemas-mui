import React from 'react';
import PropTypes from 'prop-types';

import CustomButton          from 'components/Common/CustomButton/CustomButton';
import SchemasListContainer  from 'components/SchemasList/SchemasListContainer';
import SchemasPanelContainer from 'components/SchemasPanel/SchemasPanelContainer';

import { makeStyles } from '@material-ui/core/styles';
import AppBar         from '@material-ui/core/AppBar';
import Toolbar        from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
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
 * @callback EventHandlerFunction
 */

/**
 * Header component with control buttons.
 * Consists of two parts - a clickable [CustomButton]{@link CustomButton} and a panel to display either the [SchemasList]{@link SchemasList} or the control [SchemasPanel]{@link SchemasPanel}.
 * @param {Object}               props
 * @param {'static'|'sticky'}    props.appBarPosition    - AppBar position.
 * @param {boolean}              props.isShowSchema      - The specific schema is shown.
 * @param {boolean}              props.isSchemasClicked  - Indicates whether the Schemas button is clicked.
 * @param {EventHandlerFunction} props.handleButtonClick - A click handler of the left button.
 */
const Header = ({
    appBarPosition,
    isShowSchema,
    isSchemasClicked,
    handleButtonClick
}) => {
    const classes = useStyles({ isWrap: !isShowSchema && isSchemasClicked });

    return (
        <AppBar
            color='inherit'
            position={appBarPosition}
        >
            <Toolbar className={classes.toolbar}>
                <CustomButton
                    onClick={handleButtonClick}
                    text={(isShowSchema ? 'Back' : 'Schemas')}
                    type={(
                        isShowSchema ?
                            null
                        : isSchemasClicked ?
                            'clicked'
                        : 'shown'
                    )}
                />
                {isShowSchema ?
                    <SchemasListContainer />
                : isSchemasClicked ?
                    <SchemasPanelContainer />
                : <div />}
                {/* TODO <Plate text={profile.name} onClick={() => setContent(profile)} /> */}
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    appBarPosition:    PropTypes.oneOf(['sticky', 'static']).isRequired,
    isShowSchema:      PropTypes.bool.isRequired,
    isSchemasClicked:  PropTypes.bool.isRequired,
    handleButtonClick: PropTypes.func.isRequired
};

export default Header;
