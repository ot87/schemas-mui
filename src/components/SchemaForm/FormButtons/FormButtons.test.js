import React from 'react';
import { render, getByRole, getButton, mockStyleInjection } from 'test-utils';
import userEvent from '@testing-library/user-event';

import FormButtons from './FormButtons';

import green  from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red    from '@material-ui/core/colors/red';

const renderFormButtons = (renderProps) => {
    const submitOnClick = jest.fn();
    const resetOnClick  = jest.fn();
    const cancelOnClick = jest.fn();

    render(
        <FormButtons
            submit={({ isDisabled: false, onClick: submitOnClick })}
            reset={({ isDisabled: false, onClick: resetOnClick })}
            cancel={({ isDisabled: false, onClick: cancelOnClick })}
            {...renderProps}
        />
    );

    return {
        schemaFormButtons: getByRole('tablist'),
        submit: {
            button: getButton('Submit'),
            onClick: submitOnClick
        },
        reset: {
            button: getButton('Reset'),
            onClick: resetOnClick
        },
        cancel: {
            button: getButton('Cancel'),
            onClick: cancelOnClick
        }
    };
};

test('FormButtons is displayed with three active buttons "Submit", "Reset" and "Cancel"', () => {
    const { schemaFormButtons, submit, reset, cancel } = renderFormButtons();

    expect(schemaFormButtons).toBeInTheDocument();
    expect(schemaFormButtons.childElementCount).toEqual(3);

    expect(schemaFormButtons).toContainElement(submit.button);
    expect(submit.button).toBeInTheDocument();
    expect(submit.button.className).toContain('MuiButton-outlined');

    expect(schemaFormButtons).toContainElement(reset.button);
    expect(reset.button).toBeInTheDocument();
    expect(reset.button.className).toContain('MuiButton-outlined');

    expect(schemaFormButtons).toContainElement(cancel.button);
    expect(cancel.button).toBeInTheDocument();
    expect(cancel.button.className).toContain('MuiButton-outlined');
});

test('All three buttons "Submit", "Reset" and "Cancel" have colors "green", "yellow" and "red"', () => {
    const applyJSSRules = mockStyleInjection();
    const { submit, reset, cancel } = renderFormButtons();

    applyJSSRules();

    expect(submit.button).toHaveStyle(`color: ${green[600]}`);
    expect(reset.button).toHaveStyle(`color: ${yellow[600]}`);
    expect(cancel.button).toHaveStyle(`color: ${red[600]}`);
});

test('All three buttons "Submit", "Reset" and "Cancel" are clickable', () => {
    const { submit, reset, cancel } = renderFormButtons();

    userEvent.click(submit.button);
    expect(submit.onClick).toBeCalledTimes(1);

    userEvent.click(reset.button);
    expect(reset.onClick).toBeCalledTimes(1);

    userEvent.click(cancel.button);
    expect(cancel.onClick).toBeCalledTimes(1);
});

test('All three buttons "Submit", "Reset" and "Cancel" are disabled', () => {
    const { schemaFormButtons, submit, reset, cancel } = renderFormButtons({
        submit: { isDisabled: true },
        reset:  { isDisabled: true },
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
    const { submit, reset, cancel } = renderFormButtons({
        submit: { isDisabled: true },
        reset:  { isDisabled: true },
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
