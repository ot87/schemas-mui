import React from 'react';
import {
    render, mockStyleInjection,
    getByRole, getTabList, getButton, queryButton
} from 'test-utils';
import userEvent from '@testing-library/user-event';

import HeaderContainer from './HeaderContainer';
import { UiModes }     from 'redux/reducers/ui';

const getBanner = (name) => getByRole('banner', name);

const renderHeader = ({ renderProps = {}, initialState = {} } = {}) => {
    const setIsSchemasClickedHandler = jest.fn();
    const initProps = {
        isSchemasClicked: false,
        setIsSchemasClicked: setIsSchemasClickedHandler
    };
    const { rerender } = render(
        <HeaderContainer {...initProps} {...renderProps}/>,
        Object.keys(initialState).length ?
            { initialState }
        : undefined
    );

    return {
        setIsSchemasClickedHandler,
        rerenderHeader: (rerenderProps) => {
            rerender(<HeaderContainer {...initProps} {...rerenderProps}/>);
        }
    }
};

describe('HeaderContainer without "selectedSchemaId" and with "mode" = "SHOW"', () => {
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

    test('Header is displayed with clicked button "Schemas" and "Add" button', () => {
        renderHeader({ renderProps: { isSchemasClicked: true } });

        const schemasButton = getButton('Schemas');
        expect(schemasButton).toBeInTheDocument();
        expect(schemasButton.className).toContain('clicked');

        expect(getButton('Add')).toBeInTheDocument();
    });

    test('"Schemas" button is clickable with "true" argument and rerenders', () => {
        const { setIsSchemasClickedHandler, rerenderHeader } = renderHeader();

        userEvent.click(getButton('Schemas'));
        expect(setIsSchemasClickedHandler).toBeCalled();
        expect(setIsSchemasClickedHandler).toBeCalledWith(true);

        rerenderHeader({ isSchemasClicked: true });

        const schemasButton = getButton('Schemas');
        expect(schemasButton).toBeInTheDocument();
        expect(schemasButton.className).toContain('clicked');
    });
});

describe('HeaderContainer with "selectedSchemaId"', () => {
    test('"Back" button and TabList are displayed ("mode" = "SHOW")', () => {
        renderHeader({ initialState: {
            ui: {
                selectedSchemaId: 1,
                mode: UiModes.SHOW
            }
        } });

        expect(getButton('Back')).toBeInTheDocument();
        expect(getTabList()).toBeInTheDocument();
    });

    test('"Schema" button is displayed when "Back" button is clicked ("mode" = "SHOW")', () => {
        renderHeader({ initialState: {
            ui: {
                selectedSchemaId: 1,
                mode: UiModes.SHOW
            }
         } });

        userEvent.click(getButton('Back'));

        expect(queryButton('Back')).not.toBeInTheDocument();
        expect(getButton('Schemas')).toBeInTheDocument();
    });
});

describe('Responsiveness of HeaderContainer', () => {
    test('Header is sticky ("mode" = "SHOW")', () => {
        const applyJSSRules = mockStyleInjection();
        renderHeader({ initialState: { ui: { mode: UiModes.SHOW } } });
        applyJSSRules();

        expect(getBanner().className).toContain('positionSticky');
    });

    test('Header is static ("mode" = "ADD")', () => {
        const applyJSSRules = mockStyleInjection();
        renderHeader({ initialState: { ui: { mode: UiModes.ADD } } });
        applyJSSRules();

        expect(getBanner().className).toContain('positionStatic');
    });

    test('Header is static ("mode" = "EDIT" and "selectedSchemaId" is present)', () => {
        const applyJSSRules = mockStyleInjection();
        renderHeader({ initialState: {
            ui: {
                selectedSchemaId: 1,
                mode: UiModes.EDIT
            }
        } });
        applyJSSRules();

        expect(getBanner().className).toContain('positionStatic');
    });
});
