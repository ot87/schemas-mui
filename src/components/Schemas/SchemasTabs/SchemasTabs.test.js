import React from 'react';
import { render } from 'test-utils';
import { getTabList, getTab } from 'test-helpers';
import userEvent from '@testing-library/user-event';

import SchemasTabs from './SchemasTabs';

const renderSchemasTabs = ({ isStateInitial = true, initData = {} } = {}) => {
    if (isStateInitial) {
        render(<SchemasTabs />);
    } else {
        const initialState = {
            ...{
                schemas: {
                    ids: [ '1', '2' ],
                    entities: {
                        '1': {id: '1', name: 'Schema 1', description: '', items: []},
                        '2': {id: '2', name: 'Schema 2', description: '', items: []}
                    }
                }
            },
            ...initData
        };

        render(<SchemasTabs />, { initialState });
    }

    return getTabList();
};

test('An empty SchemaList is displayed', () => {
    const schemasList = renderSchemasTabs();

    expect(schemasList).toBeInTheDocument();
    expect(schemasList).toBeEmptyDOMElement();
});

test('SchemaList is displayed with two items and the item "Schema 1" is selected', () => {
    const schemasList = renderSchemasTabs({
        isStateInitial: false,
        initData: { ui: { activeSchemaId: '1' } }
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
    renderSchemasTabs({
        isStateInitial: false,
        initData: { ui: { activeSchemaId: '1' } }
    });
    const schema1 = getTab('Schema 1');
    const schema2 = getTab('Schema 2');

    userEvent.click(schema2);

    expect(schema1).not.toHaveClass('Mui-selected');
    expect(schema2).toHaveClass('Mui-selected');
});
