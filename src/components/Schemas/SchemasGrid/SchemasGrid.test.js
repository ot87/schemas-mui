import React from 'react';
import { render } from 'test-utils';
import { getGrid } from 'test-helpers';

import SchemasGrid from './SchemasGrid';

const renderSchemasGrid = () => {
    const renderFunc = jest.fn();
    const initialState = {
        schemas: { ids: [ '1', '2' ] }
    };

    render(<SchemasGrid render={renderFunc} />, { initialState });

    return {
        renderFunc
    };
};

describe('SchemasGrid', () => {
    test('SchemasGrid is displayed', () => {
        renderSchemasGrid();

        expect(getGrid()).toBeInTheDocument();
    });

    test('"render" is called twice with the id', () => {
        const { renderFunc } = renderSchemasGrid();

        expect(renderFunc).toBeCalledTimes(2);
        expect(renderFunc).toBeCalledWith('1');
        expect(renderFunc).toBeCalledWith('2');
    });
});
