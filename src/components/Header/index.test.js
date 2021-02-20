import React from 'react';
import { render, mockStyleInjection } from 'test-utils';
import { getByRole, getTabList, getButton, queryButton } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import Header from '.';
import { UiModes } from 'redux/reducers/ui';

const getBanner = (name) => getByRole('banner', name);

const renderHeader = ({ renderProps = {}, initialState = {} } = {}) => {
    const setIsSchemasClickedHandler = jest.fn();
    const initProps = {
        isSchemasClicked: false,
        setIsSchemasClicked: setIsSchemasClickedHandler
    };
    const { rerender } = render(
        <Header {...initProps} {...renderProps}/>,
        Object.keys(initialState).length ?
            { initialState }
        : undefined
    );

    return {
        setIsSchemasClickedHandler,
        rerenderHeader: (rerenderProps) => {
            rerender(<Header {...initProps} {...rerenderProps}/>);
        }
    }
};

describe('Header without "activeSchemaId" and with "mode" = "SHOW"', () => {
    test('Header is displayed with clicked button "Schemas" and "Add" button', () => {
        renderHeader({ renderProps: { isSchemasClicked: true } });

        const schemasButton = getButton('Schemas');
        expect(schemasButton).toBeInTheDocument();
        expect(schemasButton.className).toContain('clicked');

        expect(getButton('Add')).toBeInTheDocument();
    });

    /* TODO profile
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
    */
});

describe('Header with "activeSchemaId"', () => {
    test('"Back" button and TabList are displayed ("mode" = "SHOW")', () => {
        renderHeader({ initialState: {
            ui: {
                activeSchemaId: 1,
                mode: UiModes.SHOW
            }
        } });

        expect(getButton('Back')).toBeInTheDocument();
        expect(getTabList()).toBeInTheDocument();
    });

    test('"Schema" button is displayed when "Back" button is clicked ("mode" = "SHOW")', () => {
        renderHeader({
            renderProps: { isSchemasClicked: true },
            initialState: {
                ui: {
                    activeSchemaId: 1,
                    mode: UiModes.SHOW
                }
            }
        });

        userEvent.click(getButton('Back'));

        expect(queryButton('Back')).not.toBeInTheDocument();
        expect(getButton('Schemas')).toBeInTheDocument();
    });
});

describe('Responsiveness of Header', () => {
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

    test('Header is static ("mode" = "EDIT" and "activeSchemaId" is present)', () => {
        const applyJSSRules = mockStyleInjection();
        renderHeader({ initialState: {
            ui: {
                activeSchemaId: 1,
                mode: UiModes.EDIT
            }
        } });
        applyJSSRules();

        expect(getBanner().className).toContain('positionStatic');
    });
});
