import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import API from 'api';

const schemasAdapter = createEntityAdapter();

export const loadSchemas = createAsyncThunk(
    'schemas/loadSchemas',
    async () => {
        const response = await API.loadSchemas();
        return response.data;
    }
);

export const addSchema = createAsyncThunk(
    'schemas/addSchema',
    async (schema) => {
        const response = await API.addSchema(schema);
        return response.data;
    }
);

export const updateSchema = createAsyncThunk(
    'schemas/updateSchema',
    async (schema) => {
        const response = await API.updateSchema(schema);
        return response.data;
    }
);

export const deleteSchema = createAsyncThunk(
    'schemas/deleteSchema',
    async (id) => {
        const response = await API.deleteSchema(id);
        return response.data;
    }
);

export const initialState = schemasAdapter.getInitialState();

const schemasSlice = createSlice({
    name: 'schemas',
    initialState,
    reducers: {},
    extraReducers: {
        [loadSchemas.fulfilled]:  schemasAdapter.setAll,
        [addSchema.fulfilled]:    schemasAdapter.addOne,
        [updateSchema.fulfilled]: schemasAdapter.upsertOne,
        [deleteSchema.fulfilled]: schemasAdapter.removeOne
    }
});

export default schemasSlice.reducer;

export const {
    selectAll:   selectSchemas,
    selectTotal: selectSchemasCount
} = schemasAdapter.getSelectors(state => state.schemas);

export const selectSchemasForSchemasList = createSelector(
    selectSchemas,
    schemas => schemas.map(({ id, name }) => ({ id, name }))
);
