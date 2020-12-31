import React from 'react';
import { render, screen, mockUseMediaQuery, mockStyleInjection } from '../test-utils';
import userEvent from '@testing-library/user-event';

import CustomButton from '../components/Common/CustomButton/CustomButton';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

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

test('CustomButton is displayed and onClick handler is called', () => {
    const { button, onClickHandler } = renderButton();

    // check that CustomButton is displayed
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-outlined');

    // check that CustomButton's onClickHandler has been called
    userEvent.click(button);
    expect(onClickHandler).toHaveBeenCalledTimes(1);
});

describe('Properties isClicked, isToggled, isDisabled of CustomButton', () => {
    [{
        name: 'if isClicked is true CustomButton becomes not clickable',
        initProps: { isClicked: false },
        initExpectedClass: 'MuiButton-outlined',
        initOnClickCall: 1,
        rerenderProps: { isClicked: true },
        expectedClass: 'MuiButton-contained',
        secondOnClickCall: 1
    }, {
        name: 'if isToggled is true CustomButton stays clickable',
        initProps: { isToggled: false },
        initExpectedClass: 'MuiButton-outlined',
        initOnClickCall: 1,
        rerenderProps: { isToggled: true },
        expectedClass: 'MuiButton-contained',
        secondOnClickCall: 2
    }, {
        name: 'if isDisabled is true CustomButton becomes not clickable',
        initProps: { isDisabled: false },
        initExpectedClass: 'MuiButton-outlined',
        initOnClickCall: 1,
        rerenderProps: { isDisabled: true },
        expectedClass: 'Mui-disabled',
        secondOnClickCall: 1
    }, {
        name: 'if isDisabled is true CustomButton becomes not clickable even when isClickable is false',
        initProps: { isClicked: false, isDisabled: false },
        initExpectedClass: 'MuiButton-outlined',
        initOnClickCall: 1,
        rerenderProps: { isClicked: false, isDisabled: true },
        expectedClass: 'Mui-disabled',
        secondOnClickCall: 1
    }, {
        name: 'if isDisabled is true CustomButton becomes not clickable even when isToggled is false',
        initProps: { isToggled: false, isDisabled: false },
        initExpectedClass: 'MuiButton-outlined',
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
    }].forEach(({
        name,
        initProps, initExpectedClass, initOnClickCall,
        rerenderProps, expectedClass, secondOnClickCall
    }) => {
        test(name, () => {
            const { button, onClickHandler, rerenderButton } = renderButton(initProps);

            expect(button).toHaveClass(initExpectedClass);

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
});

describe('Responsiveness of CustomButton', () => {
    test('Size of CustomButton is small for screen width less than 390px', () => {
        mockUseMediaQuery(300);

        const { button } = renderButton();
        expect(button).toHaveClass('MuiButton-sizeSmall');
    });

    test('Size of CustomButton is medium for screen width between 390px and 600px', () => {
        mockUseMediaQuery(500);

        const { button } = renderButton();
        expect(button.getAttribute('class')).not.toContain('MuiButton-size');
    });

    test('Size of CustomButton is large for screen width 600px and more', () => {
        mockUseMediaQuery(600);

        const { button, rerenderButton } = renderButton();
        expect(button).toHaveClass('MuiButton-sizeLarge');

        mockUseMediaQuery(700);

        rerenderButton();
        expect(button).toHaveClass('MuiButton-sizeLarge');
    });
});

describe('Property colorTheme of CustomButton', () => {
    [{
        name: 'CustomButton with green colorTheme is green',
        initProps: { colorTheme: 'green' },
        expectedStyle: `color: ${green[600]}`
    }, {
        name: 'CustomButton with yellow colorTheme is yellow',
        initProps: { colorTheme: 'yellow' },
        expectedStyle: `color: ${yellow[600]}`
    }, {
        name: 'CustomButton with red colorTheme is red',
        initProps: { colorTheme: 'red' },
        expectedStyle: `color: ${red[600]}`
    }, {
        name: 'Clicked CustomButton with green colorTheme is green',
        initProps: { isClicked: true, colorTheme: 'green' },
        expectedStyle: `background-color: ${green[600]}`
    }, {
        name: 'Clicked CustomButton with yellow colorTheme is yellow',
        initProps: { isClicked: true, colorTheme: 'yellow' },
        expectedStyle: `background-color: ${yellow[600]}`
    }, {
        name: 'Clicked CustomButton with red colorTheme is red',
        initProps: { isClicked: true, colorTheme: 'red' },
        expectedStyle: `background-color: ${red[600]}`
    }, {
        name: 'Toggled CustomButton with green colorTheme is green',
        initProps: { isToggled: true, colorTheme: 'green' },
        expectedStyle: `background-color: ${green[600]}`
    }, {
        name: 'Toggled CustomButton with yellow colorTheme is yellow',
        initProps: { isToggled: true, colorTheme: 'yellow' },
        expectedStyle: `background-color: ${yellow[600]}`
    }, {
        name: 'Toggled CustomButton with red colorTheme is red',
        initProps: { isToggled: true, colorTheme: 'red' },
        expectedStyle: `background-color: ${red[600]}`
    }].forEach(({ name, initProps, expectedStyle }) => {
        test(name, () => {
            const applyJSSRules = mockStyleInjection();
            const { button } = renderButton(initProps);

            applyJSSRules();

            expect(button).toHaveStyle(expectedStyle);
        });
    });

    test('CustomButton with unknown colorTheme has standard primary color', () => {
        const applyJSSRules = mockStyleInjection();
        const { button } = renderButton({ colorTheme: 'pink' });
        const currentTheme = createMuiTheme();

        applyJSSRules();

        expect(button).toHaveStyle(`color: ${currentTheme.palette.primary.main}`);
    });

    test('Clicked CustomButton with unknown colorTheme has standard primary color and has that color while hovered', () => {
        const applyJSSRules = mockStyleInjection();
        const { button } = renderButton({ isClicked: true, colorTheme: 'pink' });
        const currentTheme = createMuiTheme();

        applyJSSRules();

        expect(button).toHaveStyle(`background-color: ${currentTheme.palette.primary.main}`);
    });
});
