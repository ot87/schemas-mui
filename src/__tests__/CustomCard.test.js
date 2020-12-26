import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

import CustomCard from '../components/Common/CustomCard/CustomCard';

const cardContent = [
    {id: 1, name: 'item 1'},
    {id: 2, name: 'item 2'}
].map((item) => <div key={item.id}>{item.name}</div>);

const renderCard = (renderProps) => {
    const onClickHandler = jest.fn(),
        { rerender }     = render(
            <CustomCard
                name='CustomCard 1'
                content={cardContent}
                onClick={onClickHandler}
                {...renderProps}
            />
        ),
        card = screen.getByRole('button', { name: 'CustomCard 1 item 1 item 2' });

    return {
        card,
        onClickHandler,
        rerenderCard: (rerenderProps) => {
            rerender(
                <CustomCard
                    name='CustomCard 1'
                    content={cardContent}
                    onClick={onClickHandler}
                    {...rerenderProps}
                />
            );
        }
    };
};

test('CustomCard is displayed and onClick handler is called by clicking', () => {
    const { card, onClickHandler } = renderCard();

    // check that CustomCard is displayed
    expect(card).toBeInTheDocument();

    // check that CustomCard's onClickHandler has been called
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('if isClicked is true CustomCard is not clickable', () => {
    const { card, onClickHandler, rerenderCard } = renderCard({ isClicked: false });

    // check that CustomCard's onClickHandler has been called
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerenderCard({ isClicked: true });

    // check that CustomCard's onClickHandler has not been called second time
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('CustomCard with yellow theme has yellow highlight when hovered', () => {
    const { card } = renderCard({ colorTheme: 'yellow' });

    // check that CustomCard is displayed
    expect(card).toBeInTheDocument();

    // check that CustomCard has yellow highlight when hovered
    userEvent.hover(card);
    expect(
        card.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
    ).toBeInTheDocument();
});

test('CustomCard with red theme has red highlight when hovered', () => {
    const { card } = renderCard({ colorTheme: 'red' });

    // check that CustomCard is displayed
    expect(card).toBeInTheDocument();

    // check that CustomCard has red highlight when hovered
    userEvent.hover(card);
    expect(
        card.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
    ).toBeInTheDocument();
});
