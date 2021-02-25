import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import FormField from 'components/Schemas/SchemaForm/FormField/FormField';

import { makeStyles } from '@material-ui/core/styles';
import Grid           from '@material-ui/core/Grid';
import useMediaQuery  from '@material-ui/core/useMediaQuery';
import red            from '@material-ui/core/colors/red';

const useStyles = makeStyles(theme => ({
    row: {
        '&:hover': {
            backgroundColor: red[300],
            borderRadius: theme.shape.borderRadius,
            cursor: 'pointer'
        }
    },
    clicked: {
        backgroundColor: red[500],
        borderRadius: theme.shape.borderRadius
    }
}));

/**
 * Callback for events handling.
 * @callback EventHandler
 */

/**
 * Function with validation rule.
 * @callback ValidationFunction
 * @param {string} value - Value to validate.
 * @returns {boolean} - Indicates whether value is valid.
 */

/**
 * Renders FormItemsRow with [FormFields]{@link FormField}.
 * @param {Object}             props
 * @param {boolean}            props.isClicked  - Indicates whether the FormItemsRow is clicked.
 * @param {boolean}            props.isDisabled - Indicates whether fields of the FormItemsRow are disabled.
 * @param {string}             props.name       - Name of the FormItemsRow in the Form.
 * @param {EventHandler}       props.onRowClick - On FormItemsRow Click handler.
 * @param {ValidationFunction} props.onValidate - Field validation function.
 */
const FormItemsRow = ({
    isClicked,
    isDisabled,
    name,
    onRowClick,
    onValidate
}) => {
    const classes  = useStyles();
    const smScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Grid
            role='gridcell'
            className={cn({
                [classes.row]: isDisabled,
                [classes.clicked]: isClicked
            })}
            container item
            justify='center'
            onClick={onRowClick}
            spacing={smScreen ? 1 : 2}
            xs={11} sm={6} md={11}
        >
            <Grid item xs={12} md={4}>
                <FormField
                    disabled={isDisabled}
                    label='Name'
                    name={`${name}.name`}
                    validate={onValidate}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <FormField
                    disabled={isDisabled}
                    label='Quantity'
                    name={`${name}.quantity`}
                    validate={onValidate}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <FormField
                    disabled={isDisabled}
                    label='Time'
                    name={`${name}.time`}
                />
            </Grid>
        </Grid>
    );
};

FormItemsRow.propTypes = {
    isClicked:  PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    name:       PropTypes.string.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired
};

export default FormItemsRow;
