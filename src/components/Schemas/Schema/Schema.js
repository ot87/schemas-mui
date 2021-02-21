import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { selectSchemaById } from 'redux/reducers/schemas';

import { makeStyles } from '@material-ui/core/styles';
import Grid           from '@material-ui/core/Grid';
import Paper          from '@material-ui/core/Paper';
import useMediaQuery  from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center'
    }
}));

/**
 * Shows schema with all its items.
 * @param {Object} props
 * @param {string} props.id - Schema id.
 */
const Schema = ({ id }) => {
    const classes = useStyles();
    const schema  = useSelector(selectSchemaById(id));

    const smScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const xsScreen = useMediaQuery(theme => theme.breakpoints.down('xs'));

    return (
        <Grid
            role='grid'
            alignContent='center'
            container
            justify='center'
            spacing={xsScreen ? 2 : 3}
        >
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    {schema.name}
                </Paper>
            </Grid>
            {schema.description !== '' ?
                <Grid item xs={11} sm={10} md={9}>
                    <Paper className={classes.paper}>
                        {schema.description}
                    </Paper>
                </Grid>
            : null}
            {schema.items.map((item, key) => (
                <Grid
                    role='gridcell'
                    container item
                    justify='center'
                    alignContent='flex-start'
                    key={key}
                    spacing={smScreen ? 1 : 2}
                    xs={11} sm={6} md={11}
                >
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            {item.name}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            {item.quantity}
                        </Paper>
                    </Grid>
                    {item.time !== '' ?
                        <Grid item xs={12} md={4}>
                            <Paper className={classes.paper}>
                                {item.time}
                            </Paper>
                        </Grid>
                    : null}
                </Grid>
            ))}
        </Grid>
    );
};

Schema.propTypes = {
    id: PropTypes.string.isRequired
};

export default Schema;
