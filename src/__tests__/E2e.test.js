import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import {
      getButton, queryButton, getAllButtons, getButtonWithin,
      getTab, getTextBox, getAllTextBoxes, getTextBoxWithin,
      getGrid, getGridCell, getAllGridCells, getGridCellWithin,
      getTable, getByTextWithin, getBanner
} from 'test-helpers';
import userEvent from '@testing-library/user-event';

import App from 'App';

const findAllButtons = (name) => screen.findAllByRole('button', { name });

test('create Schema, edit it and then delete', async () => {
    render(<App />);

    // TEST CREATION

    // Add Button is present
    const addButton = getButton('Add');
    expect(addButton).toBeInTheDocument();

    // Edit and Delete Buttons aren't displayed
    expect(queryButton('Edit')).not.toBeInTheDocument();
    expect(queryButton('Delete')).not.toBeInTheDocument();

    // Cards aren't displayed
    getAllButtons().forEach(button => {
        expect(button).not.toHaveClass('MuiCard-root');
    });

    // Add Button is clicked
    userEvent.click(addButton);
    expect(addButton.className).toContain('clicked');

    // form is displayed and fill it in

    const schemaName = 'Test schema name';
    const schemaDesc = 'Test schema description';

    const nameField = getTextBox('Schema Name');
    const descField = getTextBox('Schema Description');

    expect(nameField).toBeInTheDocument();
    expect(descField).toBeInTheDocument();

    userEvent.type(nameField, schemaName);
    userEvent.type(descField, schemaDesc);

    // click Add Button to add two Items Rows
    userEvent.click(getAllButtons('Add')[1]);
    userEvent.click(getAllButtons('Add')[1]);

    // Remove Button is displayed
    expect(getButton('Remove')).toBeInTheDocument();

    const rowName     = 'Test name';
    const rowQuantity = 'Test quantity';
    const rowTime     = 'Test time';

    const itemsRows         = getAllGridCells();
    const rowNameFields     = getAllTextBoxes('Name');
    const rowQuantityFields = getAllTextBoxes('Quantity');
    const rowTimeFields     = getAllTextBoxes('Time');

    // the first Row is added
    expect(itemsRows[0]).toBeInTheDocument();
    expect(rowNameFields[0]).toBeInTheDocument();
    expect(rowQuantityFields[0]).toBeInTheDocument();
    expect(rowTimeFields[0]).toBeInTheDocument();

    // the second Row is added
    expect(itemsRows[1]).toBeInTheDocument();
    expect(rowNameFields[1]).toBeInTheDocument();
    expect(rowQuantityFields[1]).toBeInTheDocument();
    expect(rowTimeFields[1]).toBeInTheDocument();

    // fill in the first Row
    userEvent.type(rowNameFields[0], `${rowName} 1`);
    userEvent.type(rowQuantityFields[0], `${rowQuantity} 1`);
    userEvent.type(rowTimeFields[0], `${rowTime} 1`);

    // fill in the second Row
    userEvent.type(rowNameFields[1], `${rowName} 2`);
    userEvent.type(rowQuantityFields[1], `${rowQuantity} 2`);
    userEvent.type(rowTimeFields[1], `${rowTime} 2`);

    // click Submit Button
    userEvent.click(getButton('Submit'));

    const addedCardName = `${schemaName} ${rowName} 1 ${rowName} 2`;

    // Schema Card is created
    let addedSchemaCard = await findAllButtons(addedCardName);
    expect(addedSchemaCard[0]).toBeInTheDocument();


    // click on the Card, check that its content is displayed and return back

    userEvent.click(addedSchemaCard[0].firstElementChild);

    const addedSchemaButton = getTab(schemaName);
    expect(addedSchemaButton).toBeInTheDocument();
    expect(addedSchemaButton).toHaveAttribute('aria-selected', 'true');

    // Schema Card isn't displayed
    expect(queryButton(addedCardName)).not.toBeInTheDocument();

    const addedSchema = getGrid();
    expect(addedSchema).toBeInTheDocument();
    expect(getByTextWithin(addedSchema, schemaName)).toBeInTheDocument();
    expect(getByTextWithin(addedSchema, schemaDesc)).toBeInTheDocument();
    expect(
        getGridCellWithin(addedSchema, `${rowName} 1 ${rowQuantity} 1 ${rowTime} 1`)
    ).toBeInTheDocument();
    expect(
        getGridCellWithin(addedSchema, `${rowName} 2 ${rowQuantity} 2 ${rowTime} 2`)
    ).toBeInTheDocument();

    userEvent.click(getButton('Back'));

    // Schema Card is displayed
    addedSchemaCard = await findAllButtons(addedCardName);
    expect(addedSchemaCard[0]).toBeInTheDocument();


    // TEST EDIT

    const editButton = getButton('Edit');
    expect(editButton).toBeInTheDocument();

    userEvent.click(editButton);
    userEvent.click(addedSchemaCard[0].firstElementChild);
    expect(editButton.className).toContain('clicked');

    // form is displayed and editable
    expect(getTable()).toBeInTheDocument();
    getAllTextBoxes().forEach((textbox) => {
        expect(textbox).toBeEnabled();
    });

    // remove the last row
    const removeButton = getButton('Remove');
    expect(getAllGridCells()).toHaveLength(2);

    userEvent.click(removeButton);
    userEvent.click(getGridCell(`Name ${rowName} 2 Quantity ${rowQuantity} 2 Time ${rowTime} 2`));
    userEvent.click(removeButton);

    expect(getAllGridCells()).toHaveLength(1);

    // add a new row
    userEvent.click(getAllButtons('Add')[1]);

    // a new Row is added
    const newItemsRow = getGridCell('Name Quantity Time');
    expect(newItemsRow).toBeInTheDocument();

    const newRowNameField     = getTextBoxWithin(newItemsRow, 'Name');
    const newRowQuantityField = getTextBoxWithin(newItemsRow, 'Quantity');
    const newRowTimeField     = getTextBoxWithin(newItemsRow, 'Time');

    expect(newRowNameField).toBeInTheDocument();
    expect(newRowQuantityField).toBeInTheDocument();
    expect(newRowTimeField).toBeInTheDocument();

    // fill in the new Row
    userEvent.type(newRowNameField, `${rowName} 3`);
    userEvent.type(newRowQuantityField, `${rowQuantity} 3`);
    userEvent.type(newRowTimeField, `${rowTime} 3`);

    // click Submit Button
    userEvent.click(getButton('Submit'));

    const editedCardName = `${schemaName} ${rowName} 1 ${rowName} 3`;

    // Schema Card is edited
    let editedSchemaCard = await findAllButtons(editedCardName);
    expect(editedSchemaCard[0]).toBeInTheDocument();

    // uncheck Edit mode
    userEvent.click(editButton);


    // click on the Card, check that its content is displayed and return back

    userEvent.click(editedSchemaCard[0].firstElementChild);

    const editedSchemaButton = getTab(schemaName);
    expect(editedSchemaButton).toBeInTheDocument();
    expect(editedSchemaButton).toHaveAttribute('aria-selected', 'true');

    // Card isn't displayed
    expect(queryButton(editedCardName)).not.toBeInTheDocument();

    const editedSchema = getGrid();
    expect(editedSchema).toBeInTheDocument();
    expect(
        getGridCellWithin(editedSchema, `${rowName} 1 ${rowQuantity} 1 ${rowTime} 1`)
    ).toBeInTheDocument();
    expect(
        getGridCellWithin(editedSchema, `${rowName} 3 ${rowQuantity} 3 ${rowTime} 3`)
    ).toBeInTheDocument();

    userEvent.click(getButton('Back'));

    // Schema Card is displayed
    editedSchemaCard = await findAllButtons(editedCardName);
    expect(editedSchemaCard[0]).toBeInTheDocument();



    // TEST DELETION

    const deleteButton = getButton('Delete');
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);
    userEvent.click(editedSchemaCard[0].firstElementChild);
    expect(deleteButton.className).toContain('clicked');

    // Schema Card is clicked for deletion
    let forDeleteSchemaCard = getButton(`${schemaName} Delete Cancel`);
    expect(forDeleteSchemaCard).toBeInTheDocument();

    // click Cancel Button
    userEvent.click(getButtonWithin(forDeleteSchemaCard, 'Cancel'));

    editedSchemaCard = getAllButtons(editedCardName);
    expect(editedSchemaCard[0]).toBeInTheDocument();

    // click Schema Card for deletion again
    userEvent.click(editedSchemaCard[0].firstElementChild);

    // Schema Card is clicked for deletion
    forDeleteSchemaCard = getButton(`${schemaName} Delete Cancel`);
    expect(forDeleteSchemaCard).toBeInTheDocument();

    // delete Schema Card
    userEvent.click(getButtonWithin(forDeleteSchemaCard, 'Delete'));

    await waitFor(() => {
        expect(queryButton(editedCardName)).not.toBeInTheDocument();
    });
}, 40000);

test('add two schemas, delete one', async() => {
    render(<App />);

    const firstCardName  = 'Test schema name 1';
    const secondCardName = 'Test schema name 2';

    userEvent.click(getButton('Add'));
    userEvent.type(getTextBox('Schema Name'), firstCardName);
    userEvent.click(getButton('Submit'));

    await waitFor(() => {
        expect(getAllButtons(firstCardName)[0]).toBeInTheDocument();
    });


    userEvent.click(getButton('Add'));
    userEvent.type(getTextBox('Schema Name'), secondCardName);
    userEvent.click(getButton('Submit'));

    const secondSchemaCard = await findAllButtons(secondCardName);
    expect(secondSchemaCard[0]).toBeInTheDocument();

    userEvent.click(getButton('Delete'));
    userEvent.click(secondSchemaCard[0].firstElementChild);
    userEvent.click(
        getButtonWithin(
            getButton(`${secondCardName} Delete Cancel`),
            'Delete'
        )
    );

    await waitFor(() => {
        expect(queryButton(secondCardName)).not.toBeInTheDocument();
    });

    expect(getButton('Add')).toBeInTheDocument();
    expect(getButton('Edit')).toBeInTheDocument();
    expect(getButton('Delete')).toBeInTheDocument();
}, 20000);

test('Light and dark themes are toggled', () => {
    render(<App />);
    const header = getBanner();

    expect(header).toHaveStyle('background-color: #fff');

    userEvent.click(getButton('mode'));

    expect(header).toHaveStyle('background-color: #424242');
});
