import React       from 'react';
import { connect } from 'react-redux';

import CustomButton from 'components/Common/CustomButton/CustomButton';

import { setMode, UiModes} from 'redux/reducers/ui';
import { getSchemasCount } from 'redux/reducers/schemas';

import Box from '@material-ui/core/Box';

/**
 * Renders a control panel of [Buttons]{@link CustomButton} to set a mode of the ui.
 * @param {Object}      props
 * @param {string}      props.mode             - The current ui mode from the Redux State.
 * @param {number}      props.schemasCount     - The number of existing schemas.
 * @param {number|null} props.selectedSchemaId - The id of the selected schema from the Redux State.
 * @param {function}    props.setMode          - A function to set current ui mode.
 */
const SchemasPanel = ({
    mode,
    schemasCount,
    selectedSchemaId,
    setMode
}) => {
    const isAdd    = mode === UiModes.ADD;
    const isEdit   = mode === UiModes.EDIT;
    const isDelete = mode === UiModes.DELETE;

    const handleAddClick = () => setMode(UiModes.ADD);
    const handleEditClick = () => handleClick(UiModes.EDIT);
    const handleDeleteClick = () => handleClick(UiModes.DELETE);

    const handleClick = (newMode) => {
        if ((isEdit || isDelete) && mode === newMode && !selectedSchemaId) {
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
                    : (selectedSchemaId && (isEdit || isDelete)) ?
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
                            (isEdit && selectedSchemaId) ?
                                'clicked'
                            : isEdit ?
                                'toggled'
                            : (isAdd || (selectedSchemaId && isDelete)) ?
                                'disabled'
                            : 'shown'
                        )}
                    />
                    <CustomButton
                        colorTheme='red'
                        onClick={handleDeleteClick}
                        text='Delete'
                        type={(
                            (isDelete && selectedSchemaId) ?
                                'clicked'
                            : isDelete ?
                                'toggled'
                            : (isAdd || (selectedSchemaId && isEdit)) ?
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
    (state) => ({
        mode: state.ui.mode,
        schemasCount: getSchemasCount(state),
        selectedSchemaId: state.ui.selectedSchemaId
    }),
    { setMode }
)(SchemasPanel);
