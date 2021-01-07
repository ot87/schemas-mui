import React from 'react';

import CustomButton from 'components/Common/CustomButton/CustomButton';

import { makeStyles } from '@material-ui/core/styles';
import Box            from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            margin: '0 auto'
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
        >
            <CustomButton
                colorTheme='green'
                onClick={addOnClick}
                text='Add'
                type={isRemoveClicked ? 'disabled' : 'shown'}
            />
            {showRemove ?
                <CustomButton
                    colorTheme='red'
                    onClick={removeOnClick}
                    text='Remove'
                    type={isRemoveClicked ? 'toggled' : 'shown'}
                />
            : null}
            {isRemoveClicked ?
                <CustomButton
                    colorTheme='red'
                    onClick={removeAllOnClick}
                    text='All'
                    type={isRemoveAllClicked ? 'toggled' : 'shown'}
                />
            : null}
        </Box>
    );
};

export default SchemaFormItemsControls;
