import React from 'react';
import { screen } from '@testing-library/react';
import { render, mockUseMediaQuery } from 'test-utils';
import { getButton } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import DarkThemeSwitcher from './DarkThemeSwitcher';
import { toggleDarkTheme } from 'redux/reducers/ui';

const getByTestId = (name) => screen.getByTestId(name);

const renderDarkThemeSwitcher = ({ mock = false, initData = {} } = {}) => {
    const initialState = { ui: { darkTheme: false, ...initData } };
    const { mockedStore } = render(<DarkThemeSwitcher/>, { initialState, mock });

    return {
        darkThemeSwitcher: getButton('mode'),
        mockedStore
    }
};

describe('DarkThemeSwitcher', () => {
    test('DarkThemeSwitcher is displayed', () => {
        const { darkThemeSwitcher } = renderDarkThemeSwitcher();

        expect(darkThemeSwitcher).toBeInTheDocument();
    });

    test('DarkThemeSwitcher is displayed with "darkTheme" set to "false" by default', () => {
        const { darkThemeSwitcher } = renderDarkThemeSwitcher();

        expect(darkThemeSwitcher).toContainElement(getByTestId('dark'));
    });

    test('DarkThemeSwitcher is displayed with "darkTheme" set to "true"', () => {
        const { darkThemeSwitcher } = renderDarkThemeSwitcher({
            initData: { darkTheme: true }
        });

        expect(darkThemeSwitcher).toContainElement(getByTestId('light'));
    });

    test('"toggleDarkTheme" is dispatched when DarkThemeSwitcher is clicked', () => {
        const { darkThemeSwitcher, mockedStore } = renderDarkThemeSwitcher({ mock: true });

        userEvent.click(darkThemeSwitcher);

        expect(mockedStore.getActions()).toEqual([toggleDarkTheme()]);
    });
});

describe('Responsiveness of DarkThemeSwitcher', () => {
    test('Size of DarkThemeSwitcher is small for screen width less than 435px', () => {
        mockUseMediaQuery(400);
        const { darkThemeSwitcher } = renderDarkThemeSwitcher();

        expect(darkThemeSwitcher).toHaveClass('MuiIconButton-sizeSmall');
    });

    test('Size of DarkThemeSwitcher is medium for screen width more than 435px', () => {
        mockUseMediaQuery(600);
        const { darkThemeSwitcher } = renderDarkThemeSwitcher();

        expect(darkThemeSwitcher.className).not.toContain('MuiIconButton-size');
    });
});
