import React from 'react';
import { render, screen, getByRole } from 'test-utils';
import userEvent from '@testing-library/user-event';

import FormField from './FormField';

import { Form } from 'react-final-form';

const getTextBox = (name) => getByRole('textbox', name);

const renderFormField = (renderProps) => {
    const label = 'FormField Label';
    const name  = 'FormFieldName';
    const initProps = { label, name };
    const { rerender } = render(
        <Form
            onSubmit={jest.fn()}
            render={() => <FormField {...initProps} {...renderProps} />}
        />
    );

    return {
        field: getTextBox(label),
        label,
        name,
        rerenderFormField: (rerenderProps) => {
            rerender(
                <Form
                    onSubmit={jest.fn()}
                    render={() => <FormField {...initProps} {...rerenderProps} />}
                />
            )
        }
    };
};

test('FormField is displayed with "label" and "name" props', () => {
    const { field, name } = renderFormField();

    expect(field).toBeInTheDocument();
    expect(field).toHaveAttribute('name', name);
});

describe('Property "placeholder" of FormField', () => {
    test('FormField is displayed with "placeholder"', () => {
        const { field } = renderFormField({ placeholder: 'FormField Placeholder' });

        expect(field).toBeInTheDocument();
        expect(field).toHaveAttribute('placeholder', 'FormField Placeholder');
    });

    test('FormField without "placeholder" is displayed and uses "label" instead', () => {
        const { field, label } = renderFormField();

        expect(field).toBeInTheDocument();
        expect(field).toHaveAttribute('placeholder', label);
    });
});

describe('Property "disabled" of FormField', () => {
    test('FormField without "disabled" specified is not disabled', () => {
        const { field } = renderFormField();

        expect(field).toBeInTheDocument();
        expect(field).toBeEnabled();
    });

    test('FormField with "disabled" set to "false" is not disabled', () => {
        const { field } = renderFormField({ disabled: false });

        expect(field).toBeInTheDocument();
        expect(field).toBeEnabled();
    });

    test('FormField with "disabled" set to "true" is disabled', () => {
        const { field } = renderFormField({ disabled: true });

        expect(field).toBeInTheDocument();
        expect(field).toBeDisabled();
    });
});

describe('Properties "multiline" and "rows" of FormField', () => {
    test('FormField without "multiline" specified is input', () => {
        const { field } = renderFormField();

        expect(field).toBeInTheDocument();
        expect(field).not.toHaveClass('MuiInputBase-inputMultiline');
        expect(field).toHaveAttribute('type', 'text');
    });

    test('FormField with "multiline" set to "false" is input', () => {
        const { field } = renderFormField({ multiline: false });

        expect(field).toBeInTheDocument();
        expect(field).not.toHaveClass('MuiInputBase-inputMultiline');
        expect(field).toHaveAttribute('type', 'text');
    });

    test('FormField with "multiline" set to "true" but without "rows" is textarea and has "1" row', () => {
        const { field } = renderFormField({ multiline: true });

        expect(field).toBeInTheDocument();
        expect(field).toHaveClass('MuiInputBase-inputMultiline');
        expect(field).not.toHaveAttribute('type');
        expect(field).toHaveAttribute('rows', '1');
    });

    test('FormField with "multiline" and "rows" set to "3" has "3" rows', () => {
        const { field } = renderFormField({ multiline: true, rows: 3 });

        expect(field).toBeInTheDocument();
        expect(field).toHaveAttribute('rows', '3');
    });

    test('FormField without "multiline" but with "rows" is input', () => {
        const { field } = renderFormField({ rows: 3 });

        expect(field).toBeInTheDocument();
        expect(field).not.toHaveClass('MuiInputBase-inputMultiline');
        expect(field).toHaveAttribute('type', 'text');
    });
});

describe('Property "validate" of FormField', () => {
    test('FormField without "validate" specified is not required', () => {
        const { field } = renderFormField();

        expect(field).toBeInTheDocument();
        expect(field).not.toHaveAttribute('required');
    });

    test('FormField with "validate" is required', () => {
        const { field } = renderFormField({ validate: jest.fn() });

        expect(field).toBeInTheDocument();
        expect(field).toHaveAttribute('required');
    });

    test('FormField with "validate" returns "false" is not displayed with an error', () => {
        const { field, rerenderFormField } = renderFormField({ validate: jest.fn(_ => false) });

        expect(field).toBeInTheDocument();
        expect(field).toHaveAttribute('aria-invalid', 'false');
        expect(field.parentElement).not.toHaveClass('Mui-error');

        rerenderFormField({ validate: jest.fn() });
        userEvent.tab();
        userEvent.tab();

        expect(field).toHaveAttribute('aria-invalid', 'false');
        expect(field.parentElement).not.toHaveClass('Mui-error');
    });

    test('FormField with "validate" returns "true" is displayed with an error', () => {
        const { field, rerenderFormField } = renderFormField({ validate: jest.fn(_ => true) });

        expect(field).toBeInTheDocument();

        rerenderFormField({ validate: jest.fn() });
        userEvent.tab();
        userEvent.tab();

        expect(field).toHaveAttribute('aria-invalid', 'true');
        expect(field.parentElement).toHaveClass('Mui-error');
    });
});
