import React from 'react';
import PropTypes from 'prop-types';

import CustomButton from 'components/Common/CustomButton';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
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
 * @callback EventHandler
 */

/**
 * Renders [CustomButtons]{@link {CustomButton}} to add new or remove existing items rows while working with [SchemaForm]{@link SchemaForm}.
 * @param {Object}       props
 * @param {boolean}      props.isRemoveClicked    - Indicates whether Remove CustomButton is clicked.
 * @param {boolean}      props.showRemove         - If true, show Remove and All CustomButtons.
 * @param {boolean}      props.isRemoveAllClicked - Indicates whether All CustomButton is clicked.
 * @param {EventHandler} props.addOnClick         - On click function for Add CustomButton.
 * @param {EventHandler} props.removeOnClick      - On click function for Remove CustomButton.
 * @param {EventHandler} props.removeAllOnClick   - On click function for All CustomButton.
 */
const FormItemsControls = ({
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
            role='tablist'
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
            {showRemove && isRemoveClicked ?
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

FormItemsControls.propTypes = {
    isRemoveClicked:    PropTypes.bool.isRequired,
    showRemove:         PropTypes.bool.isRequired,
    isRemoveAllClicked: PropTypes.bool.isRequired,
    addOnClick:         PropTypes.func.isRequired,
    removeOnClick:      PropTypes.func.isRequired,
    removeAllOnClick:   PropTypes.func.isRequired
};

export default FormItemsControls;
