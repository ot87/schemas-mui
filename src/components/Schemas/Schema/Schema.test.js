import React from 'react';
import { render, within, mockUseMediaQuery } from 'test-utils';
import {
    getGrid, getGridCell, getGridCellWithin, queryGridCellWithin,
    getByTextWithin
} from 'test-helpers';

import Schema from './Schema';

const queryByTextWithin = (element, text) => within(element).queryByText(text);

const renderSchema = (schemaData = {}) => {
    const initialState = { schemas: {
        ids: [ '1' ],
        entities: {
            '1': {
                ...{
                    id: '1', name: 'Schema 1', description: '',
                    items: [{ id: '1', name: 'Name', quantity: 'Quantity', time: 'Time' }]
                },
                ...schemaData
            }
        }
    }};

    render(<Schema id='1' />, { initialState });

    return {
        schema: getGrid()
    };
};

describe('Schema', () => {
    test('Schema is displayed without description and items', () => {
        const { schema } = renderSchema({ items: [] });

        expect(schema).toBeInTheDocument();
        expect(getByTextWithin(schema, 'Schema 1')).toBeInTheDocument();
        expect(queryByTextWithin(schema, 'Description 1')).not.toBeInTheDocument();
        expect(queryGridCellWithin(schema, 'Name Quantity Time')).not.toBeInTheDocument();
    });

    test('Schema is displayed with description and items', () => {
        const { schema } = renderSchema({ description: 'Description 1' });

        expect(schema).toBeInTheDocument();
        expect(getByTextWithin(schema, 'Schema 1')).toBeInTheDocument();
        expect(getByTextWithin(schema, 'Description 1')).toBeInTheDocument();
        expect(getGridCellWithin(schema, 'Name Quantity Time')).toBeInTheDocument();
    });

    test('Schema is displayed without item time', () => {
        const { schema } = renderSchema({
            items: [{ id: '1', name: 'Name', quantity: 'Quantity', time: '' }]
        });

        expect(schema).toBeInTheDocument();
        expect(getByTextWithin(schema, 'Schema 1')).toBeInTheDocument();
        expect(getGridCellWithin(schema, 'Name Quantity')).toBeInTheDocument();
    });
});

describe('Responsiveness of Schema', () => {
    test('Margin of container of Schema is "-8px" for screen width less than 600px', () => {
        mockUseMediaQuery(500);
        const { schema } = renderSchema();

        expect(schema).toHaveStyle('margin: -8px');
    });

    test('Margin of container of Schema is "-12px" for screen width more than 600px', () => {
        mockUseMediaQuery(700);
        const { schema } = renderSchema();

        expect(schema).toHaveStyle('margin: -12px');
    });

    test('Spacing of Schema items children is "4px" for screen width less than 960px', () => {
        mockUseMediaQuery(900);
        renderSchema();

        Array.from(getGridCell('Name Quantity Time').children).map((element) => {
            expect(element).toHaveStyle('padding: 4px');
        });
    });

    test('Spacing of Schema items children is "8px" for screen width more than 960px', () => {
        mockUseMediaQuery(1000);
        renderSchema();

        Array.from(getGridCell('Name Quantity Time').children).map((element) => {
            expect(element).toHaveStyle('padding: 8px');
        });
    });
});
