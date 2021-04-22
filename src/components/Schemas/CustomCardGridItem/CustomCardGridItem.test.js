import React from 'react';
import { render, mockStyleInjection } from 'test-utils';
import { getAllButtons } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import CustomCardGridItem    from './CustomCardGridItem';
import { setActiveSchemaId } from 'redux/reducers/ui';
import customPrimaryColors from 'components/utils/customPrimaryColors';

const yellowColor = customPrimaryColors.light.yellow.main;

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
    const { mockedStore } = render(
        <CustomCardGridItem id='1' {...renderProps} />,
        { initialState, mock }
    );

    return {
        card: getAllButtons('Schema 1 2')[0],
        mockedStore
    };
};

describe('CustomCardGridItem', () => {
    test('CustomCardGridItem is displayed', () => {
        const { card } = renderCustomCardGridItem();

        expect(card).toBeInTheDocument();
    });

    test('CustomCardGridItem with "yellow" theme has yellow background for hover', () => {
        const applyJSSRules = mockStyleInjection();
        const { card } = renderCustomCardGridItem({ renderProps: { themeColor: 'yellow' } });

        applyJSSRules();

        expect(
            card.getElementsByTagName('span')[1]
        ).toHaveStyle(`background-color: ${yellowColor}`);
    });

    test('"setActiveSchemaId" is dispatched when Card is clicked', () => {
        const { card, mockedStore } = renderCustomCardGridItem({ mock: true });
        const actionPayload = '1';

        userEvent.click(card.firstElementChild);

        expect(mockedStore.getActions()).toEqual([setActiveSchemaId(actionPayload)]);
    });
});
