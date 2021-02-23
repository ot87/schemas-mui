import schemas, {
    initialState,
    loadSchemas,
    addSchema,
    updateSchema,
    deleteSchema,
    selectSchemas,
    selectSchemasIds,
    selectSchemasCount,
    selectSchemaById
} from './schemas';
import configureAppStore from 'redux/store/configureAppStore';
import API from 'api';

jest.mock('api');

describe('schemas slice', () => {
    it('should handle initial state', () => {
        expect(schemas(undefined, {})).toEqual(initialState);
    });
});

describe('schemas slice extra reducers', () => {
    it('should load schemas', async () => {
        const responsePayload = { data: [
            { id: '1' },
            { id: '2' }
        ] };
        const store = configureAppStore();
        API.loadSchemas.mockResolvedValueOnce(responsePayload);

        await store.dispatch(loadSchemas());

        expect(selectSchemas(store.getState())).toEqual(responsePayload.data);
    });

    it('should add schema', async () => {
        const responsePayload = { data: { id: '2' } };
        const store = configureAppStore({ schemas: {
            ids: [ '1' ],
            entities: {
                '1': { id: '1' }
            }
        } });
        API.addSchema.mockResolvedValueOnce(responsePayload);

        await store.dispatch(addSchema({}));

        expect(selectSchemasIds(store.getState())).toEqual([ '1', '2' ]);
    });

    it('should update schema', async () => {
        const responsePayload = { data: { id: '1', name: 'test 2' } };
        const store = configureAppStore({ schemas: {
            ids: [ '1' ],
            entities: {
                '1': { id: '1', name: 'test 1' }
            }
        } });
        API.updateSchema.mockResolvedValueOnce(responsePayload);

        await store.dispatch(updateSchema({}));

        expect(
            selectSchemaById(responsePayload.data.id)(store.getState())
        ).toEqual(responsePayload.data);
    });

    it('should delete schema', async () => {
        const responsePayload = { data: '1' };
        const store = configureAppStore({ schemas: {
            ids: [ '1' ],
            entities: {
                '1': { id: '1', name: 'test 1' }
            }
        } });
        API.deleteSchema.mockResolvedValueOnce(responsePayload);

        await store.dispatch(deleteSchema({}));

        expect(selectSchemasCount(store.getState())).toBe(0);
    });
});
