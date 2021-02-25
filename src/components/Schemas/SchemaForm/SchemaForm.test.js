import React from 'react';
import { render, mockUseMediaQuery } from 'test-utils';
import {
    getTable, getGridCell, getAllGridCells, queryGridCell,
    getGridCellWithin, queryGridCellWithin,
    getButton, queryButton, getTextBox, getAllTextBoxes, getTextBoxWithin
} from 'test-helpers';
import userEvent from '@testing-library/user-event';

import SchemaForm from './SchemaForm';

const renderSchemaForm = (items = null) => {
    const schema = {
        id: '1',
        name: 'Schema 1',
        description: '',
        items: items || [{ id: '1', name: '1', quantity: '1', time: '' }]
    };
    const onSubmitHandler = jest.fn();
    const onCancelHandler = jest.fn();

    render(
        <SchemaForm
            schema={schema}
            onSubmit={onSubmitHandler}
            onCancel={onCancelHandler}
        />
    );

    return {
        form: getTable(),
        removeButton: schema.items.length ? getButton('Remove') : queryButton('Remove'),
        onSubmitHandler,
        onCancelHandler
    };
};

describe('SchemaForm', () => {
    test('Form with FormButtons and FormItemsControls is displayed', () => {
        const { form } = renderSchemaForm();

        expect(form).toBeInTheDocument();

        const nameField = getTextBoxWithin(form, 'Schema Name');
        const descField = getTextBoxWithin(form, 'Schema Description');

        expect(nameField).toBeInTheDocument();
        expect(descField).toBeInTheDocument();

        expect(nameField).toHaveValue('Schema 1');
        expect(descField).not.toHaveValue();

        expect(getGridCellWithin(form, 'Name 1 Quantity 1 Time')).toBeInTheDocument();

        expect(getButton('Submit')).toBeInTheDocument();
        expect(getButton('Reset')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();

        expect(getButton('Add')).toBeInTheDocument();
        expect(getButton('Remove')).toBeInTheDocument();
    });

    test('Form without items row and "Remove" button is displayed', () => {
        const { form, removeButton } = renderSchemaForm([]);

        expect(form).toBeInTheDocument();

        const nameField = getTextBoxWithin(form, 'Schema Name');
        const descField = getTextBoxWithin(form, 'Schema Description');

        expect(nameField).toBeInTheDocument();
        expect(descField).toBeInTheDocument();

        expect(nameField).toHaveValue('Schema 1');
        expect(descField).not.toHaveValue();

        expect(queryGridCellWithin(form, 'Name Quantity Time')).not.toBeInTheDocument();

        expect(getButton('Submit')).toBeInTheDocument();
        expect(getButton('Reset')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();

        expect(getButton('Add')).toBeInTheDocument();
        expect(removeButton).not.toBeInTheDocument();
    });

    test('"onSubmit" and "onCancel" handlers are called', () => {
        const { onSubmitHandler, onCancelHandler } = renderSchemaForm();

        userEvent.click(getButton('Submit'));
        expect(onSubmitHandler).toBeCalled();

        userEvent.click(getButton('Cancel'));
        expect(onCancelHandler).toBeCalled();
    });

    test('"Reset" button resets edited Form', () => {
        renderSchemaForm();
        const descField = getTextBox('Schema Description');
        const timeField = getTextBox('Time');

        userEvent.type(descField, '1');
        expect(descField).toHaveValue('1');

        userEvent.type(timeField, '1');
        expect(timeField).toHaveValue('1');

        expect(getGridCell('Name 1 Quantity 1 Time 1')).toBeInTheDocument();

        userEvent.click(getButton('Reset'));
        expect(descField).not.toHaveValue();
        expect(getGridCell('Name 1 Quantity 1 Time')).toBeInTheDocument();
        expect(queryGridCell('Name 1 Quantity 1 Time 1')).not.toBeInTheDocument();
    });

    test('"Add" button adds items row', () => {
        renderSchemaForm();

        expect(queryGridCell('Name Quantity Time')).not.toBeInTheDocument();
        userEvent.click(getButton('Add'));
        expect(getGridCell('Name Quantity Time')).toBeInTheDocument();
        expect(getAllGridCells()).toHaveLength(2);
    });

    test('"Add" button adds items row when there are no items rows', () => {
        renderSchemaForm([]);

        expect(queryGridCell('Name Quantity Time')).not.toBeInTheDocument();
        userEvent.click(getButton('Add'));
        expect(getGridCell('Name Quantity Time')).toBeInTheDocument();
        expect(getAllGridCells()).toHaveLength(1);
    });

    test('"Remove" button shows and hides "All" button', () => {
        const { removeButton } = renderSchemaForm();

        // enable remove mode and show All button
        userEvent.click(removeButton);
        expect(getButton('All')).toBeInTheDocument();

        // disable remove mode and hide All button
        userEvent.click(removeButton);
        expect(queryButton('All')).not.toBeInTheDocument();
    });

    test('"Remove" button disables and enables Form, Form buttons and "Add" button', () => {
        const { removeButton } = renderSchemaForm();

        // Submit and Cancel buttons are enabled
        expect(getButton('Submit')).toBeEnabled();
        expect(getButton('Cancel')).toBeEnabled();
        // Reset button stays disabled at start
        expect(getButton('Reset')).toBeDisabled();
        // Add button is enabled
        expect(getButton('Add')).toBeEnabled();

        // activate remove mode
        userEvent.click(removeButton);

        // all form's fields are disabled
        getAllTextBoxes().forEach((field) => {
            expect(field).toBeDisabled();
        });

        // buttons are disabled
        expect(getButton('Submit')).toBeDisabled();
        expect(getButton('Reset')).toBeDisabled();
        expect(getButton('Cancel')).toBeDisabled();
        expect(getButton('Add')).toBeDisabled();

        // deactivate remove mode
        userEvent.click(removeButton);
        // all form's fields are disabled
        getAllTextBoxes().forEach(textbox => {
            expect(textbox).toBeEnabled();
        });

        // Submit and Cancel buttons are enabled
        expect(getButton('Submit')).toBeEnabled();
        expect(getButton('Cancel')).toBeEnabled();
        // Reset button stays disabled because the form's data is the same
        expect(getButton('Reset')).toBeDisabled();
        // Add button is enabled
        expect(getButton('Add')).toBeEnabled();
    });
});

describe('Responsiveness of Form', () => {
    test('Margin of container of Form is "-8px" for screen width less than 600px', () => {
        mockUseMediaQuery(500);
        const { form } = renderSchemaForm();

        expect(form.children.item(0)).toHaveStyle('margin: -8px');
    });

    test('Margin of container of Form is "-12px" for screen width more than 600px', () => {
        mockUseMediaQuery(700);
        const { form } = renderSchemaForm();

        expect(form.children.item(0)).toHaveStyle('margin: -12px');
    });
});

describe('Remove, check and uncheck items rows', () => {
    test('All rows are checked by "All" button and are removed', () => {
        const { removeButton } = renderSchemaForm();

        // add a new items row
        userEvent.click(getButton('Add'));

        // items rows are not checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).not.toContain('clicked');
        });

        // activate remove mode
        userEvent.click(removeButton);

        // select all items rows by "All" button
        userEvent.click(getButton('All'));
        // items rows are checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).toContain('clicked');
        });

        // remove items rows and deactivate remove mode
        userEvent.click(removeButton);
        // both items rows are deleted
        expect(queryGridCell()).not.toBeInTheDocument();
    });

    test('All rows are checked by user and are removed', () => {
        const { removeButton } = renderSchemaForm();

        // add a new items row
        userEvent.click(getButton('Add'));
        // activate remove mode
        userEvent.click(removeButton);

        // click items rows
        getAllGridCells().forEach((itemsRow) => {
            userEvent.click(itemsRow);
        });
        // items rows are checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).toContain('clicked');
        });

        // remove items rows and deactivate remove mode
        userEvent.click(removeButton);
        // both items rows are deleted
        expect(queryGridCell()).not.toBeInTheDocument();
    });

    test('One row is checked by user, another by "All" button and are removed', () => {
        const { removeButton } = renderSchemaForm();

        // add a new items row
        userEvent.click(getButton('Add'));
        // activate remove mode
        userEvent.click(removeButton);

        const itemsRows = getAllGridCells();
        // click the first items row
        userEvent.click(itemsRows[0]);
        // select all items rows by "All" button
        userEvent.click(getButton('All'));

        // items rows are checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).toContain('clicked');
        });

        // remove items rows and deactivate remove mode
        userEvent.click(removeButton);
        // both items rows are deleted
        expect(queryGridCell()).not.toBeInTheDocument();
    });

    test('All rows are checked by "All" button, one is unchecked and one is removed', () => {
        const { removeButton } = renderSchemaForm();

        // add a new items row
        userEvent.click(getButton('Add'));
        // activate remove mode
        userEvent.click(removeButton);

        // select all items rows by "All" button
        userEvent.click(getButton('All'));
        // uncheck the first items row
        userEvent.click(getGridCell('Name 1 Quantity 1 Time'));
        // the first items row is unchecked
        expect(getGridCell('Name 1 Quantity 1 Time').className).not.toContain('clicked');
        // the second items row is checked
        expect(getGridCell('Name Quantity Time').className).toContain('clicked');

        // remove items row and deactivate remove mode
        userEvent.click(removeButton);
        // the first items row is not deleted
        expect(getGridCell('Name 1 Quantity 1 Time')).toBeInTheDocument();
        // the second items row is deleted
        expect(queryGridCell('Name Quantity Time')).not.toBeInTheDocument();
    });
});

describe('Check and uncheck items rows without removal', () => {
    test('All items rows are checked/unchecked by "All" button', () => {
        const { removeButton } = renderSchemaForm();

        // add a new items row
        userEvent.click(getButton('Add'));
        // activate remove mode
        userEvent.click(removeButton);

        // select all items rows by "All" button
        userEvent.click(getButton('All'));
        // items rows are checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).toContain('clicked');
        });

        // uncheck all items rows by "All" button
        userEvent.click(getButton('All'));
        // items rows are not checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).not.toContain('clicked');
        });

        // deactivate remove mode
        userEvent.click(removeButton);
        // both items rows are not deleted
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow).toBeInTheDocument();
        });
    });

    test('All items rows are checked/unchecked by user', () => {
        const { removeButton } = renderSchemaForm();

        // add a new items row
        userEvent.click(getButton('Add'));
        // activate remove mode
        userEvent.click(removeButton);

        // click all items rows
        getAllGridCells().forEach((itemsRow) => {
            userEvent.click(itemsRow);
        });
        // items rows are checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).toContain('clicked');
        });

        // unclick all items rows
        getAllGridCells().forEach((itemsRow) => {
            userEvent.click(itemsRow);
        });
        // items rows are not checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).not.toContain('clicked');
        });

        // deactivate remove mode
        userEvent.click(removeButton);
        // both items rows are not deleted
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow).toBeInTheDocument();
        });
    });

    test('All items rows are checked by user and unchecked by "All" button', () => {
        const { removeButton } = renderSchemaForm();

        // add a new items row
        userEvent.click(getButton('Add'));
        // activate remove mode
        userEvent.click(removeButton);

        // click all items rows
        getAllGridCells().forEach((itemsRow) => {
            userEvent.click(itemsRow);
        });
        // items rows are checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).toContain('clicked');
        });

        // uncheck all items rows by "All" button
        userEvent.click(getButton('All'));
        // items rows are not checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).not.toContain('clicked');
        });

        // deactivate remove mode
        userEvent.click(removeButton);
        // both items rows are not deleted
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow).toBeInTheDocument();
        });
    });

    test('All items rows are checked by "All" button and unchecked by user', () => {
        const { removeButton } = renderSchemaForm();

        // add a new items row
        userEvent.click(getButton('Add'));
        // activate remove mode
        userEvent.click(removeButton);

        // select all items rows by "All" button
        userEvent.click(getButton('All'));
        // items rows are checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).toContain('clicked');
        });

        // click all items rows
        getAllGridCells().forEach((itemsRow) => {
            userEvent.click(itemsRow);
        });
        // items rows are not checked
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow.className).not.toContain('clicked');
        });

        // deactivate remove mode
        userEvent.click(removeButton);
        // both items rows are not deleted
        getAllGridCells().forEach((itemsRow) => {
            expect(itemsRow).toBeInTheDocument();
        });
    });
});
