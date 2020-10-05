import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

import CardWithButtons from '../components/Common/Card/CardWithButtons';

const cardContent = [
    {id: 1, name: 'item 1'},
    {id: 2, name: 'item 2'}
].map((item) => <div key={item.id}>{item.name}</div>);

test('CardWithButtons is displayed with two clickable Plates', () => {
    const onCardClickHandler   = jest.fn(),
          onPlate1ClickHandler = jest.fn(),
          onPlate2ClickHandler = jest.fn();
    const { rerender } = render(
        <CardWithButtons
            name='Schema 1'
            content={cardContent}
            cardIsClicked={false}
            onClick={onCardClickHandler}
            buttons={({
                first: {
                    text: 'Plate 1',
                    onClick: onPlate1ClickHandler
                },
                second: {
                    text: 'Plate 2',
                    onClick: onPlate2ClickHandler
                }
            })}
        />
    );

    // check that CardWithButtons is displayed
    const cardWithButtons = screen.getByRole('button', { name: 'Schema 1 item 1 item 2' });
    expect(cardWithButtons).toBeInTheDocument();

    // check that CardWithButtons does not contain Plate 1 and Plate 2
    expect(cardWithButtons).not.toContainElement(screen.queryByRole('button', { name: 'Plate 1' }));
    expect(cardWithButtons).not.toContainElement(screen.queryByRole('button', { name: 'Plate 2' }));

    // check that Card's onClickHandler has been called
    userEvent.click(cardWithButtons);
    expect(onCardClickHandler).toHaveBeenCalledTimes(1);

    rerender(
        <CardWithButtons
            name='Schema 1'
            content={cardContent}
            cardIsClicked={true}
            onClick={onCardClickHandler}
            buttons={({
                first: {
                    text: 'Plate 1',
                    onClick: onPlate1ClickHandler
                },
                second: {
                    text: 'Plate 2',
                    onClick: onPlate2ClickHandler
                }
            })}
        />
    );

    // check that CardWithButtons is rerendered with new content when is clicked
    expect(screen.queryByRole('button', { name: 'Schema 1 item 1 item 2' })).not.toBeInTheDocument();
    expect(cardWithButtons).toEqual(
        screen.getByRole('button', { name: 'Schema 1 Plate 1 Plate 2' })
    );

    const plate1 = screen.getByRole('button', { name: 'Plate 1' }),
          plate2 = screen.getByRole('button', { name: 'Plate 2' });

    // check that Plate 1 and Plate 2 are displayed
    expect(plate1).toBeInTheDocument();
    expect(plate2).toBeInTheDocument();

    // check that CardWithButtons contains Plate 1 and Plate 2
    expect(cardWithButtons).toContainElement(plate1);
    expect(cardWithButtons).toContainElement(plate2);

    // check that CardWithButtons is clicked
    expect(cardWithButtons).toHaveClass('clicked');

    // check that CardWithButtons's onCardClickHandler hasn't been called for already clicked CardWithButtons
    userEvent.click(cardWithButtons);
    expect(onCardClickHandler).toHaveBeenCalledTimes(1);

    // check that Plate1 is clickable
    userEvent.click(plate1);
    expect(onPlate1ClickHandler).toHaveBeenCalledTimes(1);

    // check that Plate2 is clickable
    userEvent.click(plate2);
    expect(onPlate2ClickHandler).toHaveBeenCalledTimes(1);

    rerender(
        <CardWithButtons
            name='Schema 1'
            content={cardContent}
            cardIsClicked={false}
            onClick={onCardClickHandler}
            buttons={({
                first: {
                    text: 'Plate 1',
                    onClick: onPlate1ClickHandler
                },
                second: {
                    text: 'Plate 2',
                    onClick: onPlate2ClickHandler
                }
            })}
        />
    );

    // check that CardWithButtons is rerendered with new content again when is unclicked
    expect(screen.queryByRole('button', { name: 'Schema 1 Plate 1 Plate 2' })).not.toBeInTheDocument();
    expect(cardWithButtons).toEqual(
        screen.getByRole('button', { name: 'Schema 1 item 1 item 2' })
    );

    // check that CardWithButtons does not contain Plate 1 and Plate 2
    expect(cardWithButtons).not.toContainElement(screen.queryByRole('button', { name: 'Plate 1' }));
    expect(cardWithButtons).not.toContainElement(screen.queryByRole('button', { name: 'Plate 2' }));

    // check that Plate 1 and Plate 2 aren't displayed at all
    expect(screen.queryByRole('button', { name: 'Plate 1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Plate 2' })).not.toBeInTheDocument();

    // check that CardWithButtons is unclicked
    expect(cardWithButtons).not.toHaveClass('clicked');

    // check that CardWithButtons is clickable again
    userEvent.click(cardWithButtons);
    expect(onCardClickHandler).toHaveBeenCalledTimes(2);
});