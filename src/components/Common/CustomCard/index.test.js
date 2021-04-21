import React from 'react';
import { render, mockStyleInjection } from 'test-utils';
import { getAllButtons } from 'test-helpers';

import CustomCard from '.';
import customPrimaryColors from 'components/utils/customPrimaryColors';

const yellowColor = customPrimaryColors.light.yellow.main;
const redColor    = customPrimaryColors.light.red.main;

const cardContent = [
    {id: '1', name: 'item 1'},
    {id: '2', name: 'item 2'}
].map((item) => <div key={item.id}>{item.name}</div>);

const renderCard = ({ renderProps = {} } = {}) => {
    const initProps = {
        name:    'CustomCard 1',
        content: cardContent
    };
    render(<CustomCard {...initProps} {...renderProps} />);

    return {
        card: getAllButtons('CustomCard 1 item 1 item 2')[0]
    };
};

describe('CustomCard', () => {
    test('CustomCard is displayed', () => {
        const { card } = renderCard();

        // check that CustomCard is displayed
        expect(card).toBeInTheDocument();
    });

    test('CustomCard with "yellow" theme has yellow background for hover', () => {
        const applyJSSRules = mockStyleInjection();
        const { card } = renderCard({ renderProps: { colorTheme: 'yellow' } });

        applyJSSRules();

        // check that CustomCard has yellow background
        expect(
            card.getElementsByTagName('span')[1]
        ).toHaveStyle(`background-color: ${yellowColor}`);
    });

    test('CustomCard with "red" theme has red background for hover', () => {
        const applyJSSRules = mockStyleInjection();
        const { card } = renderCard({ renderProps: { colorTheme: 'red' } });

        applyJSSRules();

        // check that CustomCard has red background
        expect(
            card.getElementsByTagName('span')[1]
        ).toHaveStyle(`background-color: ${redColor}`);
    });
});
