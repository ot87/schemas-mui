import React from 'react';
import { render, configureMockAppStore } from 'test-utils';
import {
    getButton, queryButton,
    getTable, getTextBox, getTextBoxWithin,
    getGridCellWithin
} from 'test-helpers';
import userEvent from '@testing-library/user-event';

import EditSchemaForm from './EditSchemaForm';
import { setActiveSchemaId, UiModes } from 'redux/reducers/ui';
import { updateSchema } from 'redux/reducers/schemas';

const renderEditSchemaForm = ({ mock = false, async = false } = {}) => {
    const initialState = {
        schemas: {
            ids: [ '1' ],
            entities: {
                '1': {
                    id: '1', name: 'Schema 1', description: '',
                    items: [{ id: 1, name: '2', quantity: '3', time: '' }]
                }
            }
        },
        ui: { mode: UiModes.EDIT }
    };
    const store = mock ?
        configureMockAppStore(async)(initialState)
    : undefined;

    render(<EditSchemaForm id='1' />, { initialState, store });

    return {
        form: getTable(),
        submitButton: getButton('Submit'),
        cancelButton: getButton('Cancel'),
        store
    };
};

describe('EditSchemaForm', () => {
    test('SchemaForm is displayed', () => {
        const { form, submitButton, cancelButton } = renderEditSchemaForm();

        expect(form).toBeInTheDocument();

        const nameField = getTextBoxWithin(form, 'Schema Name');
        expect(nameField).toBeInTheDocument();
        expect(nameField).toHaveValue('Schema 1');

        const descField = getTextBoxWithin(form, 'Schema Description');
        expect(descField).toBeInTheDocument();
        expect(descField).not.toHaveValue();

        expect(getGridCellWithin(form, 'Name 2 Quantity 3 Time')).toBeInTheDocument();

        expect(submitButton).toBeInTheDocument();
        expect(getButton('Reset')).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();

        expect(getButton('Add')).toBeInTheDocument();
        expect(getButton('Remove')).toBeInTheDocument();
        expect(queryButton('All')).not.toBeInTheDocument();
    });

    test('Empty "Schema Name" has an error when "Submit" button is clicked', () => {
        const { submitButton } = renderEditSchemaForm();

        userEvent.clear(getTextBox('Schema Name'));
        userEvent.click(submitButton);
        expect(getTextBox('Schema Name')).toHaveAttribute('aria-invalid', 'true');
    });

    test('"updateSchema" is dispatched when "Submit" button is clicked', () => {
        const { submitButton, store } = renderEditSchemaForm({ mock: true, async: true });
        const actionPayload = {
            id: '1',
            name: 'Schema 12',
            description: '',
            items: [{ id: 1, name: '2', quantity: '3', time: '' }]
        };

        userEvent.type(getTextBox('Schema Name'), '2');
        userEvent.click(submitButton);

        const dispatchedAction = store.getActions()[0];
        expect(dispatchedAction.type).toBe(updateSchema.pending.type);
        expect(dispatchedAction.meta.arg).toEqual(actionPayload);
    });

    test('"setActiveSchemaId" is dispatched when "Cancel" button is clicked', () => {
        const { cancelButton, store } = renderEditSchemaForm({ mock: true });
        const actionPayload = null;

        userEvent.click(cancelButton);

        expect(store.getActions()).toEqual([setActiveSchemaId(actionPayload)]);
    })
});
