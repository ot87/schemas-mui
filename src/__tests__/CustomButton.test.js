import React from 'react';
import { render, screen, mockUseMediaQuery } from '../test-utils';
import userEvent from '@testing-library/user-event';

import CustomButton from '../components/Common/CustomButton/CustomButton';

const renderCustomButton = (renderProps) => {
    const onClickHandler = jest.fn(),
        { rerender }     = render(
            <CustomButton text='CustomButton' onClick={onClickHandler} {...renderProps} />
        ),
        customButton     = screen.getByRole('button', { name: 'CustomButton' });

    return {
        customButton,
        onClickHandler,
        rerenderCustomButton: (rerenderProps) => {
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

test('CustomButton is displayed and onClick handleris called', () => {
    const { customButton, onClickHandler } = renderCustomButton();

    // check that customButton is displayed
    expect(customButton).toBeInTheDocument();

    // check that CustomButton's onClickHandler has been called
    userEvent.click(customButton);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

testSuite.forEach(({
    name,
    initProps, initExpectedClass = null, initOnClickCall,
    rerenderProps, expectedClass, secondOnClickCall
}) => {
    test(name, () => {
        const { customButton, onClickHandler, rerenderCustomButton } = renderCustomButton(initProps);

        if (initExpectedClass !== null) {
            expect(customButton).toHaveClass(initExpectedClass);
        }

        userEvent.click(customButton);
        expect(onClickHandler).toHaveBeenCalledTimes(initOnClickCall);

        rerenderCustomButton(rerenderProps);
        expect(customButton).toHaveClass(expectedClass);

        userEvent.click(customButton);
        expect(onClickHandler).toHaveBeenCalledTimes(secondOnClickCall);
    });
});

test('Size of CustomButton is small for screen width less than 390px', () => {
    window.matchMedia = mockUseMediaQuery(300);

    const { customButton } = renderCustomButton();
    expect(customButton).toHaveClass('MuiButton-sizeSmall');
});

test('Size of CustomButton is medium for screen width between 390px and 600px', () => {
    window.matchMedia = mockUseMediaQuery(500);

    const { customButton } = renderCustomButton();
    expect(customButton.getAttribute('class')).not.toContain('MuiButton-size');
});

test('Size of CustomButton is large for screen width 600px and more', () => {
    window.matchMedia = mockUseMediaQuery(600);

    const { customButton, rerenderCustomButton } = renderCustomButton();
    expect(customButton).toHaveClass('MuiButton-sizeLarge');

    window.matchMedia = mockUseMediaQuery(700);

    rerenderCustomButton();
    expect(customButton).toHaveClass('MuiButton-sizeLarge');
});
