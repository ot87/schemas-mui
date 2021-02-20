import React from 'react';
import { render, mockStyleInjection } from 'test-utils';
import { getAllButtons } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import CustomCard from './CustomCard';

import yellow from '@material-ui/core/colors/yellow';
import red    from '@material-ui/core/colors/red';

const cardContent = [
    {id: 1, name: 'item 1'},
    {id: 2, name: 'item 2'}
].map((item) => <div key={item.id}>{item.name}</div>);

const renderCard = (renderProps) => {
    const onClickHandler = jest.fn();
    const initProps      = {
        name:    'CustomCard 1',
        content: cardContent,
        onClick: onClickHandler,
    };
    const { rerender } = render(<CustomCard {...initProps} {...renderProps} />);

    return {
        card: getAllButtons('CustomCard 1 item 1 item 2')[0],
        onClickHandler,
        rerenderCard: (rerenderProps) => {
            rerender(<CustomCard {...initProps} {...rerenderProps} />);
        }
    };
};

test('CustomCard is displayed and onClick handler is called by clicking inner part of the Card', () => {
    const { card, onClickHandler } = renderCard();

    // check that CustomCard is displayed
    expect(card).toBeInTheDocument();

    // check that CustomCard's onClickHandler has been called
    userEvent.click(card.firstElementChild);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('onClick handler is not called by clicking the outer part of the Card', () => {
    const { card, onClickHandler } = renderCard();

    // check that CustomCard's onClickHandler has been called
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(0);
});

test('if isClicked is true CustomCard is not clickable', () => {
    const { card, onClickHandler, rerenderCard } = renderCard({ isClicked: false });

    // check that CustomCard's onClickHandler has been called
    userEvent.click(card.firstElementChild);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerenderCard({ isClicked: true });
    // check that rerendered CustomCard is displayed
    expect(card).toBeInTheDocument();

    // check that CustomCard's onClickHandler has not been called second time
    userEvent.click(card);
    userEvent.click(card.firstElementChild);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('CustomCard with yellow theme has yellow background for hover', () => {
    const applyJSSRules = mockStyleInjection();
    const { card } = renderCard({ colorTheme: 'yellow' });

    applyJSSRules();

    // check that CustomCard has yellow background
    expect(
        card.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
    ).toHaveStyle(`background-color: ${yellow[600]}`);
});

test('CustomCard with red theme has red background for hover', () => {
    const applyJSSRules = mockStyleInjection();
    const { card } = renderCard({ colorTheme: 'red' });

    applyJSSRules();

    // check that CustomCard has red background
    expect(
        card.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
    ).toHaveStyle(`background-color: ${red[600]}`);
});
