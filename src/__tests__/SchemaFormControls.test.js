import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

import SchemaFormContainer from '../components/SchemaForm/SchemaFormContainer';

const renderSchemaForm = () => {
    const schema = {
        id: 1,
        name: 'Schema 1',
        items: [{
            id: 1,
            name: 'Name 1',
            quantity: 'Quantity 1'
        }]
    };
    const onSubmitHandler = jest.fn(),
          onCancelHandler = jest.fn();

    render(<SchemaFormContainer schema={schema} onSubmit={onSubmitHandler} onCancel={onCancelHandler} />);

    const addPlate    = screen.getByRole('button', { name: 'Add' }),
          removePlate = screen.getByRole('button', { name: 'Remove' }),
          submitPlate = screen.getByRole('button', { name: 'Submit' }),
          resetPlate  = screen.getByRole('button', { name: 'Reset' }),
          cancelPlate = screen.getByRole('button', { name: 'Cancel' });

    return {
        addPlate,
        removePlate,
        submitPlate,
        resetPlate,
        cancelPlate
    };
};

test('form is displayed with items Form and Form Control buttons; Add Plate adds items row', () => {
    const { addPlate, removePlate, submitPlate, resetPlate, cancelPlate } = renderSchemaForm();

    // check that items row is displayed
    expect(screen.getByDisplayValue('Name 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Quantity 1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Time')).toBeInTheDocument();

    expect(screen.getAllByRole('row').length).toBe(1);

    // check that Submit, Reset and Cancel Plates are displayed
    expect(submitPlate).toBeInTheDocument();
    expect(resetPlate ).toBeInTheDocument();
    expect(cancelPlate).toBeInTheDocument();

    // check that Add and Remove Plates are displayed
    expect(addPlate).toBeInTheDocument();
    expect(addPlate).toHaveClass('greenPlate');

    expect(removePlate).toBeInTheDocument();
    expect(removePlate).toHaveClass('redPlate');

    // add a new row
    userEvent.click(addPlate);

    const allRows = screen.getAllByRole('row');
    expect(allRows.length).toBe(2);
    expect(allRows[1]).toStrictEqual(screen.getByRole('row', { name: '' }));
});

test('Remove Plate adds All Plate and disables Form, Form buttons and Add Plate', () => {
    const { addPlate, removePlate, submitPlate, resetPlate, cancelPlate } = renderSchemaForm();

    // check that Submit and Cancel Plates are enabled
    expect(submitPlate).not.toHaveClass('disabledPlate');
    expect(cancelPlate).not.toHaveClass('disabledPlate');

    // check that Reset Plate stays disabled at start
    expect(resetPlate).toHaveClass('disabledPlate');

    // activate remove mode
    userEvent.click(removePlate);
    expect(removePlate).toHaveClass('redPlate toggledPlate redTheme');

    // check that All Plate is displayed
    const allPlate = screen.getByRole('button', { name: 'All' });
    expect(allPlate).toBeInTheDocument();
    expect(allPlate).toHaveClass('redPlate');

    // check that form is disabled
    screen.getAllByRole('textbox').forEach(textbox => {
        expect(textbox).toBeDisabled();
    });
    screen.getAllByRole('row').forEach(row => {
        expect(row).toHaveClass('remove');
    });

    // check that Submit, Reset and Cancel Plates are disabled
    expect(submitPlate).toHaveClass('disabledPlate');
    expect(resetPlate ).toHaveClass('disabledPlate');
    expect(cancelPlate).toHaveClass('disabledPlate');

    // Add Plate is disabled
    expect(addPlate).toHaveClass('disabledPlate');

    // deactivate remove mode
    userEvent.click(removePlate);
    expect(removePlate).not.toHaveClass('toggledPlate redTheme');

    // chceck that All plate isn't displayed
    expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument();

    // check that form is enabled
    screen.getAllByRole('textbox').forEach(textbox => {
        expect(textbox).toBeEnabled();
    });
    screen.getAllByRole('row').forEach(row => {
        expect(row).not.toHaveClass('remove');
    });

    // check that Submit and Cancel Plates are enabled
    expect(submitPlate).not.toHaveClass('disabledPlate');
    expect(cancelPlate).not.toHaveClass('disabledPlate');

    // check that Reset Plate stays disabled because the form is the same
    expect(resetPlate).toHaveClass('disabledPlate');

    // Add Plate is enabled
    expect(addPlate).not.toHaveClass('disabledPlate');
});

test('items row is checked/unchecked and removed by Remove Plate', () => {
    const { addPlate, removePlate } = renderSchemaForm();

    // add a new row
    userEvent.click(addPlate);
    expect(screen.getAllByRole('row').length).toBe(2);

    // activate remove mode
    userEvent.click(removePlate);

    // click the added row with empty items
    const addedRow = screen.getByRole('row', { name: '' });
    userEvent.click(addedRow);

    // check that the row is checked
    expect(addedRow).toHaveClass('clickedItemsRow');

    // click the row to uncheck its deletion
    userEvent.click(addedRow);

    // check that the row is unchecked
    expect(addedRow).not.toHaveClass('clickedItemsRow');

    // deactivate remove mode
    userEvent.click(removePlate);

    // items rows count is the same
    expect(screen.getAllByRole('row').length).toBe(2);

    // activate remove mode
    userEvent.click(removePlate);

    // click the added row with empty items
    userEvent.click(addedRow);

    // deactivate remove mode
    userEvent.click(removePlate);

    // check that row is deleted
    expect(addedRow).not.toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBe(1);
});

test('All Plate is checked/unchecked when all rows are checked/unchecked', () => {
    const { addPlate, removePlate } = renderSchemaForm();

    // add two new rows
    userEvent.click(addPlate);
    userEvent.click(addPlate);
    const itemsRows = screen.getAllByRole('row');
    expect(itemsRows.length).toBe(3);

    // activate remove mode
    userEvent.click(removePlate);

    // check that All Plate is unchecked
    const allPlate = screen.getByRole('button', { name: 'All' });
    expect(allPlate).not.toHaveClass('toggledPlate redTheme');

    // click two rows
    userEvent.click(itemsRows[0]);
    userEvent.click(itemsRows[1]);

    // check that All Plate is unchecked
    expect(allPlate).not.toHaveClass('toggledPlate redTheme');

    // click the last row
    userEvent.click(itemsRows[2]);

    // check that All Plate is checked
    expect(allPlate).toHaveClass('toggledPlate redTheme');

    // click one row
    userEvent.click(itemsRows[0]);

    // check that All Plate is unchecked
    expect(allPlate).not.toHaveClass('toggledPlate redTheme');

    // click the other checked rows
    userEvent.click(itemsRows[1]);
    userEvent.click(itemsRows[2]);

    // check that All Plate is unchecked
    expect(allPlate).not.toHaveClass('toggledPlate redTheme');

    // deactivate remove mode
    userEvent.click(removePlate);

    // items rows count is the same
    expect(screen.getAllByRole('row').length).toBe(3);
});

test('two rows are added, all rows and All Plate are checked/unchecked by All Plate', () => {
    const { addPlate, removePlate } = renderSchemaForm();

    // add two new rows
    userEvent.click(addPlate);
    userEvent.click(addPlate);
    const itemsRows = screen.getAllByRole('row');
    expect(itemsRows.length).toBe(3);

    // activate remove mode
    userEvent.click(removePlate);

    // check that All plate is unchecked
    const allPlate = screen.getByRole('button', { name: 'All' });
    expect(allPlate).not.toHaveClass('toggledPlate redTheme');

    // check that all rows are unchecked
    itemsRows.forEach(row => {
        expect(row).not.toHaveClass('clickedItemsRow');
    });

    // click All Plate
    userEvent.click(allPlate);

    // check that All plate is checked
    expect(allPlate).toHaveClass('toggledPlate redTheme');

    // check that all rows are checked
    itemsRows.forEach(row => {
        expect(row).toHaveClass('clickedItemsRow');
    });

    // click All Plate
    userEvent.click(allPlate);

    // check that All plate is unchecked
    expect(allPlate).not.toHaveClass('toggledPlate redTheme');

    // check that all rows are unchecked
    itemsRows.forEach(row => {
        expect(row).not.toHaveClass('clickedItemsRow');
    });

    // deactivate remove mode
    userEvent.click(removePlate);

    // items rows count is the same
    expect(screen.getAllByRole('row').length).toBe(3);
});

test('two rows are added, all rows are checked by user and unchecked by All Plate', () => {
    const { addPlate, removePlate } = renderSchemaForm();

    // add two new rows
    userEvent.click(addPlate);
    userEvent.click(addPlate);
    const itemsRows = screen.getAllByRole('row');
    expect(itemsRows.length).toBe(3);

    // activate remove mode
    userEvent.click(removePlate);

    // click all the rows
    itemsRows.forEach(row => {
        userEvent.click(row);
    });

    // check that all rows are checked
    itemsRows.forEach(row => {
        expect(row).toHaveClass('clickedItemsRow');
    });

    // check that All Plate is checked
    const allPlate = screen.getByRole('button', { name: 'All' });
    expect(allPlate).toHaveClass('toggledPlate redTheme');

    // click All Plate
    userEvent.click(allPlate);

    // check that all rows are unchecked
    itemsRows.forEach(row => {
        expect(row).not.toHaveClass('clickedItemsRow');
    });

    // check that All Plate is unchecked
    expect(allPlate).not.toHaveClass('toggledPlate redTheme');

    // deactivate remove mode
    userEvent.click(removePlate);

    // items rows count is the same
    expect(screen.getAllByRole('row').length).toBe(3);
});

test('two rows are added, all rows are checked by All Plate and unchecked by user', () => {
    const { addPlate, removePlate } = renderSchemaForm();

    // add two new rows
    userEvent.click(addPlate);
    userEvent.click(addPlate);
    const itemsRows = screen.getAllByRole('row');
    expect(itemsRows.length).toBe(3);

    // activate remove mode
    userEvent.click(removePlate);

    // click All Plate
    const allPlate = screen.getByRole('button', { name: 'All' });
    userEvent.click(allPlate);

    // check that all rows are checked
    itemsRows.forEach(row => {
        expect(row).toHaveClass('clickedItemsRow');
    });

    // check that All Plate is checked
    expect(allPlate).toHaveClass('toggledPlate redTheme');

    // click all the rows
    itemsRows.forEach(row => {
        userEvent.click(row);
    });

    // check that All plate is unchecked
    expect(allPlate).not.toHaveClass('toggledPlate redTheme');

    // check that all rows are unchecked
    itemsRows.forEach(row => {
        expect(row).not.toHaveClass('clickedItemsRow');
    });

    // deactivate remove mode
    userEvent.click(removePlate);

    // items rows count is the same
    expect(screen.getAllByRole('row').length).toBe(3);
});

test('part of the rows is checked by user, another part is checked by All Plate', () => {
    const { addPlate, removePlate } = renderSchemaForm();

    // add two new rows
    userEvent.click(addPlate);
    userEvent.click(addPlate);
    const itemsRows = screen.getAllByRole('row');
    expect(itemsRows.length).toBe(3);

    // activate remove mode
    userEvent.click(removePlate);

    // click two rows
    userEvent.click(itemsRows[0]);
    userEvent.click(itemsRows[1]);

    // check that two rows are checked
    expect(itemsRows[0]).toHaveClass('clickedItemsRow');
    expect(itemsRows[1]).toHaveClass('clickedItemsRow');

    // check that the last row is unchecked
    expect(itemsRows[2]).not.toHaveClass('clickedItemsRow');

    // click All Plate
    const allPlate = screen.getByRole('button', { name: 'All' });
    userEvent.click(allPlate);

    // check that all rows are checked
    itemsRows.forEach(row => {
        expect(row).toHaveClass('clickedItemsRow');
    });

    // check that All Plate is checked
    expect(allPlate).toHaveClass('toggledPlate redTheme');
});

test('by All Plate, then rows are partially unchecked by user, then checked by All Plate', () => {
    const { addPlate, removePlate } = renderSchemaForm();

    // add two new rows
    userEvent.click(addPlate);
    userEvent.click(addPlate);
    const itemsRows = screen.getAllByRole('row');
    expect(itemsRows.length).toBe(3);

    // activate remove mode
    userEvent.click(removePlate);

    // click All Plate
    const allPlate = screen.getByRole('button', { name: 'All' });
    userEvent.click(allPlate);

    // check that all rows are checked
    itemsRows.forEach(row => {
        expect(row).toHaveClass('clickedItemsRow');
    });

    // check that All Plate is checked
    expect(allPlate).toHaveClass('toggledPlate redTheme');

    // click two rows
    userEvent.click(itemsRows[0]);
    userEvent.click(itemsRows[1]);

    // check that two rows are unchecked
    expect(itemsRows[0]).not.toHaveClass('clickedItemsRow');
    expect(itemsRows[1]).not.toHaveClass('clickedItemsRow');

    // check that the last row is checked
    expect(itemsRows[2]).toHaveClass('clickedItemsRow');

    // check that All Plate is unchecked
    expect(allPlate).not.toHaveClass('toggledPlate redTheme');

    // click All Plate
    userEvent.click(allPlate);

    // check that all rows are checked
    itemsRows.forEach(row => {
        expect(row).toHaveClass('clickedItemsRow');
    });

    // check that All Plate is checked
    expect(allPlate).toHaveClass('toggledPlate redTheme');
});

test('one row is added, all rows are checked by All Plate and removed', () => {
    const { addPlate, removePlate } = renderSchemaForm();

    // add two new rows
    userEvent.click(addPlate);
    const itemsRows = screen.getAllByRole('row');
    expect(itemsRows.length).toBe(2);

    // activate remove mode
    userEvent.click(removePlate);

    // click All Plate
    const allPlate = screen.getByRole('button', { name: 'All' });
    userEvent.click(allPlate);

    // check that all rows are checked
    itemsRows.forEach(row => {
        expect(row).toHaveClass('clickedItemsRow');
    });

    // deactivate remove mode
    userEvent.click(removePlate);

    // check that all the rows are removed
    expect(screen.queryAllByRole('row').length).toBe(0);
});

test('two added rows are removed, two are added, all rows are checked by All Plate and removed', () => {
    const { addPlate, removePlate } = renderSchemaForm();

    // add two new rows
    userEvent.click(addPlate);
    userEvent.click(addPlate);
    // const itemsRows = screen.getAllByRole('row');
    // expect(itemsRows.length).toBe(3);
    expect(screen.getAllByRole('row').length).toBe(3);

    // activate remove mode
    userEvent.click(removePlate);

    // click two added rows
    const addedRows = screen.getAllByRole('row', { name: '' });
    userEvent.click(addedRows[0]);
    userEvent.click(addedRows[1]);

    // check that two rows are checked
    expect(addedRows[0]).toHaveClass('clickedItemsRow');
    expect(addedRows[1]).toHaveClass('clickedItemsRow');

    // deactivate remove mode
    userEvent.click(removePlate);

    // check that two rows are removed
    expect(screen.getAllByRole('row').length).toBe(1);
    expect(screen.queryByRole('row', { name: '' })).not.toBeInTheDocument();

    // add two new rows again
    userEvent.click(addPlate);
    userEvent.click(addPlate);

    // activate remove mode
    userEvent.click(removePlate);

    // check that all the rows are unchecked
    const itemsRows = screen.getAllByRole('row');
    expect(itemsRows.length).toBe(3);
    itemsRows.forEach(row => {
        expect(row).not.toHaveClass('clickedItemsRow');
    });

    // click All Plate
    const allPlate = screen.getByRole('button', { name: 'All' });
    userEvent.click(allPlate);

    // check that all rows are checked
    itemsRows.forEach(row => {
        expect(row).toHaveClass('clickedItemsRow');
    });

    // deactivate remove mode
    userEvent.click(removePlate);

    // check that all the rows are removed
    expect(screen.queryAllByRole('row').length).toBe(0);
});