import React from 'react';
import { render, getTabList, getTab } from 'test-utils';
import userEvent from '@testing-library/user-event';

import SchemasListContainer from './SchemasListContainer';

const renderSchemasList = ({ isStateInitial = true, initData = {} } = {}) => {
    if (isStateInitial) {
        render(<SchemasListContainer />);
    } else {
        let initialState = { schemas: {
            ids: [ 1, 2 ],
            entities: {
                1: {id: 1, name: 'Schema 1', items: []},
                2: {id: 2, name: 'Schema 2', items: []}
            }
        }};
        if (Object.keys(initData).length) {
            initialState = {
                ...initialState,
                ...initData
            };
        }
        render(<SchemasListContainer />, { initialState });
    }

    return getTabList();
};

test('An empty SchemaList is displayed', () => {
    const schemasList = renderSchemasList();

    expect(schemasList).toBeInTheDocument();
    expect(schemasList).toBeEmptyDOMElement();
});

test('SchemaList is displayed with two items and the item "Schema 1" is selected', () => {
    const schemasList = renderSchemasList({
        isStateInitial: false,
        initData: { ui: { activeSchemaId: 1 } }
    });
    const schema1 = getTab('Schema 1');
    const schema2 = getTab('Schema 2');

    expect(schemasList).toBeInTheDocument();
    expect(schemasList.childElementCount).toEqual(2);

    expect(schema1).toBeInTheDocument();
    expect(schema2).toBeInTheDocument();

    expect(schema1).toHaveClass('Mui-selected');
    expect(schema2).not.toHaveClass('Mui-selected');
});

test('Item "Schema 2" is selected after clicking', () => {
    renderSchemasList({
        isStateInitial: false,
        initData: { ui: { activeSchemaId: 1 } }
    });
    const schema1 = getTab('Schema 1');
    const schema2 = getTab('Schema 2');

    userEvent.click(schema2);

    expect(schema1).not.toHaveClass('Mui-selected');
    expect(schema2).toHaveClass('Mui-selected');
});
