import React from 'react';
import {
    render, screen, mockUseMediaQuery,
    getGrid, getGridCell, queryGridCell
} from 'test-utils';

import Schema from './Schema';

const renderSchemasBoard = (schemaData = {}) => {
    const schema = {
        id: 1, name: 'Schema 1',
        items: [{ id: 1, name: 'Name', quantity: 'Quantity', time: 'Time' }]
    };

    render(
        <Schema schema={{
            ...schema,
            ...schemaData
        }} />
    );

    return {
        schema: getGrid(),
        name: screen.getByText('Schema 1')
    };
};

describe('Schema', () => {
    test('Schema is displayed without description and items', () => {
        const { schema, name } = renderSchemasBoard({ items: [] });

        expect(schema).toBeInTheDocument();

        expect(name).toBeInTheDocument();
        expect(schema).toContainElement(name);

        expect(screen.queryByText('Description 1')).not.toBeInTheDocument();

        expect(queryGridCell()).not.toBeInTheDocument();
    });

    test('Schema is displayed with description and items', () => {
        const { schema, name } = renderSchemasBoard({ description: 'Description 1' });

        expect(schema).toBeInTheDocument();

        expect(name).toBeInTheDocument();
        expect(schema).toContainElement(name);

        const schemaDesc = screen.getByText('Description 1');
        expect(schemaDesc).toBeInTheDocument();
        expect(schema).toContainElement(schemaDesc);

        const itemsRow = getGridCell('Name Quantity Time');
        expect(itemsRow).toBeInTheDocument();
        expect(schema).toContainElement(itemsRow);
    });

    test('Schema is displayed without item time', () => {
        const { schema, name } = renderSchemasBoard({
            items: [{ id: 1, name: 'Name', quantity: 'Quantity' }]
        });

        expect(schema).toBeInTheDocument();
        expect(name).toBeInTheDocument();

        const itemsRow = getGridCell('Name Quantity');
        expect(itemsRow).toBeInTheDocument();
        expect(schema).toContainElement(itemsRow);
    });
});

describe('Responsiveness of Schema', () => {
    test('Margin of container of Schema is "-8px" for screen width less than 600px', () => {
        mockUseMediaQuery(500);
        const { schema } = renderSchemasBoard();

        expect(schema).toHaveStyle('margin: -8px');
    });

    test('Margin of container of Schema is "-12px" for screen width more than 600px', () => {
        mockUseMediaQuery(700);
        const { schema } = renderSchemasBoard();

        expect(schema).toHaveStyle('margin: -12px');
    });

    test('Spacing of Schema items children is "4px" for screen width less than 960px', () => {
        mockUseMediaQuery(900);
        renderSchemasBoard();

        Array.from(getGridCell('Name Quantity Time').children).map((element) => {
            expect(element).toHaveStyle('padding: 4px');
        });
    });

    test('Spacing of Schema items children is "8px" for screen width more than 960px', () => {
        mockUseMediaQuery(1000);
        renderSchemasBoard();

        Array.from(getGridCell('Name Quantity Time').children).map((element) => {
            expect(element).toHaveStyle('padding: 8px');
        });
    });
});
