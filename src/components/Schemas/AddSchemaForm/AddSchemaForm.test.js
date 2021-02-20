import React from 'react';
import { render, configureMockAppStore } from 'test-utils';
import {
    getButton, queryButton,
    getTable, getTextBox, getTextBoxWithin,
    queryGridCellWithin
} from 'test-helpers';
import userEvent from '@testing-library/user-event';

import AddSchemaForm from './AddSchemaForm';
import { setMode, UiModes }  from 'redux/reducers/ui';
import { addSchema } from 'redux/reducers/schemas';

const renderAddSchemaForm = ({
    initialState = { ui: { mode: UiModes.ADD } },
    store = undefined
} = {}) => {
    render(<AddSchemaForm />, { initialState, store });

    return {
        form: getTable(),
        submitButton: getButton('Submit'),
        cancelButton: getButton('Cancel')
    };
};

describe('AddSchemaForm', () => {
    test('SchemaForm is displayed', () => {
        const { form, submitButton, cancelButton } = renderAddSchemaForm();

        expect(form).toBeInTheDocument();

        const nameField = getTextBoxWithin(form, 'Schema Name');
        const descField = getTextBoxWithin(form, 'Schema Description');
        expect(nameField).toBeInTheDocument();
        expect(descField).toBeInTheDocument();
        expect(nameField).not.toHaveValue();
        expect(descField).not.toHaveValue();

        expect(queryGridCellWithin(form, 'Name Quantity Time')).not.toBeInTheDocument();

        expect(submitButton).toBeInTheDocument();
        expect(getButton('Reset')).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();

        expect(getButton('Add')).toBeInTheDocument();
        expect(queryButton('Remove')).not.toBeInTheDocument();
        expect(queryButton('All')).not.toBeInTheDocument();
    });

    test('"Schema Name" has an error when "Submit" button is clicked', () => {
        const { submitButton } = renderAddSchemaForm();

        userEvent.click(submitButton);
        expect(getTextBox('Schema Name')).toHaveAttribute('aria-invalid', 'true');
    });

    test('"AddSchema" is dispatched', () => {
        const store = configureMockAppStore(true)();
        const { submitButton } = renderAddSchemaForm({ store });
        const actionPayload = {
            name: 'name',
            description: '',
            items: []
        };

        userEvent.type(getTextBox('Schema Name'), 'name');
        userEvent.click(submitButton);

        const dispatchedAction = store.getActions()[0];
        expect(dispatchedAction.type).toBe(addSchema.pending.type);
        expect(dispatchedAction.meta.arg).toEqual(actionPayload);
    });

    test('"setMode" is dispatched', () => {
        const store = configureMockAppStore()();
        const { cancelButton } = renderAddSchemaForm({ store });

        userEvent.click(cancelButton);

        expect(store.getActions()).toEqual([setMode(UiModes.SHOW)]);
    });
});
