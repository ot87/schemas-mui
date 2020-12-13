import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center'
    }
}));

/**
 * Renders passed schema with all its items.
 * @param {Object}   props
 * @param {Object}   props.schema                - Schema information.
 * @param {number}   props.schema.id             - Schema id.
 * @param {string}   props.schema.name           - Schema name.
 * @param {string}   [props.schema.description]  - Schema description.
 * @param {Object[]} props.schema.items          - Array of schema items.
 * @param {number}   props.schema.items.id       - Schema item id.
 * @param {string}   props.schema.items.name     - Schema item name.
 * @param {string}   props.schema.items.quantity - Schema item quantity.
 * @param {string}   props.schema.items.time     - Schema item time.
 */
const Schema = ({ schema }) => {
    const classes = useStyles();
    const smScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const xsScreen = useMediaQuery(theme => theme.breakpoints.down('xs'));

    return (
        <Grid
            container
            alignContent='center'
            justify='center'
            spacing={xsScreen ? 2 : 3}
        >
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    {schema.name}
                </Paper>
            </Grid>
            {typeof schema.description !== 'undefined' ?
                <Grid item xs={11} sm={10} md={9}>
                    <Paper className={classes.paper}>
                        {schema.description}
                    </Paper>
                </Grid>
            : null}
            {schema.items.map((item, key) => (
                <Grid
                    key={key}
                    container item
                    xs={11} sm={5} md={9}
                    justify='center'
                    spacing={smScreen ? 1 : 2}
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
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>
                            {item.time}
                        </Paper>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default Schema;