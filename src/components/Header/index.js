import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Header from './Header';

import {
    selectActiveSchemaId,
    selectMode,
    setActiveSchemaId,
    UiModes
} from 'redux/reducers/ui';

/**
 * Connected to the store container for the Header component.
 * @param {Object}   props
 * @param {boolean}  props.isSchemasClicked    - Indicates whether the Schemas button is clicked.
 * @param {function} props.setIsSchemasClicked - Set value of the isSchemasClicked.
 */
const HeaderContainer = ({
    isSchemasClicked,
    setIsSchemasClicked
}) => {
    const activeSchemaId = useSelector(selectActiveSchemaId);
    const mode           = useSelector(selectMode);
    const dispatch       = useDispatch();
    const isShowSchema   = Boolean(activeSchemaId && mode === UiModes.SHOW);
    const appBarPosition = (
        mode === UiModes.ADD || (activeSchemaId && mode === UiModes.EDIT) ?
            'static'
        : 'sticky'
    );

    const handleBackClick    = () => dispatch(setActiveSchemaId(null));
    const handleSchemasClick = () => setIsSchemasClicked(true);

    return (
        <Header
            appBarPosition={appBarPosition}
            isShowSchema={isShowSchema}
            isSchemasClicked={isSchemasClicked}
            handleButtonClick={(
                isShowSchema ?
                    handleBackClick
                : handleSchemasClick
            )}
        />
    );
};

HeaderContainer.propTypes = {
    isSchemasClicked:    PropTypes.bool.isRequired,
    setIsSchemasClicked: PropTypes.func.isRequired
};

export default HeaderContainer;
