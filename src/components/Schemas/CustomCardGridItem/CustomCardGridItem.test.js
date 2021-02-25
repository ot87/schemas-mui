import React from 'react';
import { render, mockStyleInjection, configureMockAppStore } from 'test-utils';
import { getAllButtons } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import CustomCardGridItem    from './CustomCardGridItem';
import { setActiveSchemaId } from 'redux/reducers/ui';

import yellow from '@material-ui/core/colors/yellow';

const renderCustomCardGridItem = ({ mock = false, renderProps = {} } = {}) => {
    const initialState = { schemas: {
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
    }};
    const store = mock ?
        configureMockAppStore(false)(initialState)
    : undefined;

    render(<CustomCardGridItem id='1' {...renderProps} />, { initialState, store });

    return {
        card: getAllButtons('Schema 1 2')[0],
        store
    };
};

describe('CustomCardGridItem', () => {
    test('CustomCardGridItem is displayed', () => {
        const { card } = renderCustomCardGridItem();

        expect(card).toBeInTheDocument();
    });

    test('CustomCardGridItem with yellow theme has yellow background for hover', () => {
        const applyJSSRules = mockStyleInjection();
        const { card } = renderCustomCardGridItem({ renderProps: { colorTheme: 'yellow' } });

        applyJSSRules();

        expect(
            card.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
        ).toHaveStyle(`background-color: ${yellow[600]}`);
    });

    test('"setActiveSchemaId" is dispatched when Card is clicked', () => {
        const { card, store } = renderCustomCardGridItem({ mock: true });
        const actionPayload = '1';

        userEvent.click(card.firstElementChild);

        expect(store.getActions()).toEqual([setActiveSchemaId(actionPayload)]);
    });
});
