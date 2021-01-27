import React from 'react';
import { render, getAllButtons, getButton, queryButton } from 'test-utils';
import userEvent from '@testing-library/user-event';

import CustomCardWithButtons from './CustomCardWithButtons';

const cardContent = [
    {id: 1, name: 'item 1'},
    {id: 2, name: 'item 2'}
].map((item) => <div key={item.id}>{item.name}</div>);

const notClickedName = 'CustomCard 1 item 1 item 2';
const clickedName = 'CustomCard 1 Button 1 Button 2';

const renderCard = (renderProps) => {
    const onClickHandler        = jest.fn();
    const onButton1ClickHandler = jest.fn();
    const onButton2ClickHandler = jest.fn();
    const buttons = {
        first: {
            text: 'Button 1',
            onClick: onButton1ClickHandler
        },
        second: {
            text: 'Button 2',
            onClick: onButton2ClickHandler
        }
    };
    const initProps = {
        name:          'CustomCard 1',
        content:       cardContent,
        cardIsClicked: false,
        onClick:       onClickHandler,
        buttons:       buttons
    };
    const { rerender } = render(<CustomCardWithButtons {...initProps} {...renderProps} />);

    return {
        card: getAllButtons(notClickedName)[0],
        onClickHandler,
        onButton1ClickHandler,
        onButton2ClickHandler,
        rerenderCard: (rerenderProps) => {
            rerender(<CustomCardWithButtons {...initProps} {...rerenderProps} />);
        }
    };
};

test('CustomCardWithButtons is displayed without CustomButtons', () => {
    const { card, onClickHandler } = renderCard();

    // check that CustomCardWithButtons is displayed
    expect(card).toBeInTheDocument();

    // check that CustomCardWithButtons does not contain CustomButton 1 and CustomButton 2
    expect(card).not.toContainElement(queryButton('Button 1'));
    expect(card).not.toContainElement(queryButton('Button 2'));

    // check that Card's onClickHandler has been called
    userEvent.click(card.firstElementChild);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('CustomCardWithButtons is displayed with two clickable CustomButtons', () => {
    const {
        card, onClickHandler,
        onButton1ClickHandler, onButton2ClickHandler,
        rerenderCard
    } = renderCard();

    rerenderCard({ cardIsClicked: true });

    // check that CustomCardWithButtons is rerendered with a new content when is clicked
    expect(queryButton(notClickedName)).not.toBeInTheDocument();
    expect(card).toBeInTheDocument();

    // check that CustomButton 1 and CustomButton 2 are displayed
    const button1 = getButton('Button 1'),
          button2 = getButton('Button 2');

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();

    // check that CustomCardWithButtons contains CustomButton 1 and CustomButton 2
    expect(card).toContainElement(button1);
    expect(card).toContainElement(button2);

    // check that CustomCardWithButtons's onClickHandler hasn't been called for already clicked CustomCardWithButtons
    userEvent.click(card);
    userEvent.click(card.firstElementChild);
    expect(onClickHandler).toHaveBeenCalledTimes(0);

    // check that CustomButton 1 is clickable
    userEvent.click(button1);
    expect(onButton1ClickHandler).toHaveBeenCalledTimes(1);

    // check that CustomButton 2 is clickable
    userEvent.click(button2);
    expect(onButton2ClickHandler).toHaveBeenCalledTimes(1);

    rerenderCard({ cardIsClicked: false });

    // check that CustomCardWithButtons is rerendered with new content again when is unclicked
    expect(queryButton(clickedName)).not.toBeInTheDocument();
    expect(card).toBeInTheDocument();

    // check that CustomCardWithButtons does not contain CustomButton 1 and CustomButton 2
    expect(card).not.toContainElement(button1);
    expect(card).not.toContainElement(button2);

    // check that CustomButton 1 and CustomButton 2 aren't displayed at all
    expect(queryButton('Button 1')).not.toBeInTheDocument();
    expect(queryButton('Button 2')).not.toBeInTheDocument();

    // check that CustomCardWithButtons is clickable again
    userEvent.click(card.firstElementChild);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});
