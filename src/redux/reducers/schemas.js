import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

const schemasAdapter = createEntityAdapter();

export const loadSchemas = createAsyncThunk(
    'schemas/loadSchemas',
    async (_, { extra }) => {
        const response = await extra.loadSchemas();
        return response.data;
    }
);

export const addSchema = createAsyncThunk(
    'schemas/addSchema',
    async (schema, { extra }) => {
        const response = await extra.addSchema(schema);
        return response.data;
    }
);

export const updateSchema = createAsyncThunk(
    'schemas/updateSchema',
    async (schema, { extra }) => {
        const response = await extra.updateSchema(schema);
        return response.data;
    }
);

export const deleteSchema = createAsyncThunk(
    'schemas/deleteSchema',
    async (id, { extra }) => {
        const response = await extra.deleteSchema(id);
        return response.data;
    }
);

export const initialState = schemasAdapter.getInitialState();

const schemasSlice = createSlice({
    name: 'schemas',
    initialState,
    reducers: {},
    extraReducers: {
        //@ts-ignore
        [loadSchemas.fulfilled]:  schemasAdapter.setAll,
        //@ts-ignore
        [addSchema.fulfilled]:    schemasAdapter.addOne,
        //@ts-ignore
        [updateSchema.fulfilled]: schemasAdapter.upsertOne,
        //@ts-ignore
        [deleteSchema.fulfilled]: schemasAdapter.removeOne
    }
});

export default schemasSlice.reducer;

const {
    selectAll: selectSchemas,
    selectById,
    selectTotal: selectSchemasCount
} = schemasAdapter.getSelectors(state => state.schemas);

export { selectSchemas, selectSchemasCount };

export const selectSchemaById = id => state => selectById(state, id);
