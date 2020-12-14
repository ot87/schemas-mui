import React from 'react';
import { connect } from 'react-redux';

import Plate from '../Common/Plate/Plate';
import CustomButton from '../Common/CustomButton/CustomButton';
import { setMode, UiModes} from '../../redux/reducers/ui';
import { getSchemasCount } from '../../redux/reducers/schemas';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
    root: {
        margin: '0 auto'
    }
}));

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
    const classes = useStyles();
    const isAdd    = mode === UiModes.ADD;
    const isEdit   = mode === UiModes.EDIT;
    const isDelete = mode === UiModes.DELETE;

    const handleAddClick = () => setMode(UiModes.ADD);

    const handleClick = (newMode) => {
        if ((isEdit || isDelete) && mode === newMode && !selectedSchemaId) {
            setMode(UiModes.SHOW);
        } else {
            setMode(newMode);
        }
    }

    const editProps = isEdit && selectedSchemaId
        ? {isClicked: isEdit}
        : {isToggled: isEdit};

    const deleteProps = isDelete && selectedSchemaId
        ? {isClicked: isDelete}
        : {isToggled: isDelete};

    return (
        <Box display='flex' className={classes.root}>
            <CustomButton
                colorTheme='green'
                isClicked={isAdd}
                isDisabled={selectedSchemaId && (isEdit || isDelete)}
                onClick={handleAddClick}
                text='Add'
            />
            {schemasCount
                ? <Plate
                    text='Edit'
                    colorTheme='gold'
                    {...editProps}
                    isDisabled={isAdd || (selectedSchemaId && isDelete)}
                    onClick={() => handleClick(UiModes.EDIT)}
                />
            : null}
            {schemasCount
                ? <Plate
                    text='Delete'
                    colorTheme='red'
                    {...deleteProps}
                    isDisabled={isAdd || (selectedSchemaId && isEdit)}
                    onClick={() => handleClick(UiModes.DELETE)}
                />
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
