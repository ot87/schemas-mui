import React from 'react';
import { render, waitFor, mockStyleInjection } from 'test-utils';
import {
    getAllButtons, getButton, queryButton,
    getTable, getTextBox, getTextBoxWithin,
    getByTextWithin, getGrid, getGridCellWithin
} from 'test-helpers';
import userEvent from '@testing-library/user-event';

import SchemasBoard from './SchemasBoard';
import { UiModes }  from 'redux/reducers/ui';

import yellow from '@material-ui/core/colors/yellow';
import red    from '@material-ui/core/colors/red';

const renderSchemasBoard = ({ initData = {} } = {}) => {
    const initialState = {
        schemas: {
            ids: [ '1', '2' ],
            entities: {
                '1': {
                    id: '1', name: 'Schema 1', description: '',
                    items: [{ id: '1', name: '2', quantity: '3', time: '' }]
                },
                '2': {
                    id: '2', name: 'Schema 2', description: '',
                    items: []
                }
            }
        },
        ...initData
    };

    render(<SchemasBoard />, { initialState });
};

describe('SchemasBoard without "activeSchemaId"', () => {
    test('SchemasBoard is displayed with two Cards ("mode" = "SHOW")', () => {
        renderSchemasBoard();

        expect(getAllButtons('Schema 1 2')[0]).toBeInTheDocument();
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });

    test('Schema is displayed when Card is clicked ("mode" = "SHOW")', () => {
        renderSchemasBoard();

        userEvent.click(getAllButtons('Schema 1 2')[0].firstElementChild);

        const schema = getGrid();
        expect(schema).toBeInTheDocument();
        expect(getByTextWithin(schema, 'Schema 1')).toBeInTheDocument();
        expect(getGridCellWithin(schema, '2 3')).toBeInTheDocument();
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

        const form = getTable();
        expect(form).toBeInTheDocument();
        expect(getTextBoxWithin(form, 'Schema Name')).toBeInTheDocument();
        expect(getTextBoxWithin(form, 'Schema Description')).toBeInTheDocument();
        expect(getGridCellWithin(form, 'Name 2 Quantity 3 Time')).toBeInTheDocument();
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

    test('CustomCardButtons is displayed when Card is clicked ("mode" = "DELETE")', () => {
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

        const form = getTable();
        expect(form).toBeInTheDocument();
        expect(getTextBoxWithin(form, 'Schema Name')).toBeInTheDocument();
        expect(getTextBoxWithin(form, 'Schema Description')).toBeInTheDocument();
    });

    test('SchemasBoard is displayed back when Schema is added ("mode" = "ADD")', async () => {
        renderSchemasBoard({
            initData: { ui: { mode: UiModes.ADD } }
        });

        userEvent.type(getTextBox('Schema Name'), 'Schema 3');
        userEvent.click(getButton('Submit'));

        await waitFor(() => expect(getAllButtons('Schema 1 2')[0]).toBeInTheDocument());
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
        expect(getAllButtons('Schema 3')[0]).toBeInTheDocument();
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

describe('SchemasBoard with "activeSchemaId"', () => {
    test('Schema is displayed ("mode" = "SHOW")', () => {
        renderSchemasBoard({
            initData: { ui: { activeSchemaId: '1' } }
        });

        const schema = getGrid();
        expect(schema).toBeInTheDocument();
        expect(getByTextWithin(schema, 'Schema 1')).toBeInTheDocument();
        expect(getGridCellWithin(schema, '2 3')).toBeInTheDocument();
    });

    test('SchemaForm is displayed ("mode" = "EDIT")', () => {
        renderSchemasBoard({
            initData: {
                ui: { activeSchemaId: '1', mode: UiModes.EDIT }
            }
        });

        const form = getTable();
        expect(form).toBeInTheDocument();
        expect(getTextBoxWithin(form, 'Schema Name')).toBeInTheDocument();
        expect(getTextBoxWithin(form, 'Schema Description')).toBeInTheDocument();
        expect(getGridCellWithin(form, 'Name 2 Quantity 3 Time')).toBeInTheDocument();
    });

    test('SchemasBoard is displayed back when Schema is updated ("mode" = "EDIT")', async () => {
        renderSchemasBoard({
            initData: {
                ui: { activeSchemaId: '1', mode: UiModes.EDIT }
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
                ui: { activeSchemaId: '1', mode: UiModes.EDIT }
            }
        });

        userEvent.click(getButton('Cancel'));
        expect(getAllButtons('Schema 1 2')[0]).toBeInTheDocument();
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });

    test('CustomCardButtons is displayed ("mode" = "DELETE")', () => {
        renderSchemasBoard({
            initData: {
                ui: {
                    activeSchemaId: '1',
                    mode: UiModes.DELETE
                }
            }
        });

        expect(getButton('Schema 1 Delete Cancel')).toBeInTheDocument();
        expect(getButton('Delete')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();
    });

    test('CustomCardButtons is displayed when another Card is clicked ("mode" = "DELETE")', () => {
        renderSchemasBoard({
            initData: {
                ui: { activeSchemaId: '1', mode: UiModes.DELETE }
            }
        });

        userEvent.click(getAllButtons('Schema 2')[0].firstElementChild);

        expect(getButton('Schema 2 Delete Cancel')).toBeInTheDocument();
        expect(getButton('Delete')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();
    });

    test('Card is deleted when "Delete" button is clicked ("mode" = "DELETE")', () => {
        renderSchemasBoard({
            initData: {
                ui: { activeSchemaId: '1', mode: UiModes.DELETE }
            }
        });

        userEvent.click(getButton('Delete'));
        expect(queryButton('Schema 1 2')).not.toBeInTheDocument();
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });

    test('SchemasBoard is displayed back when "Cancel" button is clicked ("mode" = "DELETE")', () => {
        renderSchemasBoard({
            initData: {
                ui: { activeSchemaId: '1', mode: UiModes.DELETE }
            }
        });

        userEvent.click(getButton('Cancel'));
        expect(getAllButtons('Schema 1 2')[0]).toBeInTheDocument();
        expect(getAllButtons('Schema 2')[0]).toBeInTheDocument();
    });
});
