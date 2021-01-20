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
 * Renders [CustomButtons]{@link CustomButton} as form buttons.
 * @param {Object}               props
 * @param {Object}               props.submit            - Props for the Submit CustomButton.
 * @param {boolean}              props.submit.isDisabled - Indicates whether CustomButton is disabled.
 * @param {EventHandlerFunction} props.submit.onClick    - On click function for Submit CustomButton.
 * @param {Object}               props.reset             - Props for the Reset CustomButton.
 * @param {boolean}              props.reset.isDisabled  - Indicates whether CustomButton is disabled.
 * @param {EventHandlerFunction} props.reset.onClick     - On click function for Reset CustomButton.
 * @param {Object}               props.cancel            - Props for the Cancel CustomButton.
 * @param {boolean}              props.cancel.isDisabled - Indicates whether CustomButton is disabled.
 * @param {EventHandlerFunction} props.cancel.onClick    - On click function for Cancel CustomButton.
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
                colorTheme='green'
                onClick={submit.onClick}
                text='Submit'
                type={submit.isDisabled ? 'disabled' : 'shown'}
            />
            <CustomButton
                colorTheme='yellow'
                onClick={reset.onClick}
                text='Reset'
                type={reset.isDisabled ? 'disabled' : 'shown'}
            />
            <CustomButton
                colorTheme='red'
                onClick={cancel.onClick}
                text='Cancel'
                type={cancel.isDisabled ? 'disabled' : 'shown'}
            />
        </Box>
    );
};

export default FormButtons;
