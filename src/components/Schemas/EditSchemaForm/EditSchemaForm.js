import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import SchemaForm from 'components/Schemas/SchemaForm/SchemaForm';

import { selectSchemaById, updateSchema } from 'redux/reducers/schemas';
import { setActiveSchemaId }              from 'redux/reducers/ui';

/**
 * Component to edit schema with [SchemaFormContainer]{@link SchemaFormContainer}.
 * @param {Object} props
 * @param {string} props.id - Schema id.
 */
const EditSchemaForm = ({ id }) => {
    const schema   = useSelector(selectSchemaById(id));
    const dispatch = useDispatch();

    const onSubmit = schema => dispatch(updateSchema(schema));
    const onCancel = () => dispatch(setActiveSchemaId(null));

    return (
        <SchemaForm
            schema={schema}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    );
};

EditSchemaForm.propTypes = {
    id: PropTypes.string.isRequired
};

export default EditSchemaForm;
