import React     from 'react';
import { Field } from 'react-final-form';

import { makeStyles } from '@material-ui/core/styles';
import TextField      from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    textfield: {
        backgroundColor: theme.palette.background.paper
    }
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
 * @param {boolean}            props.disabled      - Indicates whether Field is disabled.
 * @param {string}             props.label         - Field label.
 * @param {boolean}            [props.multiline]   - Indicates whether Field is multiline.
 * @param {string}             props.name          - Field name.
 * @param {string}             [props.placeholder] - Field placeholder, if undefined, label is used.
 * @param {number}             [props.rows]        - Number of rows to display when multiline is true.
 * @param {string}             props.type          - Field type.
 * @param {ValidationFunction} [props.validate]    - Field validation function.
 */
const FormField = ({
    disabled,
    label,
    multiline,
    name,
    placeholder,
    rows,
    type,
    validate
}) => {
    const classes = useStyles();

    return (
        <Field name={name} type={type} validate={validate}>
            {({ input, meta }) => (
                <TextField
                    className={classes.textfield}
                    disabled={disabled}
                    error={validate && meta.touched && meta.error}
                    fullWidth
                    id={name}
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

export default FormField;
