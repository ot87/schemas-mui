import React from 'react';
import { render, screen, mockStyleInjection } from 'test-utils';
import userEvent from '@testing-library/user-event';

import SchemaFormButtons from 'components/SchemaForm/SchemaFormButtons/SchemaFormButtons';

import green  from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red    from '@material-ui/core/colors/red';

const renderSchemaFormButtons = (renderProps) => {
    const submitOnClick = jest.fn();
    const resetOnClick  = jest.fn();
    const cancelOnClick = jest.fn();

    render(
        <SchemaFormButtons
            submit={({ isDisabled: false, onClick: submitOnClick })}
            reset={({ isDisabled: false, onClick: resetOnClick })}
            cancel={({ isDisabled: false, onClick: cancelOnClick })}
            {...renderProps}
        />
    );

    return {
        schemaFormButtons: screen.getByRole('tablist'),
        submit: {
            button: screen.getByRole('button', { name: 'Submit' }),
            onClick: submitOnClick
        },
        reset: {
            button: screen.getByRole('button', { name: 'Reset' }),
            onClick: resetOnClick
        },
        cancel: {
            button: screen.getByRole('button', { name: 'Cancel' }),
            onClick: cancelOnClick
        }
    };
};

test('SchemaFormButtons with three active buttons "Submit", "Reset" and "Cancel" is displayed', () => {
    const { schemaFormButtons, submit, reset, cancel } = renderSchemaFormButtons();

    expect(schemaFormButtons).toBeInTheDocument();

    expect(submit.button).toBeInTheDocument();
    expect(submit.button.className).toContain('MuiButton-outlined');

    expect(reset.button).toBeInTheDocument();
    expect(reset.button.className).toContain('MuiButton-outlined');

    expect(cancel.button).toBeInTheDocument();
    expect(cancel.button.className).toContain('MuiButton-outlined');
});

test('All three buttons "Submit", "Reset" and "Cancel" have colors "green", "yellow" and "red"', () => {
    const applyJSSRules = mockStyleInjection();
    const { submit, reset, cancel } = renderSchemaFormButtons();

    applyJSSRules();

    expect(submit.button).toHaveStyle(`color: ${green[600]}`);
    expect(reset.button).toHaveStyle(`color: ${yellow[600]}`);
    expect(cancel.button).toHaveStyle(`color: ${red[600]}`);
});

test('All three buttons "Submit", "Reset" and "Cancel" are clickable', () => {
    const { submit, reset, cancel } = renderSchemaFormButtons();

    userEvent.click(submit.button);
    expect(submit.onClick).toBeCalledTimes(1);

    userEvent.click(reset.button);
    expect(reset.onClick).toBeCalledTimes(1);

    userEvent.click(cancel.button);
    expect(cancel.onClick).toBeCalledTimes(1);
});

test('All three buttons "Submit", "Reset" and "Cancel" are disabled', () => {
    const { schemaFormButtons, submit, reset, cancel } = renderSchemaFormButtons({
        submit: { isDisabled: true },
        reset: { isDisabled: true },
        cancel: { isDisabled: true }
    });

    expect(schemaFormButtons).toBeInTheDocument();

    expect(submit.button).toBeInTheDocument();
    expect(submit.button).toHaveClass('Mui-disabled');

    expect(reset.button).toBeInTheDocument();
    expect(reset.button).toHaveClass('Mui-disabled');

    expect(cancel.button).toBeInTheDocument();
    expect(cancel.button).toHaveClass('Mui-disabled');
});

test('All three buttons "Submit", "Reset" and "Cancel" are not clickable while disabled', () => {
    const { submit, reset, cancel } = renderSchemaFormButtons({
        submit: { isDisabled: true },
        reset: { isDisabled: true },
        cancel: { isDisabled: true }
    });


    userEvent.click(submit.button);
    expect(submit.onClick).toBeCalledTimes(0);
    expect(submit.button).toHaveClass('Mui-disabled');

    userEvent.click(reset.button);
    expect(reset.onClick).toBeCalledTimes(0);
    expect(reset.button).toHaveClass('Mui-disabled');

    userEvent.click(cancel.button);
    expect(cancel.onClick).toBeCalledTimes(0);
    expect(cancel.button).toHaveClass('Mui-disabled');
});
