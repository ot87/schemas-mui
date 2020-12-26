import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

import CustomCard from '../components/Common/CustomCard/CustomCard';

const cardContent = [
    {id: 1, name: 'item 1'},
    {id: 2, name: 'item 2'}
].map((item) => <div key={item.id}>{item.name}</div>);

test('CustomCard is displayed and onClick handler is called by clicking', () => {
    const onClickHandler = jest.fn();
    render(<CustomCard name='Schema 1' content={cardContent} onClick={onClickHandler} />);

    // check that CustomCard is displayed
    const card = screen.getByRole('button', { name: 'Schema 1 item 1 item 2' });
    expect(card).toBeInTheDocument();

    // check that CustomCard's onClickHandler has been called
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('if isClicked is true CustomCard is not clickable', () => {
    const onClickHandler = jest.fn();
    const { rerender } = render(
        <CustomCard name='Schema 1' content={cardContent} isClicked={false} onClick={onClickHandler} />
    );

    const card = screen.getByRole('button', { name: 'Schema 1 item 1 item 2' });

    // check that CustomCard's onClickHandler has been called
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerender(
        <CustomCard name='Schema 1' content={cardContent} isClicked={true} onClick={onClickHandler} />
    );

    // check that CustomCard's onClickHandler has not been called second time
    userEvent.click(card);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('CustomCard with yellow theme has yellow highlight when hovered', () => {
    const onClickHandler = jest.fn();
    render(
        <CustomCard
            name='Schema 1'
            content={cardContent}
            colorTheme='yellow'
            onClick={onClickHandler}
        />);

    // check that CustomCard is displayed
    const card = screen.getByRole('button', { name: 'Schema 1 item 1 item 2' });
    expect(card).toBeInTheDocument();

    // check that CustomCard has yellow highlight when hovered
    userEvent.hover(card);
    expect(
        card.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
    ).toBeInTheDocument();
});

test('CustomCard with red theme has red highlight when hovered', () => {
    const onClickHandler = jest.fn();
    render(
        <CustomCard
            name='Schema 1'
            content={cardContent}
            colorTheme='red'
            onClick={onClickHandler}
        />);

    // check that CustomCard is displayed
    const card = screen.getByRole('button', { name: 'Schema 1 item 1 item 2' });
    expect(card).toBeInTheDocument();

    // check that CustomCard has red highlight when hovered
    userEvent.hover(card);
    expect(
        card.getElementsByClassName('MuiCardActionArea-focusHighlight')[0]
    ).toBeInTheDocument();
});
