import React from 'react';
import { render } from 'test-utils';
import {
    getAllButtons, queryButton,
    getButtonWithin, queryButtonWithin
} from 'test-helpers';
import userEvent from '@testing-library/user-event';

import CustomCardButtons from './CustomCardButtons';

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
        name:    'CustomCard 1',
        content: cardContent,
        onClick: onClickHandler,
        buttons: buttons
    };
    const { rerender } = render(<CustomCardButtons {...initProps} {...renderProps} />);

    return {
        card: getAllButtons(notClickedName)[0],
        onClickHandler,
        onButton1ClickHandler,
        onButton2ClickHandler,
        rerenderCard: (rerenderProps) => {
            rerender(<CustomCardButtons {...initProps} {...rerenderProps} />);
        }
    };
};

test('CustomCardButtons is displayed without CustomButtons', () => {
    const { card, onClickHandler } = renderCard();

    // CustomCardButtons is displayed
    expect(card).toBeInTheDocument();

    // CustomCardButtons does not contain CustomButton 1 and CustomButton 2
    expect(queryButtonWithin(card, 'Button 1')).not.toBeInTheDocument();
    expect(queryButtonWithin(card, 'Button 2')).not.toBeInTheDocument();

    // Card's onClickHandler has been called
    userEvent.click(card.firstElementChild);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('CustomCardButtons is displayed with two clickable CustomButtons', () => {
    const {
        card, onClickHandler,
        onButton1ClickHandler, onButton2ClickHandler,
        rerenderCard
    } = renderCard();

    rerenderCard({ isCardClicked: true });

    // CustomCardButtons is rerendered with a new content when is clicked
    expect(queryButton(notClickedName)).not.toBeInTheDocument();
    expect(card).toBeInTheDocument();

    // CustomCardButtons contains CustomButton 1 and CustomButton 2
    const button1 = getButtonWithin(card, 'Button 1');
    const button2 = getButtonWithin(card, 'Button 2');

    // CustomButton 1 and CustomButton 2 are displayed
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();

    // CustomCardButtons's onClickHandler hasn't been called for already clicked CustomCardButtons
    userEvent.click(card);
    userEvent.click(card.firstElementChild);
    expect(onClickHandler).toHaveBeenCalledTimes(0);

    // CustomButton 1 is clickable
    userEvent.click(button1);
    expect(onButton1ClickHandler).toHaveBeenCalledTimes(1);

    // CustomButton 2 is clickable
    userEvent.click(button2);
    expect(onButton2ClickHandler).toHaveBeenCalledTimes(1);

    rerenderCard({ isCardClicked: false });

    // CustomCardButtons is rerendered with new content again when is unclicked
    expect(queryButton(clickedName)).not.toBeInTheDocument();
    expect(card).toBeInTheDocument();

    // CustomCardButtons does not contain CustomButton 1 and CustomButton 2
    expect(queryButtonWithin(card, 'Button 1')).not.toBeInTheDocument();
    expect(queryButtonWithin(card, 'Button 2')).not.toBeInTheDocument();

    // CustomButton 1 and CustomButton 2 aren't displayed at all
    expect(queryButton('Button 1')).not.toBeInTheDocument();
    expect(queryButton('Button 2')).not.toBeInTheDocument();

    // CustomCardButtons is clickable again
    userEvent.click(card.firstElementChild);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});
