import React from 'react';
import { useDispatch } from 'react-redux';

import SchemaForm from 'components/Schemas/SchemaForm/SchemaForm';
import useNewPrimaryColor from 'components/utils/useNewPrimaryColor';

import { addSchema } from 'redux/reducers/schemas';
import { setMode, UiModes } from 'redux/reducers/ui';

import { ThemeProvider } from '@material-ui/core/styles';

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
        <ThemeProvider theme={useNewPrimaryColor('green')}>
            <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </ThemeProvider>
    );
};

export default AddSchemaForm;
