import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectActiveSchemaId, setActiveSchemaId } from 'redux/reducers/ui';
import { selectSchemas } from 'redux/reducers/schemas';

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
 */
const SchemasList = () => {
    const classes = useStyles();
    const schemas = useSelector(selectSchemas);
    const activeSchemaId = useSelector(selectActiveSchemaId);
    const dispatch = useDispatch();

    const handleChange = (_, newId) => dispatch(setActiveSchemaId(newId));

    return (
        <Tabs
            className={classes.root}
            value={activeSchemaId}
            onChange={handleChange}
            variant='scrollable'
            indicatorColor='primary'
        >
            {schemas.map(schema => (
                <Tab key={schema.id} value={schema.id} label={schema.name} />
            ))}
        </Tabs>
    );
};

export default SchemasList;
