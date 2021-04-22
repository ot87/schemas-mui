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
 * Renders [CustomButtons]{@link CustomButton} as form buttons.
 * @param {Object}       props
 * @param {Object}       props.submit            - Props for the Submit CustomButton.
 * @param {boolean}      props.submit.isDisabled - Indicates whether CustomButton is disabled.
 * @param {EventHandler} props.submit.onClick    - On click function for Submit CustomButton.
 * @param {Object}       props.reset             - Props for the Reset CustomButton.
 * @param {boolean}      props.reset.isDisabled  - Indicates whether CustomButton is disabled.
 * @param {EventHandler} props.reset.onClick     - On click function for Reset CustomButton.
 * @param {Object}       props.cancel            - Props for the Cancel CustomButton.
 * @param {boolean}      props.cancel.isDisabled - Indicates whether CustomButton is disabled.
 * @param {EventHandler} props.cancel.onClick    - On click function for Cancel CustomButton.
 */
const FormButtons = ({ submit, reset, cancel }) => {
    const classes = useStyles();

    return (
        <Box
            className={classes.root}
            display='flex'
            role='tablist'
        >
            <CustomButton
                themeColor='green'
                onClick={submit.onClick}
                text='Submit'
                type={submit.isDisabled ? 'disabled' : 'shown'}
            />
            <CustomButton
                themeColor='yellow'
                onClick={reset.onClick}
                text='Reset'
                type={reset.isDisabled ? 'disabled' : 'shown'}
            />
            <CustomButton
                themeColor='red'
                onClick={cancel.onClick}
                text='Cancel'
                type={cancel.isDisabled ? 'disabled' : 'shown'}
            />
        </Box>
    );
};

FormButtons.propTypes = {
    submit: PropTypes.shape({
        isDisabled: PropTypes.bool.isRequired,
        onClick:    PropTypes.func.isRequired
    }).isRequired,
    reset: PropTypes.shape({
        isDisabled: PropTypes.bool.isRequired,
        onClick:    PropTypes.func.isRequired
    }).isRequired,
    cancel: PropTypes.shape({
        isDisabled: PropTypes.bool.isRequired,
        onClick:    PropTypes.func.isRequired
    }).isRequired
};

export default FormButtons;
