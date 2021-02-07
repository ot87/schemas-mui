import React       from 'react';
import { connect } from 'react-redux';

import { selectSchema }                from 'redux/reducers/ui';
import { selectSchemasForSchemasList } from 'redux/reducers/schemas';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab  from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        margin: '0 auto'
    }
});

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
    const classes = useStyles();

    const handleChange = (_, newId) => {
        selectSchema(newId);
    }

    return (
        <Tabs
            className={classes.root}
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
