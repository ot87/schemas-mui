import React from 'react';
import {
    render, waitFor, screen, mockStyleInjection,
    getByRole, getAllButtons, getButton, queryButton,
    getTable, getGridCell, queryGridCell, getTextBox
} from 'test-utils';
import userEvent from '@testing-library/user-event';

import SchemasBoardContainer from './SchemasBoardContainer';
import { UiModes }           from 'redux/reducers/ui';

import yellow from '@material-ui/core/colors/yellow';
import red    from '@material-ui/core/colors/red';

const renderSchemasBoard = ({ initData = {} } = {}) => {
    let initialState = {
        schemas: [
            {id: 1, name: 'Schema 1', items: [{ id: 1, name: '2', quantity: '3' }]},
            {id: 2, name: 'Schema 2', items: []}
        ] };
    if (Object.keys(initData).length) {
        initialState = {
            ...initialState,
            ...initData
        };
    }
    render(<SchemasBoardContainer />, { initialState });
};

describe('SchemasBoardContainer without "selectedSchemaId"', () => {
    test('SchemasBoard is displayed with two Cards ("mode" = "SHOW")', () => {
        renderSchemasBoard();

        expect(getAllButtons('Schema 1 2')[0]).toBeInTheDocument();
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });

    test('Schema is displayed when Card is clicked ("mode" = "SHOW")', () => {
        renderSchemasBoard();

        userEvent.click(getAllButtons('Schema 1 2')[0].firstElementChild);

        const schema = getByRole('grid');
        expect(schema).toBeInTheDocument();

        const schemaName = screen.getByText('Schema 1');
        expect(schemaName).toBeInTheDocument();
        expect(schema).toContainElement(schemaName);

        const itemName = screen.getByText('2');
        expect(itemName).toBeInTheDocument();
        expect(schema).toContainElement(itemName);

        const itemQuantity = screen.getByText('3');
        expect(itemQuantity).toBeInTheDocument();
        expect(schema).toContainElement(itemQuantity);
    });

    test('SchemasBoard is displayed with two Cards with yellow theme ("mode" = "EDIT")', () => {
        const applyJSSRules = mockStyleInjection();
        renderSchemasBoard({
            initData: { ui: { mode: UiModes.EDIT } }
        });
        applyJSSRules();

        const card1 = getAllButtons('Schema 1 2')[0];
        const card2 = getAllButtons('Schema 2')[0];

        expect(card1).toBeInTheDocument();
        expect(card2).toBeInTheDocument();

        expect(
            card1.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
        ).toHaveStyle(`background-color: ${yellow[600]}`);
        expect(
            card2.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
        ).toHaveStyle(`background-color: ${yellow[600]}`);
    });

    test('SchemaForm is displayed when Card is clicked ("mode" = "EDIT")', () => {
        renderSchemasBoard({
            initData: { ui: { mode: UiModes.EDIT } }
        });

        userEvent.click(getAllButtons('Schema 1 2')[0].firstElementChild);

        expect(getTable()).toBeInTheDocument();

        const nameField = getTextBox('Schema Name');
        expect(nameField).toBeInTheDocument();
        expect(nameField).toHaveValue('Schema 1');

        const descField = getTextBox('Schema Description');
        expect(descField).toBeInTheDocument();
        expect(descField).not.toHaveValue();

        expect(getGridCell('Name 2 Quantity 3 Time')).toBeInTheDocument();

        expect(getButton('Submit')).toBeInTheDocument();
        expect(getButton('Reset')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();

        expect(getButton('Add')).toBeInTheDocument();
        expect(getButton('Remove')).toBeInTheDocument();
        expect(queryButton('All')).not.toBeInTheDocument();
    });

    test('SchemasBoard is displayed with two Cards with red theme ("mode" = "DELETE")', () => {
        const applyJSSRules = mockStyleInjection();
        renderSchemasBoard({
            initData: { ui: { mode: UiModes.DELETE } }
        });
        applyJSSRules();

        const card1 = getAllButtons('Schema 1 2')[0];
        const card2 = getAllButtons('Schema 2')[0];

        expect(card1).toBeInTheDocument();
        expect(card2).toBeInTheDocument();

        expect(
            card1.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
        ).toHaveStyle(`background-color: ${red[600]}`);
        expect(
            card2.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
        ).toHaveStyle(`background-color: ${red[600]}`);
    });

    test('CustomCardWithButtons is displayed when Card is clicked ("mode" = "DELETE")', () => {
        renderSchemasBoard({
            initData: { ui: { mode: UiModes.DELETE } }
        });

        userEvent.click(getAllButtons('Schema 1 2')[0].firstElementChild);

        expect(getButton('Schema 1 Delete Cancel')).toBeInTheDocument();
        expect(getButton('Delete')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();
    });

    test('SchemaForm is displayed ("mode" = "ADD")', () => {
        renderSchemasBoard({
            initData: { ui: { mode: UiModes.ADD } }
        });

        expect(getTable()).toBeInTheDocument();

        const nameField = getTextBox('Schema Name');
        const descField = getTextBox('Schema Description');
        expect(nameField).toBeInTheDocument();
        expect(descField).toBeInTheDocument();
        expect(nameField).not.toHaveValue();
        expect(descField).not.toHaveValue();

        expect(queryGridCell('Name Quantity Time')).not.toBeInTheDocument();

        expect(getButton('Submit')).toBeInTheDocument();
        expect(getButton('Reset')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();

        expect(getButton('Add')).toBeInTheDocument();
        expect(queryButton('Remove')).not.toBeInTheDocument();
        expect(queryButton('All')).not.toBeInTheDocument();
    });

    test('"Schema Name" has an error when "Submit" button is clicked ("mode" = "ADD")', () => {
        renderSchemasBoard({
            initData: { ui: { mode: UiModes.ADD } }
        });

        userEvent.click(getButton('Submit'));
        expect(getTextBox('Schema Name')).toHaveAttribute('aria-invalid', 'true');
    });

    test('SchemasBoard is displayed back when "Cancel" button is clicked ("mode" = "ADD")', () => {
        renderSchemasBoard({
            initData: { ui: { mode: UiModes.ADD } }
        });

        userEvent.click(getButton('Cancel'));
        expect(getAllButtons('Schema 1 2')[0]).toBeInTheDocument();
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });
});

describe('SchemasBoardContainer with "selectedSchemaId"', () => {
    test('Schema is displayed ("mode" = "SHOW")', () => {
        renderSchemasBoard({
            initData: { ui: { selectedSchemaId: 1 } }
        });

        const schema = getByRole('grid');
        expect(schema).toBeInTheDocument();

        const schemaName = screen.getByText('Schema 1');
        expect(schemaName).toBeInTheDocument();
        expect(schema).toContainElement(schemaName);

        const itemName = screen.getByText('2');
        expect(itemName).toBeInTheDocument();
        expect(schema).toContainElement(itemName);

        const itemQuantity = screen.getByText('3');
        expect(itemQuantity).toBeInTheDocument();
        expect(schema).toContainElement(itemQuantity);
    });

    test('SchemaForm is displayed ("mode" = "EDIT")', () => {
        renderSchemasBoard({
            initData: {
                ui: {
                    selectedSchemaId: 1,
                    mode: UiModes.EDIT
                }
            }
        });

        expect(getTable()).toBeInTheDocument();

        const nameField = getTextBox('Schema Name');
        expect(nameField).toBeInTheDocument();
        expect(nameField).toHaveValue('Schema 1');

        const descField = getTextBox('Schema Description');
        expect(descField).toBeInTheDocument();
        expect(descField).not.toHaveValue();

        expect(getGridCell('Name 2 Quantity 3 Time')).toBeInTheDocument();

        expect(getButton('Submit')).toBeInTheDocument();
        expect(getButton('Reset')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();

        expect(getButton('Add')).toBeInTheDocument();
        expect(getButton('Remove')).toBeInTheDocument();
        expect(queryButton('All')).not.toBeInTheDocument();
    });

    test('SchemasBoard is displayed back when Schema is updated ("mode" = "EDIT")', async () => {
        renderSchemasBoard({
            initData: {
                ui: {
                    selectedSchemaId: 1,
                    mode: UiModes.EDIT
                }
            }
        });

        userEvent.type(getTextBox('Schema Name'), '2');
        userEvent.click(getButton('Submit'));

        await waitFor(() => expect(getAllButtons('Schema 12 2')[0]).toBeInTheDocument());
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });

    test('SchemasBoard is displayed back when "Cancel" button is clicked ("mode" = "EDIT")', async () => {
        renderSchemasBoard({
            initData: {
                ui: {
                    selectedSchemaId: 1,
                    mode: UiModes.EDIT
                }
            }
        });

        userEvent.click(getButton('Cancel'));
        expect(getAllButtons('Schema 1 2')[0]).toBeInTheDocument();
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });

    test('CustomCardWithButtons is displayed ("mode" = "DELETE")', () => {
        renderSchemasBoard({
            initData: {
                ui: {
                    selectedSchemaId: 1,
                    mode: UiModes.DELETE
                }
            }
        });

        expect(getButton('Schema 1 Delete Cancel')).toBeInTheDocument();
        expect(getButton('Delete')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();
    });

    test('Card is deleted when "Delete" button is clicked ("mode" = "DELETE")', () => {
        renderSchemasBoard({
            initData: {
                ui: {
                    selectedSchemaId: 1,
                    mode: UiModes.DELETE
                }
            }
        });

        userEvent.click(getButton('Delete'));
        expect(queryButton('Schema 1 2')).not.toBeInTheDocument();
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });

    test('SchemasBoard is displayed back when "Cancel" button is clicked ("mode" = "DELETE")', () => {
        renderSchemasBoard({
            initData: {
                ui: {
                    selectedSchemaId: 1,
                    mode: UiModes.DELETE
                }
            }
        });

        userEvent.click(getButton('Cancel'));
        expect(getAllButtons('Schema 1 2')[0]).toBeInTheDocument();
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });
});
