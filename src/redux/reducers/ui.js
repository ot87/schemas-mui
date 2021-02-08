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
    activeSchemaId: null,
    mode: UiModes.SHOW
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setActiveSchemaId(state, action) {
            state.activeSchemaId = action.payload;
        },
        setMode(state, action) {
            state.mode = action.payload;
        }
    }
});

export const { setActiveSchemaId, setMode } = uiSlice.actions;

export default uiSlice.reducer;
