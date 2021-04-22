import React from 'react';
import { useDispatch } from 'react-redux';

import CustomPrimaryThemeProvider from 'components/Common/CustomPrimaryThemeProvider/CustomPrimaryThemeProvider';
import SchemaForm from 'components/Schemas/SchemaForm/SchemaForm';

import { addSchema } from 'redux/reducers/schemas';
import { setMode, UiModes } from 'redux/reducers/ui';

/**
 * Component to add new schema with [SchemaForm]{@link SchemaForm}.
 */
const AddSchemaForm = () => {
    const dispatch = useDispatch();

    const schema = {
        name: '',
        description: '',
        items: []
    };

    const onSubmit = schema => dispatch(addSchema(schema));
    const onCancel = () => dispatch(setMode(UiModes.SHOW));

    return (
        <CustomPrimaryThemeProvider themeColor='green'>
            <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </CustomPrimaryThemeProvider>
    );
};

export default AddSchemaForm;
