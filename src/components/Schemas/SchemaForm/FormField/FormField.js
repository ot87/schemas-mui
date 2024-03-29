import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(({ palette }) => ({
    textfield: {
        backgroundColor: palette.background.paper
    },
    input: {
        '&:hover:not($error) $notchedOutline': {
            borderColor: palette.primary.main
        }
    },
    notchedOutline: {},
    error: {},
    shrink: {}
}));

/**
 * Function with validation rule.
 * @callback ValidationFunction
 * @param {string} value - Value to validate.
 * @returns {boolean} - Indicates whether value is valid.
 */

/**
 * Functional component to wrap the [Field]{@link https://final-form.org/docs/react-final-form/api/Field} component of the [React Final Form]{@link https://final-form.org/react} library.
 * @param {Object}             props
 * @param {boolean}            [props.disabled]    - Indicates whether Field is disabled.
 * @param {string}             props.label         - Field label.
 * @param {boolean}            [props.multiline]   - If multiline is specified, Field is textarea.
 * @param {string}             props.name          - Field name.
 * @param {string}             [props.placeholder] - Field placeholder, if is undefined, label is used.
 * @param {number}             [props.rows]        - Number of rows to display when multiline is true.
 * @param {ValidationFunction} [props.validate]    - Field validation function.
 */
const FormField = ({
    disabled = false,
    label,
    multiline = false,
    name,
    placeholder,
    rows,
    validate
}) => {
    const classes = useStyles();
    const identity = value => value;

    return (
        <Field name={name} type='text' validate={validate} parse={identity}>
            {({ input, meta }) => (
                <TextField
                    className={classes.textfield}
                    disabled={disabled}
                    error={validate && meta.touched && meta.error}
                    fullWidth
                    id={name}
                    InputProps={{ classes: {
                        root: classes.input,
                        notchedOutline: classes.notchedOutline,
                        error: classes.error
                    } }}
                    label={label}
                    multiline={multiline}
                    placeholder={placeholder || label}
                    required={!!validate}
                    rows={rows}
                    variant='outlined'
                    {...input}
                />
            )}
        </Field>
    );
};

FormField.propTypes = {
    disabled:    PropTypes.bool,
    label:       PropTypes.string.isRequired,
    multiline:   PropTypes.bool,
    name:        PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    rows:        PropTypes.number,
    validate:    PropTypes.func
};

export default FormField;
