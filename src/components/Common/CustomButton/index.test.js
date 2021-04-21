import React from 'react';
import { render, mockStyleInjection } from 'test-utils';
import { getButton } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import CustomButton from '.';
import customPrimaryColors from 'components/utils/customPrimaryColors';

const greenColor  = customPrimaryColors.light.green.main;
const yellowColor = customPrimaryColors.light.yellow.main;
const redColor    = customPrimaryColors.light.red.main;

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

describe('CustomButton', () => {
    test('CustomButton is displayed with default props and "onClick" handler is called', () => {
        const applyJSSRules = mockStyleInjection();
        const { button, onClickHandler } = renderButton();

        applyJSSRules();

        // CustomButton is displayed (without specified type)
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('MuiButton-outlined');

        // CustomButton without specified "colorTheme" does not have "primary" color
        expect(button.className).not.toContain('Primary');

        // onClickHandler has been called
        userEvent.click(button);
        expect(onClickHandler).toBeCalledTimes(1);
    });
});

describe('Property "colorTheme"', () => {
    test('CustomButton with "default" colorTheme does not have "primary" color', () => {
        const applyJSSRules = mockStyleInjection();
        const { button } = renderButton({ renderProps: { colorTheme: 'default' } });

        applyJSSRules();

        expect(button.className).not.toContain('Primary');
    });
});

describe('Properties "colorTheme" and "type"', () => {
    test.each`
        colorTheme  | type          | expectedStyle
        ${'green'}  | ${'clicked'}  | ${`background-color: ${greenColor}`}
        ${'yellow'} | ${'clicked'}  | ${`background-color: ${yellowColor}`}
        ${'red'}    | ${'clicked'}  | ${`background-color: ${redColor}`}
        ${'green'}  | ${'toggled'}  | ${`background-color: ${greenColor}`}
        ${'yellow'} | ${'toggled'}  | ${`background-color: ${yellowColor}`}
        ${'red'}    | ${'toggled'}  | ${`background-color: ${redColor}`}
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
