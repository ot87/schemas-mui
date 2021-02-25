import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from '@reduxjs/toolkit';

import { Form }      from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import FormField         from './FormField/FormField';
import FormItemsControls from './FormItemsControls/FormItemsControls';
import FormItems         from './FormItems/FormItems';
import FormButtons       from './FormButtons/FormButtons';
import useRemoveItems    from './utils/useRemoveItems';

import { makeStyles } from '@material-ui/core/styles';
import Box            from '@material-ui/core/Box';
import Grid           from '@material-ui/core/Grid';
import useMediaQuery  from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    root: {
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    bar: {
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
            marginBottom: theme.spacing(2)
        }
    },
    form: {
        width: '100%'
    }
}));

/**
 * Callback for events handling.
 * @callback EventHandler
 */

/**
 * Form container to add or edit schemas.
 * [React Final Form]{@link https://final-form.org/react} library is used.
 * @param {Object}       props
 * @param {Object}       props.schema                - Initial data for the form.
 * @param {string}       [props.schema.id]           - Schema id.
 * @param {string}       props.schema.name           - Schema name.
 * @param {string}       props.schema.description    - Schema description.
 * @param {Object[]}     props.schema.items          - Array of schema items.
 * @param {string}       props.schema.items.id       - Schema item id.
 * @param {string}       props.schema.items.name     - Schema item name.
 * @param {string}       props.schema.items.quantity - Schema item quantity.
 * @param {string}       props.schema.items.time     - Schema item time.
 * @param {EventHandler} props.onSubmit              - On click function for Submit Button.
 * @param {EventHandler} props.onCancel              - On click function for Cancel Button.
 */
const SchemaForm = ({ schema, onSubmit, onCancel }) => {
    const classes = useStyles();
    const xsScreen = useMediaQuery(theme => theme.breakpoints.down('xs'));

    const [
        { isRemoveClicked, isRemoveAllClicked, itemsIdsToRemove },
        { removeOnClick, removeAllOnClick, onItemsRowClick }
    ] = useRemoveItems();

    const addOnClick = push => {
        push(
            'items',
            { id: nanoid(), name: '', quantity: '', time: '' }
        );
    };

    const required = value => !value;

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={schema}
            mutators={{...arrayMutators}}
            render={({
                handleSubmit,
                form: { mutators: { push, removeBatch }, submit, reset },
                submitting,
                dirty,
                initialValues,
                values
            }) => (
                <Box
                    className={classes.root}
                    display='flex'
                >
                    <Box position='sticky' top={0} zIndex='appBar'>
                        <Box position='sticky' top={0}>
                            <Box
                                className={classes.bar}
                                display='flex'
                                flexWrap='wrap'
                            >
                                <FormButtons
                                    submit={({
                                        isDisabled: isRemoveClicked || submitting,
                                        onClick: submit
                                    })}
                                    reset={({
                                        isDisabled: isRemoveClicked || submitting || !dirty,
                                        onClick: reset
                                    })}
                                    cancel={({
                                        isDisabled: isRemoveClicked || submitting,
                                        onClick: onCancel
                                    })}
                                />
                                <FormItemsControls
                                    isRemoveClicked={isRemoveClicked}
                                    showRemove={!!values.items.length}
                                    isRemoveAllClicked={isRemoveAllClicked}
                                    addOnClick={() => addOnClick(push)}
                                    removeOnClick={() => removeOnClick(removeBatch)}
                                    removeAllOnClick={() => removeAllOnClick(values.items)}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <form className={classes.form} onSubmit={handleSubmit} role='table'>
                        <Grid
                            alignContent='center'
                            container
                            justify='center'
                            spacing={xsScreen ? 2 : 3}
                        >
                            <Grid item xs={7}>
                                <FormField
                                    disabled={isRemoveClicked}
                                    label='Schema Name'
                                    name='name'
                                    validate={required}
                                />
                            </Grid>
                            <Grid item xs={11} sm={10} md={9}>
                                <FormField
                                    disabled={isRemoveClicked}
                                    label='Schema Description'
                                    multiline
                                    name='description'
                                    rows={2}
                                />
                            </Grid>
                            <FormItems
                                initItems={initialValues.items}
                                isRemoveClicked={isRemoveClicked}
                                itemsIdsToRemove={itemsIdsToRemove}
                                onItemsRowClick={onItemsRowClick(values.items)}
                                onValidate={required}
                            />
                        </Grid>
                    </form>
                </Box>
            )}
        />
    );
};

SchemaForm.propTypes = {
    schema: PropTypes.shape({
        id:          PropTypes.string,
        name:        PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            id:       PropTypes.string.isRequired,
            name:     PropTypes.string.isRequired,
            quantity: PropTypes.string.isRequired,
            time:     PropTypes.string.isRequired
        })).isRequired
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default SchemaForm;
