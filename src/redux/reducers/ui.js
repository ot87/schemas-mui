import { createSlice } from '@reduxjs/toolkit';

/**
 * Enum for the modes of the ui.
 * @enum {string}
 */
export const UiModes = {
    SHOW: 'SHOW',
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE'
};

const initialState = {
    selectedSchemaId: null,
    mode: UiModes.SHOW
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        selectSchema(state, action) {
            state.selectedSchemaId = action.payload;
        },
        setMode(state, action) {
            state.mode = action.payload;
        }
    }
});

export const { selectSchema, setMode } = uiSlice.actions;

export default uiSlice.reducer;
