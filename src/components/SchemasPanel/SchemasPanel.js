import React       from 'react';
import { connect } from 'react-redux';

import CustomButton from 'components/Common/CustomButton/CustomButton';

import { setMode, UiModes}    from 'redux/reducers/ui';
import { selectSchemasCount } from 'redux/reducers/schemas';

import Box from '@material-ui/core/Box';

/**
 * Renders a control panel of [Buttons]{@link CustomButton} to set a mode of the ui.
 * @param {Object}      props
 * @param {string}      props.mode           - The current ui mode from the Redux State.
 * @param {number}      props.schemasCount   - The number of existing schemas.
 * @param {number|null} props.activeSchemaId - The id of the selected schema from the Redux State.
 * @param {function}    props.setMode        - A function to set current ui mode.
 */
const SchemasPanel = ({
    mode,
    schemasCount,
    activeSchemaId,
    setMode
}) => {
    const isAdd    = mode === UiModes.ADD;
    const isEdit   = mode === UiModes.EDIT;
    const isDelete = mode === UiModes.DELETE;

    const handleAddClick    = () => setMode(UiModes.ADD);
    const handleEditClick   = () => handleClick(UiModes.EDIT);
    const handleDeleteClick = () => handleClick(UiModes.DELETE);

    const handleClick = newMode => {
        if ((isEdit || isDelete) && mode === newMode && !activeSchemaId) {
            setMode(UiModes.SHOW);
        } else {
            setMode(newMode);
        }
    }

    return (
        <Box display='flex' mx='auto' my={0}>
            <CustomButton
                colorTheme='green'
                onClick={handleAddClick}
                text='Add'
                type={(
                    isAdd ?
                        'clicked'
                    : (activeSchemaId && (isEdit || isDelete)) ?
                        'disabled'
                    : 'shown'
                )}
            />
            {schemasCount
                ? <>
                    <CustomButton
                        colorTheme='yellow'
                        onClick={handleEditClick}
                        text='Edit'
                        type={(
                            (isEdit && activeSchemaId) ?
                                'clicked'
                            : isEdit ?
                                'toggled'
                            : (isAdd || (activeSchemaId && isDelete)) ?
                                'disabled'
                            : 'shown'
                        )}
                    />
                    <CustomButton
                        colorTheme='red'
                        onClick={handleDeleteClick}
                        text='Delete'
                        type={(
                            (isDelete && activeSchemaId) ?
                                'clicked'
                            : isDelete ?
                                'toggled'
                            : (isAdd || (activeSchemaId && isEdit)) ?
                                'disabled'
                            : 'shown'
                        )}
                    />
                </>
            : null}
        </Box>
    );
};

export default connect(
    state => ({
        mode: state.ui.mode,
        schemasCount: selectSchemasCount(state),
        activeSchemaId: state.ui.activeSchemaId
    }),
    { setMode }
)(SchemasPanel);
