import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import css from './Header.module.css';
import Plate from '../Common/Plate/Plate';
import SchemasListContainer from '../SchemasList/SchemasListContainer';
import SchemasPanelContainer from '../SchemasPanel/SchemasPanelContainer';
import { selectSchema, UiModes } from '../../redux/reducers/ui';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

/**
 * Header component with control buttons.
 * Consists of two parts - a clickable [Plate]{@link Plate} button and a panel to display either the [SchemasList]{@link SchemasList} or the control [SchemasPanel]{@link SchemasPanel}.
 * @param {Object}      props
 * @param {number|null} props.selectedSchemaId    - The id of the selected schema from the Redux State.
 * @param {string}      props.mode                - The current ui mode from the Redux State.
 * @param {function}    props.selectSchema        - The dispatch function to select schema.
 * @param {boolean}     props.isSchemasClicked    - Indicates whether the Schemas button is clicked.
 * @param {function}    props.setIsSchemasClicked - Set value of the isSchemasClicked.
 */
const Header = ({
    selectedSchemaId,
    mode,
    // profile,
    selectSchema,
    isSchemasClicked,
    setIsSchemasClicked
}) => {
    const isShowSchema = selectedSchemaId && mode === UiModes.SHOW;

    return (
        <AppBar position='sticky' color='inherit'>
            <Toolbar>

        {/* <header className={cn({
            [css.header]: true,
            [css.headerList]: isShowSchema,
            [css.headerPanel]: !isShowSchema && isSchemasClicked,
            [css.stickyHeader]: !(mode === UiModes.ADD || (selectedSchemaId && mode === UiModes.EDIT))
        })}> */}
            {isShowSchema ?
                <Plate text='Back' onClick={() => selectSchema(null)} />
            : <Plate
                text='Schemas'
                isClicked={isSchemasClicked}
                onClick={() => setIsSchemasClicked(true)}
            />}
            {isShowSchema ?
                <SchemasListContainer />
            : isSchemasClicked ?
                <SchemasPanelContainer />
            : <div />}
            {/* TODO <Plate text={profile.name} onClick={() => setContent(profile)} /> */}
        {/* </header> */}

            </Toolbar>
        </AppBar>
    );
};

export default connect(
    (state) => ({
        selectedSchemaId: state.ui.selectedSchemaId,
        mode: state.ui.mode,
        // profile: state.profile
    }),
    { selectSchema }
)(Header);