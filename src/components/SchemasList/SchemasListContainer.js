import React       from 'react';
import { connect } from 'react-redux';

import { selectSchema }                from 'redux/reducers/ui';
import { selectSchemasForSchemasList } from 'redux/reducers/schemas';

import Tabs from '@material-ui/core/Tabs';
import Tab  from '@material-ui/core/Tab';

/**
 * Renders a horizontal list of Schemas to choose.
 * @param {Object}      props
 * @param {Object[]}    props.schemas          - An array of ids and names of the all schemas from the Redux State.
 * @param {number}      props.schemas.id       - Schema id.
 * @param {string}      props.schemas.name     - Schema name.
 * @param {number|null} props.selectedSchemaId - The id of the selected schema from the Redux State.
 * @param {function}    props.selectSchema     - A function to select schema.
 */
const SchemasList = ({ schemas, selectedSchemaId, selectSchema }) => {
    const handleChange = (event, newId) => {
        selectSchema(newId);
    }

    return (
        <Tabs
            value={selectedSchemaId}
            onChange={handleChange}
            variant='scrollable'
            indicatorColor='primary'
        >
            {schemas.map((schema) => (
                <Tab key={schema.id} value={schema.id} label={schema.name} />
            ))}
        </Tabs>
    );
};

export default connect(
    (state) => ({
        schemas: selectSchemasForSchemasList(state),
        selectedSchemaId: state.ui.selectedSchemaId
    }),
    { selectSchema }
)(SchemasList);
