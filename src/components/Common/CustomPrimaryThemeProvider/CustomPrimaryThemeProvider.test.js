import React from 'react';
import { render, mockStyleInjection } from 'test-utils';
import { getButton} from 'test-helpers';

import Button from '@material-ui/core/Button';

import CustomPrimaryThemeProvider from './CustomPrimaryThemeProvider';
import customPrimaryColors from 'components/utils/customPrimaryColors';

const greenColor  = customPrimaryColors.light.green.main;
const yellowColor = customPrimaryColors.light.yellow.main;
const redColor    = customPrimaryColors.light.red.main;

const renderCustomPrimaryThemeProvider = ({ renderProps = {} } = {}) => {
    const buttonText = 'CustomPrimaryThemeProvider';

    render(
        <CustomPrimaryThemeProvider {...renderProps}>
            <Button color='primary'>{buttonText}</Button>
        </CustomPrimaryThemeProvider>
    );

    return {
        button: getButton()
    };
};

describe('CustomPrimaryThemeProvider', () => {
    test('"Children" are displayed without "colorTheme" specified', () => {
        const { button } = renderCustomPrimaryThemeProvider();

        expect(button).toBeInTheDocument();
        expect(button).toHaveStyle('color: rgb(63, 81, 181)');
    });

    test.each`
        colorTheme  | expectedStyle
        ${'green'}  | ${`color: ${greenColor}`}
        ${'yellow'} | ${`color: ${yellowColor}`}
        ${'red'}    | ${`color: ${redColor}`}
    `(
        '"Children" with "$colorTheme" colorTheme have "$expectedStyle" style',
        ({ colorTheme, expectedStyle }) => {
            const applyJSSRules = mockStyleInjection();
            const { button } = renderCustomPrimaryThemeProvider({ renderProps: { colorTheme } });

            applyJSSRules();

            expect(button).toHaveStyle(expectedStyle);
        }
    );
});
