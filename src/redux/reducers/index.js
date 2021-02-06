import { combineReducers } from '@reduxjs/toolkit';

import profile from './profile';
import schemas from './schemas';
import ui      from './ui';

const reducer = combineReducers({
    // profile,
    schemas,
    ui
});

export default reducer;
