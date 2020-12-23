import React from 'react';

import CustomButton from '../../Common/CustomButton/CustomButton';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row'
        }
    }
}));

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Renders [Plates]{@link {Plate}} to add new or remove existing items rows during work with [SchemaFormContainer]{@link SchemaFormContainer}.
 * @param {Object}               props
 * @param {boolean}              props.isRemoveClicked    - Indicates whether Remove Plate is clicked.
 * @param {boolean}              props.showRemove         - If true, show Remove and All Plates.
 * @param {boolean}              props.isRemoveAllClicked - Indicates whether All Plate is clicked.
 * @param {EventHandlerFunction} props.addOnClick         - On click function for Add Plate.
 * @param {EventHandlerFunction} props.removeOnClick      - On click function for Remove Plate.
 * @param {EventHandlerFunction} props.removeAllOnClick   - On click function for All Plate.
 */
const SchemaFormItemsControls = ({
    isRemoveClicked,
    showRemove,
    isRemoveAllClicked,
    addOnClick,
    removeOnClick,
    removeAllOnClick
}) => {
    const classes = useStyles();

    return (
        <Box
            className={classes.root}
            display='flex'
            justifyContent='center'
        >
            <CustomButton
                colorTheme='green'
                isDisabled={isRemoveClicked}
                onClick={addOnClick}
                text='Add'
            />
            {showRemove ?
                <CustomButton
                    colorTheme='red'
                    isToggled={isRemoveClicked}
                    onClick={removeOnClick}
                    text='Remove'
                />
            : null}
            {isRemoveClicked ?
                <CustomButton
                    colorTheme='red'
                    isToggled={isRemoveAllClicked}
                    onClick={removeAllOnClick}
                    text='All'
                />
            : null}
        </Box>
    );
};

export default SchemaFormItemsControls;
