import { createSlice } from '@reduxjs/toolkit';

import { addSchema, updateSchema, deleteSchema } from './schemas';

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

export const initialState = {
    activeSchemaId: null,
    mode: UiModes.SHOW,
    darkTheme: false
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
        },
        toggleDarkTheme(state) {
            state.darkTheme = !state.darkTheme;
        }
    },
    extraReducers: {
        //@ts-ignore
        [addSchema.fulfilled]: (state) => {
            state.mode = UiModes.SHOW;
        },
        //@ts-ignore
        [updateSchema.fulfilled]: (state) => {
            state.activeSchemaId = null;
        },
        //@ts-ignore
        [deleteSchema.fulfilled]: (state) => {
            state.activeSchemaId = null;
        }
    }
});

export const { setActiveSchemaId, setMode, toggleDarkTheme } = uiSlice.actions;

export default uiSlice.reducer;

export const selectActiveSchemaId = (state) => state.ui.activeSchemaId;
export const selectMode = (state) => state.ui.mode;
export const selectDarkTheme = (state) => state.ui.darkTheme;
