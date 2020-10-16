import React from 'react';
import { render, screen, waitFor } from '../test-utils';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('create Schema, edit it and then delete', async () => {
    render(<App />);

    // test Schema creation

    // check that Add Plate is present
    const addPlate = screen.getByRole('button', { name: 'Add' });
    expect(addPlate).toBeInTheDocument();
    expect(addPlate).toHaveClass('greenPlate');

    // check that Edit and Delete Plates aren't displayed
    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();

    // check that Cards aren't displayed
    screen.getAllByRole('button').forEach(button => {
        expect(button).not.toHaveClass('Card');
    });

    // check that Add Plate is clicked
    userEvent.click(addPlate);
    expect(addPlate).toHaveClass('greenPlate clickedPlate greenTheme');

    // check that form is displayed and fill it

    const schemaName = 'Test schema name',
          schemaDesc = 'Test schema description';

    const nameField = screen.getByPlaceholderText('Schema Name'),
          descField = screen.getByPlaceholderText('Schema Description');

    expect(nameField).toBeInTheDocument();
    expect(descField).toBeInTheDocument();

    userEvent.type(nameField, schemaName);
    userEvent.type(descField, schemaDesc);

    // click Add Plate to add two Items Rows
    userEvent.click(screen.getAllByRole('button', { name: 'Add' })[1]);
    userEvent.click(screen.getAllByRole('button', { name: 'Add' })[1]);

    // check that Remove Plate is displayed
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();

    const rowName     = 'Test name',
          rowQuantity = 'Test quantity',
          rowTime     = 'Test time';

    const rows = screen.getAllByRole('row'),
          rowNameFields     = screen.getAllByPlaceholderText('Name'),
          rowQuantityFields = screen.getAllByPlaceholderText('Quantity'),
          rowTimeFields     = screen.getAllByPlaceholderText('Time');

    // check that the first Row is added
    expect(rows[0]).toBeInTheDocument();
    expect(rowNameFields[0]).toBeInTheDocument();
    expect(rowQuantityFields[0]).toBeInTheDocument();
    expect(rowTimeFields[0]).toBeInTheDocument();

    // check that the second Row is added
    expect(rows[1]).toBeInTheDocument();
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

    // click Submit Plate
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    const addedCardName = `${schemaName} ${rowName} 1 ${rowName} 2`;

    // check that Schema Card is created
    let addedSchemaCard = await screen.findByRole('button', { name: addedCardName });
    expect(addedSchemaCard).toBeInTheDocument();


    // click on the Card, check that its content is displayed and return back

    userEvent.click(addedSchemaCard);

    const addedSchemaPlate = await screen.findByRole('button', { name: schemaName });
    expect(addedSchemaPlate).toBeInTheDocument();
    expect(addedSchemaPlate).toHaveClass('clickedPlate');

    // check that Schema Card isn't displayed
    expect(addedSchemaCard).not.toBeInTheDocument();

    const addedSchemaRows = screen.getAllByRole('row');
    expect(addedSchemaRows[0]).toHaveTextContent(schemaName);
    expect(addedSchemaRows[1]).toHaveTextContent(schemaDesc);
    expect(addedSchemaRows[2]).toHaveTextContent(`${rowName} 1`);
    expect(addedSchemaRows[2]).toHaveTextContent(`${rowQuantity} 1`);
    expect(addedSchemaRows[2]).toHaveTextContent(`${rowTime} 1`);
    expect(addedSchemaRows[3]).toHaveTextContent(`${rowName} 2`);
    expect(addedSchemaRows[3]).toHaveTextContent(`${rowQuantity} 2`);
    expect(addedSchemaRows[3]).toHaveTextContent(`${rowTime} 2`);

    userEvent.click(screen.getByRole('button', { name: 'Back' }));

    // check that Schema Card is displayed
    addedSchemaCard = await screen.findByRole('button', { name: addedCardName });
    expect(addedSchemaCard).toBeInTheDocument();


    // test Schema edit

    const editPlate = screen.getByRole('button', { name: 'Edit' });
    expect(editPlate).toBeInTheDocument();
    expect(editPlate).toHaveClass('goldPlate');

    userEvent.click(editPlate);
    expect(editPlate).toHaveClass('goldPlate toggledPlate goldTheme');

    userEvent.click(addedSchemaCard);

    // check that form is displayed and edit it
    await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument());
    screen.getAllByRole('textbox').forEach(textbox => expect(textbox).toBeEnabled());

    // remove the last row
    const removePlate = screen.getByRole('button', { name: 'Remove' });

    expect(screen.getAllByRole('row').length).toBe(2);

    userEvent.click(removePlate);
    userEvent.click(screen.getAllByRole('row')[1]);
    userEvent.click(removePlate);

    expect(screen.getAllByRole('row').length).toBe(1);

    // add a new row
    userEvent.click(screen.getAllByRole('button', { name: 'Add' })[1]);

    // check that a new Row is added
    expect(screen.getAllByRole('row')[1]).toBeInTheDocument();
    const newRowNameField     = screen.getAllByPlaceholderText('Name')[1],
          newRowQuantityField = screen.getAllByPlaceholderText('Quantity')[1],
          newRowTimeField     = screen.getAllByPlaceholderText('Time')[1];

    expect(newRowNameField).toBeInTheDocument();
    expect(newRowQuantityField).toBeInTheDocument();
    expect(newRowTimeField).toBeInTheDocument();

    // fill in the new Row
    userEvent.type(newRowNameField, `${rowName} 3`);
    userEvent.type(newRowQuantityField, `${rowQuantity} 3`);
    userEvent.type(newRowTimeField, `${rowTime} 3`);

    // click Submit Plate
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    const editedCardName = `${schemaName} ${rowName} 1 ${rowName} 3`;

    // check that Schema Card is edited
    let editedSchemaCard = await screen.findByRole('button', { name: editedCardName });
    expect(editedSchemaCard).toBeInTheDocument();

    // uncheck Edit mode
    userEvent.click(editPlate);
    expect(editPlate).not.toHaveClass('toggledPlate goldTheme');


    // click on the Card, check that its content is displayed and return back

    userEvent.click(editedSchemaCard);

    const editedSchemaPlate = await screen.findByRole('button', { name: `${schemaName}` });
    expect(editedSchemaPlate).toBeInTheDocument();
    expect(editedSchemaPlate).toHaveClass('clickedPlate');

    // check that Card isn't displayed
    expect(editedSchemaCard).not.toBeInTheDocument();

    const editedSchemaRows = screen.getAllByRole('row');
    expect(editedSchemaRows[0]).toHaveTextContent(schemaName);
    expect(editedSchemaRows[1]).toHaveTextContent(schemaDesc);
    expect(editedSchemaRows[2]).toHaveTextContent(`${rowName} 1`);
    expect(editedSchemaRows[2]).toHaveTextContent(`${rowQuantity} 1`);
    expect(editedSchemaRows[2]).toHaveTextContent(`${rowTime} 1`);
    expect(editedSchemaRows[3]).toHaveTextContent(`${rowName} 3`);
    expect(editedSchemaRows[3]).toHaveTextContent(`${rowQuantity} 3`);
    expect(editedSchemaRows[3]).toHaveTextContent(`${rowTime} 3`);

    userEvent.click(screen.getByRole('button', { name: 'Back' }));

    // check that Schema Card is displayed
    editedSchemaCard = await screen.findByRole('button', { name: editedCardName });
    expect(editedSchemaCard).toBeInTheDocument();


    // test Schema delete

    const deletePlate = screen.getByRole('button', { name: 'Delete' });
    expect(deletePlate).toBeInTheDocument();
    expect(deletePlate).toHaveClass('redPlate');

    userEvent.click(deletePlate);
    expect(deletePlate).toHaveClass('redPlate toggledPlate redTheme');

    expect(editedSchemaCard).toHaveClass('redCard');

    // click Schema Card for deletion
    userEvent.click(editedSchemaCard);

    // check that Schema Card is clicked for deletion
    let forDeleteSchemaCard = await screen.findByRole('button', { name: `${schemaName} Delete Cancel` });
    expect(forDeleteSchemaCard).toBeInTheDocument();
    expect(forDeleteSchemaCard).toHaveClass('redCard clicked');

    // click Cancel Plate
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    forDeleteSchemaCard = await screen.findByRole('button', { name: editedCardName });
    expect(forDeleteSchemaCard).toBeInTheDocument();
    expect(forDeleteSchemaCard).not.toHaveClass('clicked');

    // click Schema Card for deletion again
    userEvent.click(forDeleteSchemaCard);

    // check that Schema Card is clicked for deletion
    forDeleteSchemaCard = await screen.findByRole('button', { name: `${schemaName} Delete Cancel` });
    expect(forDeleteSchemaCard).toBeInTheDocument();
    expect(forDeleteSchemaCard).toHaveClass('redCard clicked');

    // delete Schema Card
    userEvent.click(screen.getAllByRole('button', { name: 'Delete' })[1]);

    // check that Schema Card is deleted
    const deletedSchemaCard = await screen.findByRole('button', { name: editedCardName }).catch(()=>{});
    expect(deletedSchemaCard).toBe(undefined);

    // check that Add Plate is present
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();

    // check that Edit and Delete Plates aren't displayed
    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
});