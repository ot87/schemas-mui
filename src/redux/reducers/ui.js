const SELECT_SCHEMA  = 'ui/SELECT_SCHEMA';
const SET_MODE       = 'ui/SET_MODE';

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

const ui = (
    state = {
        selectedSchemaId: null,
        mode: UiModes.SHOW
    },
    action
) => {
    switch (action.type) {
        case SELECT_SCHEMA:
            return {...state, selectedSchemaId: action.payload.id};
        case SET_MODE:
            return {...state, mode: action.payload.mode};
        default:
            return state;
    }
};

export const selectSchema = (id) => ({type: SELECT_SCHEMA, payload: {id}});
export const setMode      = (mode) => ({type: SET_MODE, payload: {mode}});

export default ui;
