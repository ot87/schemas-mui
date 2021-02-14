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
            isShowSchema={false}
            isSchemasClicked={false}
            handleButtonClick={handleButtonClick}
            {...renderProps}
        />
    );

    return {
        handleButtonClick
    }
};

describe('Header with "false" properties', () => {
    test('Header is displayed with not clicked button "Schemas"', () => {
        renderHeader();

        const schemasButton = getButton('Schemas');
        expect(schemasButton).toBeInTheDocument();
        expect(schemasButton.className).not.toContain('clicked');
    });

    test('Header is displayed with the second empty element', () => {
        renderHeader();

        const nextToButton = getButton('Schemas').nextElementSibling;
        expect(nextToButton).toBeInTheDocument();
        expect(nextToButton).toBeEmptyDOMElement();
    });

    test('Handler handleButtonClick is called', () => {
        const { handleButtonClick } = renderHeader();

        userEvent.click(getButton('Schemas'));
        expect(handleButtonClick).toBeCalled();
    });
});

describe('Header with "true" properties', () => {
    test('Header is displayed with "Back" button', () => {
        renderHeader({ isShowSchema: true });

        expect(getButton('Back')).toBeInTheDocument();
    });

    test('Header is displayed with clicked button "Schemas"', () => {
        renderHeader({ isSchemasClicked: true });

        const schemasButton = getButton('Schemas');
        expect(schemasButton).toBeInTheDocument();
        expect(schemasButton.className).toContain('clicked');
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
