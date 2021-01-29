import React from 'react';
import {
    render, within, mockUseMediaQuery,
    getGrid, getGridCell, getGridCellWithin, queryGridCellWithin,
    getByTextWithin
} from 'test-utils';

import Schema from './Schema';

const queryByTextWithin = (element, text) => within(element).queryByText(text);

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
        schema: getGrid()
    };
};

describe('Schema', () => {
    test('Schema is displayed without description and items', () => {
        const { schema } = renderSchemasBoard({ items: [] });

        expect(schema).toBeInTheDocument();

        expect(getByTextWithin(schema, 'Schema 1')).toBeInTheDocument();

        expect(queryByTextWithin(schema, 'Description 1')).not.toBeInTheDocument();

        expect(queryGridCellWithin(schema, 'Name Quantity Time')).not.toBeInTheDocument();
    });

    test('Schema is displayed with description and items', () => {
        const { schema } = renderSchemasBoard({ description: 'Description 1' });

        expect(schema).toBeInTheDocument();

        expect(getByTextWithin(schema, 'Schema 1')).toBeInTheDocument();

        expect(getByTextWithin(schema, 'Description 1')).toBeInTheDocument();

        expect(getGridCellWithin(schema, 'Name Quantity Time')).toBeInTheDocument();
    });

    test('Schema is displayed without item time', () => {
        const { schema } = renderSchemasBoard({
            items: [{ id: 1, name: 'Name', quantity: 'Quantity' }]
        });

        expect(schema).toBeInTheDocument();

        expect(getByTextWithin(schema, 'Schema 1')).toBeInTheDocument();

        expect(getGridCellWithin(schema, 'Name Quantity')).toBeInTheDocument();
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
