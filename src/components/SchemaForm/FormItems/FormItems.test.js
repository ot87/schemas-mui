import React from 'react';
import { render, getAllGridCells, getAllTextBoxes, mockStyleInjection } from 'test-utils';
import userEvent from '@testing-library/user-event';

import FormItems from './FormItems';

import { Form }      from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import red from '@material-ui/core/colors/red';

const renderFormItems = (renderProps = {}) => {
    const onItemsRowClickHandler = jest.fn();
    const onValidateHandler = jest.fn();
    const initItems = [
        { id: 1, name: '1', quantity: '1', time: '1' },
        { id: 2, name: '1', quantity: '1', time: '1' }
    ];

    render(
        <Form
            onSubmit={jest.fn()}
            initialValues={{ items: initItems }}
            mutators={{...arrayMutators}}
            render={({ initialValues }) => (
                <FormItems
                    initItems={initialValues.items}
                    isRemoveClicked={false}
                    itemsIdsToRemove={[]}
                    onItemsRowClick={onItemsRowClickHandler}
                    onValidate={onValidateHandler}
                    {...renderProps}
                />
            )}
        />
    );

    return {
        itemsRows: getAllGridCells('Name 1 Quantity 1 Time 1'),
        onItemsRowClickHandler,
        onValidateHandler
    };
};

describe('FormItems and items', () => {
    test('Both items rows are displayed and "onItemsRowClick" and "onValidate" handlers are called', () => {
        const { itemsRows, onItemsRowClickHandler, onValidateHandler } = renderFormItems();

        expect(itemsRows).toHaveLength(2);
        itemsRows.map((row, key) => {
            expect(row).toBeInTheDocument();

            userEvent.click(row);
            expect(onItemsRowClickHandler).toBeCalledWith(key);
            expect(onValidateHandler).toBeCalled();
        });
    });
});

describe('FormItems and "isRemoveClicked" and "itemsIdsToRemove" properties', () => {
    test('All fields of FormItems are "disabled" when "isRemoveClicked" set to "true"', () => {
        renderFormItems({ isRemoveClicked: true });

        getAllTextBoxes().forEach((field) =>{
            expect(field).toBeDisabled();
        });
    });

    test('Second items row is "red" when its id is in "itemsIdsToRemove"', () => {
        const applyJSSRules = mockStyleInjection();
        const { itemsRows } = renderFormItems({ itemsIdsToRemove: [1] });

        applyJSSRules();

        expect(itemsRows[0]).not.toHaveStyle(`background-color: ${red[500]}`);
        expect(itemsRows[1]).toHaveStyle(`background-color: ${red[500]}`);
    });
});
