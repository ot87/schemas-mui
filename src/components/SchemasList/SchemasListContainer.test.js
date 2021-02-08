import React from 'react';
import { render, getTabList, getTab } from 'test-utils';
import userEvent from '@testing-library/user-event';

import SchemasListContainer from './SchemasListContainer';

const renderSchemasList = (initialState = {}) => {
    render(<SchemasListContainer />, { initialState });

    return getTabList();
};

test('An empty SchemaList is displayed', () => {
    const schemasList = renderSchemasList();

    expect(schemasList).toBeInTheDocument();
    expect(schemasList).toBeEmptyDOMElement();
});

test('SchemaList is displayed with two items and the item "Schema 1" is selected', () => {
    const schemasList = renderSchemasList({
        schemas: [
            {id: 1, name: 'Schema 1', items: []},
            {id: 2, name: 'Schema 2', items: []}
        ],
        ui: { activeSchemaId: 1 }
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
        schemas: [
            {id: 1, name: 'Schema 1', items: []},
            {id: 2, name: 'Schema 2', items: []}
        ],
        ui: { activeSchemaId: 1 }
    });
    const schema1 = getTab('Schema 1');
    const schema2 = getTab('Schema 2');

    userEvent.click(schema2);

    expect(schema1).not.toHaveClass('Mui-selected');
    expect(schema2).toHaveClass('Mui-selected');
});
