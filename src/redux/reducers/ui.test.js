import ui, {
    initialState,
    setActiveSchemaId,
    setMode,
    UiModes,
    selectActiveSchemaId,
    selectMode
} from './ui';
import { addSchema, updateSchema, deleteSchema } from 'redux/reducers/schemas';
import configureAppStore from 'redux/store/configureAppStore';
import API from 'api';

jest.mock('api');

describe('ui slice case reducers and selectors', () => {
    it('should handle initial state', () => {
        expect(ui(undefined, {})).toEqual(initialState);
    });

    it('should handle "setActiveSchemaId"', () => {
        const payload = 1;

        const nextState = ui(initialState, setActiveSchemaId(payload));

        const rootState = { ui: nextState };
        expect(selectActiveSchemaId(rootState)).toEqual(payload);
    });

    it('should handle "setMode', () => {
        const payload = UiModes.ADD;

        const nextState = ui(initialState, setMode(payload));

        const rootState = { ui: nextState };
        expect(selectMode(rootState)).toEqual(payload);
    });
});

describe('ui slice extra reducers', () => {
    it('should update "mode" to default when schema is added', async () => {
        const responsePayload = { data: { id: 1 } };
        const store = configureAppStore({ ui: { mode: UiModes.ADD } });
        API.addSchema.mockResolvedValueOnce(responsePayload);

        await store.dispatch(addSchema({}));

        expect(selectMode(store.getState())).toEqual(UiModes.SHOW);
    });

    it('should nullify "activeSchemaId" when schema is updated', async () => {
        const responsePayload = { data: { id: 1 } };
        const store = configureAppStore({ ui: { activeSchemaId: 1 } });
        API.updateSchema.mockResolvedValueOnce(responsePayload);

        await store.dispatch(updateSchema({}));

        expect(selectActiveSchemaId(store.getState())).toBeNull();
    });

    it('should nullify "activeSchemaId" when schema is deleted', async () => {
        const responsePayload = { data: 1 };
        const store = configureAppStore({ ui: { activeSchemaId: 1 } });
        API.deleteSchema.mockResolvedValueOnce(responsePayload);

        await store.dispatch(deleteSchema({}));

        expect(selectActiveSchemaId(store.getState())).toBeNull();
    });
});
