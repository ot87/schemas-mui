import React from 'react';
import { render, mockStyleInjection } from 'test-utils';
import { getTabList, getButton, getButtonWithin, queryButtonWithin } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import FormItemsControls from './FormItemsControls';

import green from '@material-ui/core/colors/green';
import red   from '@material-ui/core/colors/red';

const renderFormItemsControls = ({ renderProps = {} } = {}) => {
    const addOnClick       = jest.fn();
    const removeOnClick    = jest.fn();
    const removeAllOnClick = jest.fn();
    const initProps        = {
        isRemoveClicked:    false,
        showRemove:         false,
        isRemoveAllClicked: false,
        addOnClick:         addOnClick,
        removeOnClick:      removeOnClick,
        removeAllOnClick:   removeAllOnClick
    };
    const { rerender } = render(<FormItemsControls {...initProps} {...renderProps} />);

    return {
        itemsControls: getTabList(),
        addOnClick,
        removeOnClick,
        removeAllOnClick,
        rerenderItemsControls: rerenderProps => {
            rerender(<FormItemsControls {...initProps} {...rerenderProps} />);
        }
    };
};

describe('FormItemsControls and "Add" button', () => {
    test('"Add" button is displayed', () => {
        const { itemsControls } = renderFormItemsControls();

        expect(itemsControls).toBeInTheDocument();
        expect(itemsControls.childElementCount).toEqual(1);

        const addButton = getButtonWithin(itemsControls, 'Add');
        expect(addButton).toBeInTheDocument();
        expect(addButton.className).toContain('MuiButton-outlined');
    });

    test('"Add" button is clicked', () => {
        const { addOnClick } = renderFormItemsControls();

        userEvent.click(getButton('Add'));
        expect(addOnClick).toBeCalledTimes(1);
    });

    test('"Add" button is "green"', () => {
        const applyJSSRules = mockStyleInjection();
        renderFormItemsControls();

        applyJSSRules();

        expect(getButton('Add')).toHaveStyle(`color: ${green[600]}`);
    });

    test('"Add" button is disabled', () => {
        const { itemsControls } = renderFormItemsControls({
            renderProps: { isRemoveClicked: true }
        });

        expect(itemsControls).toBeInTheDocument();

        const addButton = getButton('Add');
        expect(addButton).toBeInTheDocument();
        expect(addButton).toBeDisabled();
    });

    test('"Add" button is not clickable while disabled', () => {
        const { addOnClick } = renderFormItemsControls({
            renderProps: { isRemoveClicked: true }
        });

        const addButton = getButton('Add');
        userEvent.click(addButton);
        expect(addOnClick).toBeCalledTimes(0);
        expect(addButton).toBeDisabled();
    });

    test('"Remove" and "All" buttons are not displayed', () => {
        const { itemsControls } = renderFormItemsControls();

        expect(queryButtonWithin(itemsControls, 'Remove')).not.toBeInTheDocument();
        expect(queryButtonWithin(itemsControls, 'All')).not.toBeInTheDocument();
    });
});

describe('FormItemsControls and "Add" and "Remove" buttons', () => {
    test('"Add" and "Remove" buttons are displayed', () => {
        const { itemsControls } = renderFormItemsControls({
            renderProps: { showRemove: true }
        });

        expect(itemsControls).toBeInTheDocument();
        expect(itemsControls.childElementCount).toEqual(2);

        const addButton = getButtonWithin(itemsControls, 'Add');
        expect(addButton).toBeInTheDocument();
        expect(addButton.className).toContain('MuiButton-outlined');

        const removeButton = getButtonWithin(itemsControls, 'Remove');
        expect(removeButton).toBeInTheDocument();
        expect(removeButton.className).toContain('MuiButton-outlined');
    });

    test('"Remove" button is clicked', () => {
        const { removeOnClick } = renderFormItemsControls({
            renderProps: { showRemove: true }
        });

        userEvent.click(getButton('Remove'));
        expect(removeOnClick).toBeCalledTimes(1);
    });

    test('"Remove" button is "red"', () => {
        const applyJSSRules = mockStyleInjection();
        renderFormItemsControls({ renderProps: { showRemove: true } });

        applyJSSRules();

        expect(getButton('Remove')).toHaveStyle(`color: ${red[600]}`);
    });

    test('"Remove" button is toggled', () => {
        const { itemsControls } = renderFormItemsControls({
            renderProps: { isRemoveClicked: true, showRemove: true }
        });

        expect(itemsControls).toBeInTheDocument();

        const removeButton = getButton('Remove');
        expect(removeButton).toBeInTheDocument();
        expect(removeButton.className).toContain('MuiButton-contained');
    });

    test('"All" button is not displayed', () => {
        const { itemsControls, rerenderItemsControls } = renderFormItemsControls({
            renderProps: { isRemoveClicked: true }
        });

        expect(queryButtonWithin(itemsControls, 'All')).not.toBeInTheDocument();

        rerenderItemsControls({ showRemove: true });

        expect(queryButtonWithin(itemsControls, 'All')).not.toBeInTheDocument();
    });
});

describe('FormItemsControls and "Add", "Remove" and "All" buttons', () => {
    test('All three buttons are displayed', () => {
        const { itemsControls } = renderFormItemsControls({
            renderProps: { isRemoveClicked: true, showRemove: true }
        });

        expect(itemsControls).toBeInTheDocument();
        expect(itemsControls.childElementCount).toEqual(3);

        const addButton = getButtonWithin(itemsControls, 'Add');
        expect(addButton).toBeInTheDocument();
        expect(addButton.className).toContain('MuiButton-outlined');

        const removeButton = getButtonWithin(itemsControls, 'Remove');
        expect(removeButton).toBeInTheDocument();
        expect(removeButton.className).toContain('MuiButton-contained');

        const allButton = getButtonWithin(itemsControls, 'All');
        expect(allButton).toBeInTheDocument();
        expect(allButton.className).toContain('MuiButton-outlined');
    });

    test('"All" button is clicked', () => {
        const { removeAllOnClick } = renderFormItemsControls({
            renderProps: { isRemoveClicked: true, showRemove: true }
        });

        userEvent.click(getButton('All'));
        expect(removeAllOnClick).toBeCalledTimes(1);
    });

    test('"All" button is "red"', () => {
        const applyJSSRules = mockStyleInjection();
        renderFormItemsControls({
            renderProps: { isRemoveClicked: true, showRemove: true }
        });

        applyJSSRules();

        expect(getButton('All')).toHaveStyle(`color: ${red[600]}`);
    });

    test('"All" button is toggled', () => {
        const { itemsControls } = renderFormItemsControls({
            renderProps: {
                isRemoveClicked: true,
                showRemove: true,
                isRemoveAllClicked: true
            }
        });

        expect(itemsControls).toBeInTheDocument();

        const removeButton = getButton('All');
        expect(removeButton).toBeInTheDocument();
        expect(removeButton.className).toContain('MuiButton-contained');
    });
});
