import React from 'react';
import { useDispatch } from 'react-redux';

import SchemaForm from 'components/Schemas/SchemaForm/SchemaForm';

import { addSchema }        from 'redux/reducers/schemas';
import { setMode, UiModes } from 'redux/reducers/ui';

/**
 * Component to add new schema with [SchemaFormContainer]{@link SchemaFormContainer}.
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
        <SchemaForm
            schema={schema}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    );
};

export default AddSchemaForm;
