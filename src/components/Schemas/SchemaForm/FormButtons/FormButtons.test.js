import React from 'react';
import { render, mockStyleInjection } from 'test-utils';
import { getTabList, getButton, getButtonWithin } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import FormButtons from './FormButtons';
import customPrimaryColors from 'components/utils/customPrimaryColors';

const greenColor  = customPrimaryColors.light.green.main;
const yellowColor = customPrimaryColors.light.yellow.main;
const redColor    = customPrimaryColors.light.red.main;

const renderFormButtons = ({
    renderProps = {
        submit: {},
        reset: {},
        cancel: {},
    }
} = {}) => {
    const submitOnClick = jest.fn();
    const resetOnClick  = jest.fn();
    const cancelOnClick = jest.fn();

    render(
        <FormButtons
            submit={({ isDisabled: false, onClick: submitOnClick, ...renderProps.submit })}
            reset={({ isDisabled: false, onClick: resetOnClick, ...renderProps.reset })}
            cancel={({ isDisabled: false, onClick: cancelOnClick, ...renderProps.cancel })}
        />
    );

    return {
        schemaFormButtons: getTabList(),
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

describe('FormButtons', () => {
    test('FormButtons is displayed with three active buttons "Submit", "Reset" and "Cancel"', () => {
        const { schemaFormButtons } = renderFormButtons();

        expect(schemaFormButtons).toBeInTheDocument();
        expect(schemaFormButtons.childElementCount).toEqual(3);

        const submitButton = getButtonWithin(schemaFormButtons, 'Submit');
        expect(submitButton).toBeInTheDocument();
        expect(submitButton.className).toContain('MuiButton-outlined');

        const resetButton = getButtonWithin(schemaFormButtons, 'Reset');
        expect(resetButton).toBeInTheDocument();
        expect(resetButton.className).toContain('MuiButton-outlined');

        const cancelButton = getButtonWithin(schemaFormButtons, 'Cancel');
        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton.className).toContain('MuiButton-outlined');
    });

    test('All three buttons "Submit", "Reset" and "Cancel" have colors "green", "yellow" and "red"', () => {
        const applyJSSRules = mockStyleInjection();
        const { submit, reset, cancel } = renderFormButtons();

        applyJSSRules();

        expect(submit.button).toHaveStyle(`color: ${greenColor}`);
        expect(reset.button).toHaveStyle(`color: ${yellowColor}`);
        expect(cancel.button).toHaveStyle(`color: ${redColor}`);
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
            renderProps: {
                submit: { isDisabled: true },
                reset:  { isDisabled: true },
                cancel: { isDisabled: true }
            }
        });

        expect(schemaFormButtons).toBeInTheDocument();

        expect(submit.button).toBeInTheDocument();
        expect(submit.button).toBeDisabled();

        expect(reset.button).toBeInTheDocument();
        expect(reset.button).toBeDisabled();

        expect(cancel.button).toBeInTheDocument();
        expect(cancel.button).toBeDisabled();
    });

    test('All three buttons "Submit", "Reset" and "Cancel" are not clickable while disabled', () => {
        const { submit, reset, cancel } = renderFormButtons({
            renderProps: {
                submit: { isDisabled: true },
                reset:  { isDisabled: true },
                cancel: { isDisabled: true }
            }
        });

        userEvent.click(submit.button);
        expect(submit.onClick).toBeCalledTimes(0);
        expect(submit.button).toBeDisabled();

        userEvent.click(reset.button);
        expect(reset.onClick).toBeCalledTimes(0);
        expect(reset.button).toBeDisabled();

        userEvent.click(cancel.button);
        expect(cancel.onClick).toBeCalledTimes(0);
        expect(cancel.button).toBeDisabled();
    });
});
