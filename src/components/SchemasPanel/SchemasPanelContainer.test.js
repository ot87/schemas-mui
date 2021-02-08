import React from 'react';
import { render, getButton, queryButton } from 'test-utils';
import userEvent from '@testing-library/user-event';

import SchemasPanelContainer from './SchemasPanelContainer';
import { UiModes }           from 'redux/reducers/ui';

const renderSchemasPanel = ({ isStateInitial = true, initData = {} } = {}) => {
    let buttons = {};

    if (isStateInitial) {
        render(<SchemasPanelContainer />);
    } else {
        let initialState = { schemas: [{id: 1, name: 'schema 1', items: []}] };
        if (Object.keys(initData).length) {
            initialState = {
                ...initialState,
                ...initData
            };
        }
        render(<SchemasPanelContainer />, { initialState });

        buttons['editButton']   = getButton('Edit');
        buttons['deleteButton'] = getButton('Delete');
    }

    buttons['addButton'] = getButton('Add');

    return buttons;
};

/*
  Mode is SHOW (by default),
  schemasCount is 0 as schemas is empty,
  activeSchemaId is null (by default)
*/
test('"Add" CustomButton is displayed, clickable and not disabled', () => {
    const { addButton } = renderSchemasPanel();

    // Add CustomButton is displayed, is not clicked and is not disabled
    expect(addButton).toBeInTheDocument();
    expect(addButton.className).toContain('MuiButton-outlined');

    // Edit and Delete CustomButtons are not displayed
    expect(queryButton('Edit')).not.toBeInTheDocument();
    expect(queryButton('Delete')).not.toBeInTheDocument();

    // Add CustomButton is clicked and not disabled
    userEvent.click(addButton);
    expect(addButton.className).toContain('MuiButton-contained');
    expect(addButton.className).toContain('clicked');
});

/*
  Mode is SHOW (by default),
  schemasCount is 1 as schemas contains one item,
  activeSchemaId is null (by default)
*/
test('"Add", "Edit" and "Delete" CustomButtons are displayed', () => {
    const { addButton, editButton, deleteButton } = renderSchemasPanel({ isStateInitial: false });

    expect(addButton).toBeInTheDocument();
    expect(addButton.className).toContain('MuiButton-outlined');

    expect(editButton).toBeInTheDocument();
    expect(editButton.className).toContain('MuiButton-outlined');

    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.className).toContain('MuiButton-outlined');
});

describe('"Edit" and "Delete" CustomButtons are togglable and not disabled', () => {
    /*
      Mode is SHOW (by default),
      schemasCount is 1 as schemas contains one item,
      activeSchemaId is null (by default)
    */
    test.each`
        name1       | name2
        ${'Edit'}   | ${'Delete'}
        ${'Delete'} | ${'Edit'}
    `('Only "$name1" CustomButton is toggled after clicking', ({ name1, name2 }) => {
        const {
            addButton,
            [`${name1.toLowerCase()}Button`]: button1,
            [`${name2.toLowerCase()}Button`]: button2
        } = renderSchemasPanel({ isStateInitial: false });

        userEvent.click(button1);
        expect(button1.className).toContain('MuiButton-contained');
        expect(button1.className).not.toContain('clicked');
        expect(addButton.className).toContain('MuiButton-outlined');
        expect(button2.className).toContain('MuiButton-outlined');
    });

    /*
      Mode is EDIT or DELETE,
      schemasCount is 1 as schemas contains one item,
      activeSchemaId is null (by default)
    */
    test.each`
        name1       | name2       | mode
        ${'Edit'}   | ${'Delete'} | ${'EDIT'}
        ${'Delete'} | ${'Edit'}   | ${'DELETE'}
    `('Only "$name1" CustomButton is toggled if mode is "$mode"', ({ name1, name2, mode }) => {
        const {
            addButton,
            [`${name1.toLowerCase()}Button`]: button1,
            [`${name2.toLowerCase()}Button`]: button2
        } = renderSchemasPanel({
            isStateInitial: false,
            initData: { ui: { mode: UiModes[mode] } }
        });

        expect(button1.className).toContain('MuiButton-contained');
        expect(button1.className).not.toContain('clicked');
        expect(addButton.className).toContain('MuiButton-outlined');
        expect(button2.className).toContain('MuiButton-outlined');
    });

    /*
      Mode is EDIT or DELETE,
      schemasCount is 0 as schemas is empty,
      activeSchemaId is null (by default)
    */
    test.each`
        name
        ${'Edit'}
        ${'Delete'}
    `('"$name" CustomButton is toggled back', ({ name }) => {
        const { [`${name.toLowerCase()}Button`]: button } = renderSchemasPanel({
            isStateInitial: false,
            initData: { ui: { mode: UiModes[name.toUpperCase()] } }
        });

        userEvent.click(button);
        expect(button).toBeInTheDocument();
        expect(button.className).toContain('MuiButton-outlined');
    });

    /*
      Mode is SHOW (by default),
      schemasCount is 1 as schemas contains one item,
      activeSchemaId is null (by default)
    */
    test.each`
        name1       | name 2
        ${'Edit'}   | ${'Delete'}
        ${'Delete'} | ${'Edit'}
    `('"$name1" and "$name2" CustomButtons are toggled one by one and back', ({ name1, name2 }) => {
        const {
            addButton,
            [`${name1.toLowerCase()}Button`]: button1,
            [`${name2.toLowerCase()}Button`]: button2
        } = renderSchemasPanel({ isStateInitial: false });

        userEvent.click(button1);
        expect(button1.className).toContain('MuiButton-contained');

        userEvent.click(button2);
        expect(button2.className).toContain('MuiButton-contained');

        userEvent.click(button1);
        expect(button1.className).toContain('MuiButton-contained');
        expect(button1.className).not.toContain('clicked');
        expect(addButton.className).toContain('MuiButton-outlined');
        expect(button2.className).toContain('MuiButton-outlined');
    });
});

/*
  Mode is SHOW (by default),
  schemasCount is 1 as schemas contains one item,
  activeSchemaId is null (by default)
*/
describe('"Add" CustomButton is clickable once only, "Edit" and "Delete" CustomButtons are disabled and not clickable', () => {
    test('"Add" CustomButton is clicked', () => {
        const { addButton } = renderSchemasPanel({ isStateInitial: false });

        userEvent.click(addButton);

        expect(addButton).toBeInTheDocument();
        expect(addButton.className).toContain('MuiButton-contained');
        expect(addButton.className).toContain('clicked');
    });

    test.each`
        name
        ${'Edit'}
        ${'Delete'}
    `('"$name" CustomButton is disabled', ({ name }) => {
        const {
            addButton,
            [`${name.toLowerCase()}Button`]: buttonToDisable
        } = renderSchemasPanel({ isStateInitial: false });

        userEvent.click(addButton);

        const disabledButton = getButton(name);

        expect(disabledButton).toBeInTheDocument();
        expect(disabledButton).toBeDisabled();

        userEvent.click(disabledButton);
        expect(disabledButton).toBeDisabled();
        expect(disabledButton.className).not.toContain('MuiButton-contained');
        expect(disabledButton.className).not.toContain('clicked');
        expect(disabledButton).not.toEqual(buttonToDisable);
    });
});

/*
  Mode is EDIT or DELETE,
  schemasCount is 1 as schemas contains one item,
  activeSchemaId is 1
*/
describe.each`
    clicked     | disabled1 | disabled2
    ${'Edit'}   | ${'Add'}  | ${'Delete'}
    ${'Delete'} | ${'Add'}  | ${'Edit'}
`(
    '"$clicked" CustomButton is clickable once only, "$disabled1" and "$disabled2" CustomButtons are disabled and not clickable',
    ({ clicked, disabled1, disabled2 }) => {
        test(`"${clicked}" CustomButton is clicked`, () => {
            const { [`${clicked.toLowerCase()}Button`]: button } = renderSchemasPanel({
                isStateInitial: false,
                initData: {
                    ui: {
                        activeSchemaId: 1,
                        mode: UiModes[clicked.toUpperCase()]
                    }
                }
            });

            expect(button).toBeInTheDocument();
            expect(button.className).toContain('MuiButton-contained');
            expect(button.className).toContain('clicked');
        });

        test.each`
            name
            ${disabled1}
            ${disabled2}
        `('"$name" CustomButton is disabled', ({ name }) => {
            const { [`${name.toLowerCase()}Button`]: button } = renderSchemasPanel({
                isStateInitial: false,
                initData: {
                    ui: {
                        activeSchemaId: 1,
                        mode: UiModes[clicked.toUpperCase()]
                    }
                }
            });

            expect(button).toBeInTheDocument();
            expect(button).toBeDisabled();

            userEvent.click(button);
            expect(button).toBeDisabled();
            expect(button.className).not.toContain('MuiButton-contained');
            expect(button.className).not.toContain('clicked');
        });
    }
);
