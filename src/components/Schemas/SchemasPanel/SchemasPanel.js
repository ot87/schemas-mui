import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from 'components/Common/CustomButton/CustomButton';

import {
    UiModes,
    selectMode,
    selectActiveSchemaId,
    setMode
} from 'redux/reducers/ui';
import { selectSchemasCount } from 'redux/reducers/schemas';
import { mxs } from 'components/utils/customBreakpoints';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';

/**
 * Renders a control panel of [CustomButtons]{@link CustomButton} to set a mode of the ui.
 */
const SchemasPanel = () => {
    const activeSchemaId = useSelector(selectActiveSchemaId);
    const mode           = useSelector(selectMode);
    const schemasCount   = useSelector(selectSchemasCount);
    const dispatch       = useDispatch();

    const isAdd    = mode === UiModes.ADD;
    const isEdit   = mode === UiModes.EDIT;
    const isDelete = mode === UiModes.DELETE;

    const dispatchSetMode   = mode => dispatch(setMode(mode));
    const handleAddClick    = () => dispatchSetMode(UiModes.ADD);
    const handleEditClick   = () => handleClick(UiModes.EDIT);
    const handleDeleteClick = () => handleClick(UiModes.DELETE);

    const handleClick = newMode => {
        if ((isEdit || isDelete) && mode === newMode && !activeSchemaId) {
            dispatchSetMode(UiModes.SHOW);
        } else {
            dispatchSetMode(newMode);
        }
    };

    const xxxsScreen = useMediaQuery(theme => theme.breakpoints.down(mxs));

    return (
        <Box display='flex' mx='auto' my={0} order={xxxsScreen ? 3 : null}>
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
            {schemasCount ?
                <>
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

export default SchemasPanel;
