import React from 'react';
import { render, mockStyleInjection, mockUseMediaQuery } from 'test-utils';
import { getAllTextBoxes, getGridCell } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import FormItemsRow from './FormItemsRow';

import { Form }      from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import red from '@material-ui/core/colors/red';

const renderFormItemsRow = ({ items = [], searchRowText = '', renderProps = {} } = {}) => {
    const onRowClickHandler = jest.fn();
    const onValidateHandler = jest.fn();
    const itemsRowText = 'Name Quantity Time';

    render(
        <Form
            onSubmit={jest.fn()}
            initialValues={{ items }}
            mutators={{...arrayMutators}}
            render={() => (
                <FormItemsRow
                    isClicked={false}
                    isDisabled={false}
                    name={'items[0]'}
                    onRowClick={onRowClickHandler}
                    onValidate={onValidateHandler}
                    {...renderProps}
                />
            )}
        />
    );

    return {
        itemsRow: getGridCell(searchRowText || itemsRowText),
        onRowClickHandler,
        onValidateHandler
    };
};

describe('FormItemsRow', () => {
    test('Empty items are displayed and "onRowClick" and "onValidate" handlers are called', () => {
        const { itemsRow, onRowClickHandler, onValidateHandler } = renderFormItemsRow();

        expect(itemsRow).toBeInTheDocument();

        userEvent.click(itemsRow);
        expect(onRowClickHandler).toBeCalled();
        expect(onValidateHandler).toBeCalled();
    });

    test('All items with value are displayed', () => {
        const { itemsRow } = renderFormItemsRow({
            items: [{ id: 1, name: '1', quantity: '1', time: '1' }],
            searchRowText: 'Name 1 Quantity 1 Time 1'
        });

        expect(itemsRow).toBeInTheDocument();
    });

    test('Part of the items with value are displayed', () => {
        const { itemsRow } = renderFormItemsRow({
            items: [{ id: 1, name: '1', quantity: '1' }],
            searchRowText: 'Name 1 Quantity 1 Time'
        });

        expect(itemsRow).toBeInTheDocument();
    });
});

describe('FormItemsRow and "isClicked" and "isDisabled" properties', () => {
    test('FormItemsRow is "red" when "isClicked" set to "true"', () => {
        const applyJSSRules = mockStyleInjection();
        const { itemsRow } = renderFormItemsRow({
            renderProps: { isClicked: true }
        });

        applyJSSRules();

        expect(itemsRow).toHaveStyle(`background-color: ${red[500]}`);
    });

    test('All fields of FormItemsRow are "disabled" when "isDisabled" set to "true"', () => {
        renderFormItemsRow({
            renderProps: { isDisabled: true }
        });

        getAllTextBoxes().forEach((field) =>{
            expect(field).toBeDisabled();
        });
    });
});

describe('Responsiveness of FormItemsRow', () => {
    test('Spacing of FormItemsRow children is "4px" for screen width less than 960px', () => {
        mockUseMediaQuery(900);
        const { itemsRow } = renderFormItemsRow();

        Array.from(itemsRow.children).map((element) => {
            expect(element).toHaveStyle('padding: 4px');
        });
    });

    test('Spacing of FormItemsRow children is "8px" for screen width more than 960px', () => {
        mockUseMediaQuery(1000);
        const { itemsRow } = renderFormItemsRow();

        Array.from(itemsRow.children).map((element) => {
            expect(element).toHaveStyle('padding: 8px');
        });
    });
});
