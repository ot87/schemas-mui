import React from 'react';
import { render, mockUseMediaQuery, mockStyleInjection } from 'test-utils';
import { getButton } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import CustomButton from './CustomButton';

import green  from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red    from '@material-ui/core/colors/red';

const renderButton = ({ renderProps = {} } = {}) => {
    const onClickHandler = jest.fn();
    const initProps      = { text: 'CustomButton', onClick: onClickHandler };
    const { rerender }   = render(<CustomButton {...initProps} {...renderProps} />);

    return {
        button: getButton('CustomButton'),
        onClickHandler,
        rerenderButton: (rerenderProps) => {
            rerender(<CustomButton {...initProps} {...rerenderProps} />);
        }
    };
};

test('CustomButton is displayed with default props and onClick handler is called', () => {
    const applyJSSRules = mockStyleInjection();
    const { button, onClickHandler } = renderButton();

    applyJSSRules();

    // CustomButton is displayed (without specified type)
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-outlined');

    // CustomButton without specified colorTheme has "default" color
    expect(button.className).not.toContain('Primary');

    // onClickHandler has been called
    userEvent.click(button);
    expect(onClickHandler).toBeCalledTimes(1);
});

describe('Property colorTheme of CustomButton', () => {
    test('CustomButton with "default" colorTheme has "default" color', () => {
        const applyJSSRules = mockStyleInjection();
        const { button } = renderButton({ renderProps: { colorTheme: 'default' } });

        applyJSSRules();

        expect(button.className).not.toContain('Primary');
    });

    test.each`
        colorTheme  | expectedStyle
        ${'green'}  | ${`color: ${green[700]}`}
        ${'yellow'} | ${`color: ${yellow[700]}`}
        ${'red'}    | ${`color: ${red[700]}`}
    `(
        'CustomButton with "$colorTheme" colorTheme has "$expectedStyle" style',
        ({ colorTheme, expectedStyle }) => {
            const applyJSSRules = mockStyleInjection();
            const { button } = renderButton({ renderProps: { colorTheme } });

            applyJSSRules();

            expect(button).toHaveStyle(expectedStyle);
        }
    );
});

describe('Properties colorTheme and type of CustomButton', () => {
    test.each`
        colorTheme  | type          | expectedStyle
        ${'green'}  | ${'clicked'}  | ${`background-color: ${green[700]}`}
        ${'yellow'} | ${'clicked'}  | ${`background-color: ${yellow[700]}`}
        ${'red'}    | ${'clicked'}  | ${`background-color: ${red[700]}`}
        ${'green'}  | ${'toggled'}  | ${`background-color: ${green[700]}`}
        ${'yellow'} | ${'toggled'}  | ${`background-color: ${yellow[700]}`}
        ${'red'}    | ${'toggled'}  | ${`background-color: ${red[700]}`}
        ${'green'}  | ${'disabled'} | ${`background-color: #fff`}
        ${'yellow'} | ${'disabled'} | ${`background-color: #fff`}
        ${'red'}    | ${'disabled'} | ${`background-color: #fff`}
    `(
        'CustomButton with "$colorTheme" colorTheme and "$type" type has "$expectedStyle" style',
        ({ colorTheme, type, expectedStyle }) => {
            const applyJSSRules = mockStyleInjection();
            const { button } = renderButton({ renderProps: { colorTheme, type } });

            applyJSSRules();

            expect(button).toHaveStyle(expectedStyle);
        }
    );
});

describe('Property type of CustomButton and onClick handler', () => {
    test.each`
        type          | toContain              | notToContain                    | calls
        ${'shown'}    | ${'outlined'}          | ${'contained|clicked|disabled'} | ${1}
        ${'clicked'}  | ${'contained|clicked'} | ${'outlined|disabled'}          | ${0}
        ${'toggled'}  | ${'contained'}         | ${'outlined|clicked|disabled'}  | ${1}
        ${'disabled'} | ${'disabled|outlined'} | ${'contained|clicked'}          | ${0}
    `(
        'CustomButton with "$type" type has "$toContain" classes, has not "$notToContain" classes and onClick handler has been called "$calls" times',
        ({ type, toContain, notToContain, calls }) => {
            const { button, onClickHandler } = renderButton({ renderProps: { type } });

            toContain.split('|').forEach(expected => {
                expect(button.className).toContain(expected);
            });
            notToContain.split('|').forEach(expected => {
                expect(button.className).not.toContain(expected);
            });

            userEvent.click(button);
            expect(onClickHandler).toBeCalledTimes(calls);
        }
    );
});

describe('Rerender CustomButton', () => {
    const outlined  = 'MuiButton-outlined';
    const contained = 'MuiButton-contained';
    const disabled  = 'Mui-disabled';

    test.each`
        initType      | newType       | expectedClass | calls
        ${'shown'}    | ${'clicked'}  | ${contained}  | ${0}
        ${'shown'}    | ${'toggled'}  | ${contained}  | ${1}
        ${'shown'}    | ${'disabled'} | ${disabled}   | ${0}
        ${'clicked'}  | ${'shown'}    | ${outlined}   | ${1}
        ${'clicked'}  | ${'toggled'}  | ${contained}  | ${1}
        ${'clicked'}  | ${'disabled'} | ${disabled}   | ${0}
        ${'toggled'}  | ${'shown'}    | ${outlined}   | ${1}
        ${'toggled'}  | ${'clicked'}  | ${contained}  | ${0}
        ${'toggled'}  | ${'disabled'} | ${disabled}   | ${0}
        ${'disabled'} | ${'shown'}    | ${outlined}   | ${1}
        ${'disabled'} | ${'clicked'}  | ${contained}  | ${0}
        ${'disabled'} | ${'toggled'}  | ${contained}  | ${1}
    `(
        'Type "$initType" to "$newType", expected class "$expectedClass" and onClick handler has been called "$calls" times',
        ({ initType, newType, expectedClass, calls }) => {
            const { button, onClickHandler, rerenderButton } = renderButton({
                renderProps: { type: initType }
            });

            rerenderButton({ type: newType });

            expect(button).toBeInTheDocument();
            expect(button).toHaveClass(expectedClass);
            if (newType === 'clicked') {
                expect(button.className).toContain('clicked');
            } else {
                expect(button.className).not.toContain('clicked');
            }

            userEvent.click(button);
            expect(onClickHandler).toBeCalledTimes(calls);
        }
    );
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
        expect(button.className).not.toContain('MuiButton-size');
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
