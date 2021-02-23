import React from 'react';
import { render, configureMockAppStore } from 'test-utils';
import {
    getAllButtons, getButton,
    queryButtonWithin
} from 'test-helpers';
import userEvent from '@testing-library/user-event';

import CustomCardButtonsGridItem from './CustomCardButtonsGridItem';

import { setActiveSchemaId } from 'redux/reducers/ui';
import { deleteSchema } from 'redux/reducers/schemas';

const renderCustomCardButtonsGridItem = ({
    mock = false,
    async = false,
    renderProps = {}
} = {}) => {
    const initialState = { schemas: {
        ids: [ '1', '2' ],
        entities: {
            '1': {
                id: '1', name: 'Schema 1', description: '',
                items: [{ id: 1, name: '2', quantity: '3', time: '' }]
            },
            '2': {
                id: '2', name: 'Schema 2', description: '',
                items: []
            }
        }
    }};
    const store = mock ?
        configureMockAppStore(async)(initialState)
    : undefined;

    render(<CustomCardButtonsGridItem id='1' {...renderProps}  />, { initialState, store });

    return {
        store
    }
};

describe('CustomCardButtonsGridItem', () => {
    test('CustomCardButtonsGridItem is displayed', () => {
        renderCustomCardButtonsGridItem();
        const card = getAllButtons('Schema 1 2')[0];

        expect(card).toBeInTheDocument();
        expect(queryButtonWithin(card, 'Delete')).not.toBeInTheDocument();
        expect(queryButtonWithin(card, 'Cancel')).not.toBeInTheDocument();
    });

    test('CustomCardButtonsGridItem is displayed with buttons', () => {
        renderCustomCardButtonsGridItem({ renderProps: { isCardClicked: true } });

        expect(getButton('Schema 1 Delete Cancel')).toBeInTheDocument();
        expect(getButton('Delete')).toBeInTheDocument();
        expect(getButton('Cancel')).toBeInTheDocument();
    });

    test('"deleteSchema" is dispatched when "Delete" button is clicked', () => {
        const { store } = renderCustomCardButtonsGridItem({
            mock: true,
            async: true,
            renderProps: { isCardClicked: true }
        });
        const actionPayload = '1';

        userEvent.click(getButton('Delete'));

        const dispatchedAction = store.getActions()[0];
        expect(dispatchedAction.type).toBe(deleteSchema.pending.type);
        expect(dispatchedAction.meta.arg).toEqual(actionPayload);
    });

    test('"setActiveSchemaId" is dispatched when "Cancel" button is clicked', () => {
        const { store } = renderCustomCardButtonsGridItem({
            mock: true,
            renderProps: { isCardClicked: true }
        });
        const actionPayload = null;

        userEvent.click(getButton('Cancel'));

        expect(store.getActions()).toEqual([setActiveSchemaId(actionPayload)]);
    })

    test('"setActiveSchemaId" is dispatched when Card is clicked', () => {
        const { store } = renderCustomCardButtonsGridItem({ mock: true });
        const actionPayload = '1';

        userEvent.click(getAllButtons('Schema 1 2')[0].firstElementChild);

        expect(store.getActions()).toEqual([setActiveSchemaId(actionPayload)]);
    })
});
