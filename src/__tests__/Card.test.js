import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

import Card from '../components/Common/Card/Card';

const cardContent = [
    {id: 1, name: 'item 1'},
    {id: 2, name: 'item 2'}
].map((item) => <div key={item.id}>{item.name}</div>);

test('Card is displayed and calls onClick handler', () => {
    const onClickHandler = jest.fn();
    render(<Card name='Schema 1' content={cardContent} onClick={onClickHandler} />);

    // check that Card is displayed
    const card = screen.getByRole('button', { name: 'Schema 1 item 1 item 2' });
    expect(card).toBeInTheDocument();

    // check that Card's onClickHandler has been called
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('if isClicked true Card stays clickable', () => {
    const onClickHandler = jest.fn();
    const { rerender } = render(
        <Card name='Schema 1' content={cardContent} isClicked={false} onClick={onClickHandler} />
    );

    const card = screen.getByRole('button', { name: 'Schema 1 item 1 item 2' });

    // check that Card's onClickHandler has been called
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerender(
        <Card name='Schema 1' content={cardContent} isClicked={true} onClick={onClickHandler} />
    );

    // check that Card is clicked
    expect(card).toHaveClass('clicked');

    // check that Card's onClickHandler has been called twice
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(2);
});