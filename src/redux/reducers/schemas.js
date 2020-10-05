import { createSelector } from "reselect";

import API from "../../api";
import { selectSchema, setMode, UiModes } from "./ui";

const ADD_SCHEMA = 'schemas/ADD_SCHEMA';
const UPDATE_SCHEMA = 'schemas/UPDATE_SCHEMA';
const DELETE_SCHEMA = 'schemas/DELETE_SCHEMA';

const schemas = (state = [], action) => {
    switch (action.type) {
        case ADD_SCHEMA:
            return [...state, action.payload.schema];
        case UPDATE_SCHEMA:
            return state.map((schema) => {
                if (schema.id === action.payload.schema.id) {
                    return action.payload.schema;
                }

                return schema;
            });
        case DELETE_SCHEMA:
            return state.filter((schema) => schema.id !== action.payload.id);
        default:
            return state;
    }
};

const addSchemaSuccess = (schema) => ({type: ADD_SCHEMA, payload: {schema}});
const updateSchemaSuccess = (schema) => ({type: UPDATE_SCHEMA, payload: {schema}});
const deleteSchemaSuccess = (id) => ({type: DELETE_SCHEMA, payload: {id}});


export const addSchema = (schema) => async (dispatch) => {
    const response = await API.addSchema({schema});

    dispatch(addSchemaSuccess(response.data));
    dispatch(setMode(UiModes.SHOW));
};
export const updateSchema = (schema) => async (dispatch) => {
    const response = await API.updateSchema({schema});

    dispatch(updateSchemaSuccess(response.data));
    dispatch(selectSchema(null));
};
export const deleteSchema = (id) => async (dispatch) => {
    await API.deleteSchema({id});

    dispatch(deleteSchemaSuccess(id));
    dispatch(selectSchema(null));
};


export const selectSchemasForSchemasList = createSelector(
    (state) => state.schemas,
    (schemas) => schemas.map(({ id, name }) => ({ id, name }))
);
export const getSchemasCount = createSelector(
    (state) => state.schemas,
    (schemas) => schemas.length
);

export default schemas;