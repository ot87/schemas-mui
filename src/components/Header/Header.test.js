import React from 'react';
import {
    render, mockStyleInjection,
    getByRole, getButton
} from 'test-utils';
import userEvent from '@testing-library/user-event';

import Header from './Header';

const getBanner = (name) => getByRole('banner', name);

const renderHeader = (renderProps = {}) => {
    const handleButtonClick = jest.fn();

    render(
        <Header
            appBarPosition='sticky'
            showInHeader='panel'
            handleButtonClick={handleButtonClick}
            {...renderProps}
        />
    );

    return {
        handleButtonClick
    }
};

describe('Header properties', () => {
    test('Header is displayed with clicked button "Schemas"', () => {
        renderHeader();

        const schemasButton = getButton('Schemas');
        expect(schemasButton).toBeInTheDocument();
        expect(schemasButton.className).toContain('clicked');
    });

    test('Header is displayed with "Back" button', () => {
        renderHeader({ showInHeader: 'tabs' });

        expect(getButton('Back')).toBeInTheDocument();
    });

    test('Handler handleButtonClick is called', () => {
        const { handleButtonClick } = renderHeader({ showInHeader: 'tabs' });

        userEvent.click(getButton('Back'));
        expect(handleButtonClick).toBeCalled();
    });
});

describe('Responsiveness of Header', () => {
    test('Header is sticky', () => {
        const applyJSSRules = mockStyleInjection();
        renderHeader();
        applyJSSRules();

        expect(getBanner().className).toContain('positionSticky');
    });

    test('Header is static', () => {
        const applyJSSRules = mockStyleInjection();
        renderHeader({ appBarPosition: 'static' });
        applyJSSRules();

        expect(getBanner().className).toContain('positionStatic');
    });
});
