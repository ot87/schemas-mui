import React from 'react';
import { render, screen, mockUseMediaQuery } from '../test-utils';
import userEvent from '@testing-library/user-event';

import CustomButton from '../components/Common/CustomButton/CustomButton';

const renderButton = (renderProps) => {
    const onClickHandler = jest.fn(),
        { rerender }     = render(
            <CustomButton text='CustomButton' onClick={onClickHandler} {...renderProps} />
        );

    return {
        button: screen.getByRole('button', { name: 'CustomButton' }),
        onClickHandler,
        rerenderButton: (rerenderProps) => {
            rerender(
                <CustomButton text='CustomButton' onClick={onClickHandler} {...rerenderProps} />
            );
        }
    };
};
const testSuite = [{
    name: 'if isClicked is true CustomButton becomes not clickable',
    initProps: { isClicked: false },
    initOnClickCall: 1,
    rerenderProps: { isClicked: true },
    expectedClass: 'MuiButton-contained',
    secondOnClickCall: 1
}, {
    name: 'if isToggled is true CustomButton stays clickable',
    initProps: { isToggled: false },
    initOnClickCall: 1,
    rerenderProps: { isToggled: true },
    expectedClass: 'MuiButton-contained',
    secondOnClickCall: 2
}, {
    name: 'if isDisabled is true CustomButton becomes not clickable',
    initProps: { isDisabled: false },
    initOnClickCall: 1,
    rerenderProps: { isDisabled: true },
    expectedClass: 'Mui-disabled',
    secondOnClickCall: 1
}, {
    name: 'if isDisabled is true CustomButton becomes not clickable even when isClickable is false',
    initProps: { isClicked: false, isDisabled: false },
    initOnClickCall: 1,
    rerenderProps: { isClicked: false, isDisabled: true },
    expectedClass: 'Mui-disabled',
    secondOnClickCall: 1
}, {
    name: 'if isDisabled is true CustomButton becomes not clickable even when isToggled is false',
    initProps: { isToggled: false, isDisabled: false },
    initOnClickCall: 1,
    rerenderProps: { isToggled: false, isDisabled: true },
    expectedClass: 'Mui-disabled',
    secondOnClickCall: 1
}, {
    name: 'if isDisabled is true CustomButton becomes not clickable even when isToggled is true',
    initProps: { isToggled: true, isDisabled: false },
    initExpectedClass: 'MuiButton-contained',
    initOnClickCall: 1,
    rerenderProps: { isToggled: true, isDisabled: true },
    expectedClass: 'Mui-disabled',
    secondOnClickCall: 1
}];

test('CustomButton is displayed and onClick handler is called', () => {
    const { button, onClickHandler } = renderButton();

    // check that CustomButton is displayed
    expect(button).toBeInTheDocument();

    // check that CustomButton's onClickHandler has been called
    userEvent.click(button);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

testSuite.forEach(({
    name,
    initProps, initExpectedClass = null, initOnClickCall,
    rerenderProps, expectedClass, secondOnClickCall
}) => {
    test(name, () => {
        const { button, onClickHandler, rerenderButton } = renderButton(initProps);

        if (initExpectedClass !== null) {
            expect(button).toHaveClass(initExpectedClass);
        }

        userEvent.click(button);
        expect(onClickHandler).toHaveBeenCalledTimes(initOnClickCall);

        rerenderButton(rerenderProps);
        // check that rerendered CustomButton is displayed
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass(expectedClass);

        userEvent.click(button);
        expect(onClickHandler).toHaveBeenCalledTimes(secondOnClickCall);
    });
});

test('Size of CustomButton is small for screen width less than 390px', () => {
    window.matchMedia = mockUseMediaQuery(300);

    const { button } = renderButton();
    expect(button).toHaveClass('MuiButton-sizeSmall');
});

test('Size of CustomButton is medium for screen width between 390px and 600px', () => {
    window.matchMedia = mockUseMediaQuery(500);

    const { button } = renderButton();
    expect(button.getAttribute('class')).not.toContain('MuiButton-size');
});

test('Size of CustomButton is large for screen width 600px and more', () => {
    window.matchMedia = mockUseMediaQuery(600);

    const { button, rerenderButton } = renderButton();
    expect(button).toHaveClass('MuiButton-sizeLarge');

    window.matchMedia = mockUseMediaQuery(700);

    rerenderButton();
    expect(button).toHaveClass('MuiButton-sizeLarge');
});
