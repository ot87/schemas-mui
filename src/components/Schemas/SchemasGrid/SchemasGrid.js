import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectSchemasIds } from 'redux/reducers/schemas';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
        rowGap: '3vh',
        [theme.breakpoints.down('sm')]: {
            rowGap: '2vh'
        },
        [theme.breakpoints.down('xs')]: {
            rowGap: '1vh'
        }
    }
}));

/**
 * A component to render.
 * @callback renderProp
 * @param {string} id - Schema id
 */

/**
 * Component that selects schemas ids from the store and passes them into the render prop in the loop.
 * @param {Object}     props
 * @param {renderProp} props.render - A component to render with a schema id passed as a prop.
 */
const SchemasGrid = ({ render }) => {
    const classes    = useStyles();
    const schemasIds = useSelector(selectSchemasIds);

    return (
        <Box
            className={classes.root}
            display='flex'
            flexWrap='wrap'
            justifyContent='space-evenly'
            role='grid'
        >
            {schemasIds.map(schemaId => render(schemaId))}
        </Box>
    );
};

SchemasGrid.propTypes = {
    render: PropTypes.func.isRequired
};

export default SchemasGrid;
