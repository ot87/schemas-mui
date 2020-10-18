import React from 'react';
import { Field } from 'react-final-form';
import cn from 'classnames';
import css from './FormField.module.css';

/**
 * Function with validation rule.
 * @callback ValidationFunction
 * @param {string} value - Value to validate.
 * @returns {boolean} - Indicates whether value is valid.
 */

/**
 * Functional component to wrap the [Field]{@link https://final-form.org/docs/react-final-form/api/Field} component of the [React Final Form]{@link https://final-form.org/react} library.
 * @param {Object}             props
 * @param {string}             props.name          - Field name.
 * @param {string}             props.type          - Field type.
 * @param {string}             props.tag           - Tag to render inside the Field component.
 * @param {ValidationFunction} [props.validate]    - Field validation function.
 * @param {boolean}            props.disabled      - Indicates whether Field is disabled.
 * @param {string}             [props.placeholder] - Field placeholder.
 */
const FormField = ({
    name,
    type,
    tag,
    validate,
    disabled,
    placeholder
}) => {
    const tags = {
        input: 'input',
        textarea: 'textarea'
    };
    const TagName = tags[tag] || 'input';

    return (
        <Field name={name} type={type} validate={validate}>
            {({ input, meta }) => {
                const fieldCss = cn({
                    [css.error]: validate && meta.touched && meta.error
                });

                return (
                    <div>
                        <TagName
                            {...input}
                            type={type}
                            className={fieldCss}
                            disabled={disabled}
                            placeholder={placeholder}
                        />
                    </div>
                );
            }}
        </Field>
    );
};

export default FormField;