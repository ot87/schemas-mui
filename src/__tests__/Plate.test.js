import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

import Plate from '../components/Common/Plate/Plate';

const renderPlate = (renderProps) => {
    const onClickHandler = jest.fn(),
          { rerender }   = render(<Plate text='Plate' onClick={onClickHandler} {...renderProps} />),
          plate          = screen.getByRole('button', { name: 'Plate' });

    return {
        plate,
        onClickHandler,
        rerenderPlate: (rerenderProps) => {
            rerender(<Plate text='Plate' onClick={onClickHandler} {...rerenderProps} />);
        }
    };
};

test('Plate is displayed and calls onClick handler', () => {
    const { plate, onClickHandler } = renderPlate();

    // check that plate is displayed
    expect(plate).toBeInTheDocument();

    // check that Plate's onClickHandler has been called
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('if isClicked true Plate becomes not clickable', () => {
    const { plate, onClickHandler, rerenderPlate } = renderPlate({ isClicked: false });

    // check that Plate is clickable
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerenderPlate({ isClicked: true });

    // check that Plate is clicked
    expect(plate).toHaveClass('clickedPlate');

    // check that Plate's onClickHandler hasn't been called for already clicked Plate
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('if isToggled true Plate stays clickable', () => {
    const { plate, onClickHandler, rerenderPlate } = renderPlate({ isToggled: false });

    // check that Plate is clickable
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerenderPlate({ isToggled: true });

    // check that Plate is clicked
    expect(plate).toHaveClass('toggledPlate');

    // check that Plate's onClickHandler has been called twice
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(2);
});

test('if isDisabled true Plate becomes not clickable', () => {
    const { plate, onClickHandler, rerenderPlate } = renderPlate({ isDisabled: false });

    // check that Plate is clickable
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerenderPlate({ isDisabled: true });

    // check that Plate is disabled
    expect(plate).toHaveClass('disabledPlate');

    // check that Plate's onClickHandler hasn't been called for disabled Plate
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('if isDisabled true Plate becomes not clickable even when isClickable is false', () => {
    const { plate, onClickHandler, rerenderPlate } = renderPlate({
        isClicked:  false,
        isDisabled: false
    });

    // check that Plate is clickable
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerenderPlate({ isClicked: false, isDisabled: true });

    // check that Plate is disabled
    expect(plate).toHaveClass('disabledPlate');

    // check that Plate's onClickHandler hasn't been called for disabled Plate
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('if isDisabled true Plate becomes not clickable even when isToggled is false', () => {
    const { plate, onClickHandler, rerenderPlate } = renderPlate({
        isToggled:  false,
        isDisabled: false
    });

    // check that Plate is clickable
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerenderPlate({ isToggled: false, isDisabled: true });

    // check that Plate is disabled
    expect(plate).toHaveClass('disabledPlate');

    // check that Plate's onClickHandler hasn't been called for disabled Plate
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

test('if isDisabled true Plate becomes not clickable even when isToggled is true', () => {
    const { plate, onClickHandler, rerenderPlate } = renderPlate({
        isToggled:  true,
        isDisabled: false
    });

    // check that Plate is clicked
    expect(plate).toHaveClass('toggledPlate');

    // check that Plate is clickable
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    rerenderPlate({ isToggled: true, isDisabled: true });

    // check that Plate isn't clicked and is disabled
    expect(plate).not.toHaveClass('toggledPlate');
    expect(plate).toHaveClass('disabledPlate');

    // check that Plate's onClickHandler hasn't been called for disabled Plate
    userEvent.click(plate);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});