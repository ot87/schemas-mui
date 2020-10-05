import React from 'react';
import { connect } from 'react-redux';

import css from './SchemasList.module.css';
import Plate from '../Common/Plate/Plate';
import { selectSchema } from '../../redux/reducers/ui';
import { selectSchemasForSchemasList } from '../../redux/reducers/schemas';

/**
 * Renders a horizontal list of Schemas [Plates]{@link Plate} to choose.
 * @param {Object}      props
 * @param {Object[]}    props.schemas          - An array of ids and names of the all schemas from the Redux State.
 * @param {number}      props.schemas.id       - Schema id.
 * @param {string}      props.schemas.name     - Schema name.
 * @param {number|null} props.selectedSchemaId - The id of the selected schema from the Redux State.
 * @param {function}    props.selectSchema     - A function to select schema.
 */
const SchemasList = ({ schemas, selectedSchemaId, selectSchema }) => (
    <div className={css.schemasList}>
        {schemas.map((schema) => (
            <Plate
                key={schema.id}
                text={schema.name}
                isClicked={schema.id === selectedSchemaId}
                onClick={() => selectSchema(schema.id)}
            />
        ))}
    </div>
);

export default connect(
    (state) => ({
        schemas: selectSchemasForSchemasList(state),
        selectedSchemaId: state.ui.selectedSchemaId
    }),
    { selectSchema }
)(SchemasList);