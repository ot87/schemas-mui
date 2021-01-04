import React       from 'react';
import { connect } from 'react-redux';

import CustomCard            from 'components/Common/CustomCard/CustomCard';
import CustomCardWithButtons from 'components/Common/CustomCard/CustomCardWithButtons';
import Schema                from 'components/Schema/Schema';
import SchemaFormContainer   from 'components/SchemaForm/SchemaFormContainer';

import { addSchema, updateSchema, deleteSchema } from 'redux/reducers/schemas';
import { selectSchema, setMode, UiModes }        from 'redux/reducers/ui';

import { makeStyles } from '@material-ui/core/styles';
import Box            from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
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
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/** 
 * Component to display a list of all Schemas by [Card]{@link Card} or [CardWithButtons]{@link CardWithButtons} or a single selected [Schema]{@link Schema} or [SchemaFormContainer]{@link SchemaFormContainer}. The displayed content depends on value of the selectedSchemaId and mode parameters.
 * @param {Object}               props
 * @param {Object[]}             props.schemas                - The data of the all schemas from the Redux State.
 * @param {number}               props.schemas.id             - Schema id.
 * @param {string}               props.schemas.name           - Schema name.
 * @param {string}               [props.schemas.description]  - Schema description.
 * @param {Object[]}             props.schemas.items          - Array of schema items.
 * @param {number}               props.schemas.items.id       - Schema item id.
 * @param {string}               props.schemas.items.name     - Schema item name.
 * @param {string}               props.schemas.items.quantity - Schema item quantity.
 * @param {string}               props.schemas.items.time     - Schema item time.
 *
 * @param {number|null}          props.selectedSchemaId       - The id of the selected schema from the Redux State.
 * @param {string}               props.mode                   - The current ui mode from the Redux State.
 * @param {EventHandlerFunction} props.addSchema              - A function to add schema.
 * @param {EventHandlerFunction} props.updateSchema           - A function to update schema.
 * @param {function}             props.deleteSchema           - A function to delete schema.
 * @param {function}             props.selectSchema           - A function to select schema.
 * @param {function}             props.setMode                - A function to set current ui mode.
 */
const SchemasBoard = ({
    schemas,
    selectedSchemaId,
    mode,
    addSchema,
    updateSchema,
    deleteSchema,
    selectSchema,
    setMode
}) => {
    const classes = useStyles();
    const isAdd    = mode === UiModes.ADD;
    const isEdit   = mode === UiModes.EDIT;
    const isDelete = mode === UiModes.DELETE;

    const onDeleteClick = (id) => () => deleteSchema(id);
    const onCancelAddClick = () => setMode(UiModes.SHOW);
    const onClickResetSchema = () => selectSchema(null);
    const selectClickedSchema = (id) => () => selectSchema(id)

    let schemasBoard;

    if (selectedSchemaId) {
        if (isEdit) {
            schemasBoard = <SchemaFormContainer
                schema={schemas.find(schema => schema.id === selectedSchemaId)}
                onSubmit={updateSchema}
                onCancel={onClickResetSchema}
            />;
        } else if (isDelete) {
            schemasBoard = (
                <Box
                    className={classes.root}
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='space-evenly'
                >
                    {schemas.map((schema) => (
                        <CustomCardWithButtons
                            buttons={({
                                first: {
                                    onClick: onDeleteClick(schema.id),
                                    text: 'Delete'
                                },
                                second: {
                                    onClick: onClickResetSchema,
                                    text: 'Cancel'
                                }
                            })}
                            cardIsClicked={schema.id === selectedSchemaId}
                            content={schema.items.map((item) => <div key={item.id}>{item.name}</div>)}
                            key={schema.id}
                            name={schema.name}
                            onClick={selectClickedSchema(schema.id)}
                        />
                    ))}
                </Box>
            );
        } else {
            schemasBoard = <Schema
                schema={schemas.find(schema => schema.id === selectedSchemaId)}
            />;
        }
    } else {
        if (isAdd) {
            schemasBoard = <SchemaFormContainer
                schema={{items: []}}
                onSubmit={addSchema}
                onCancel={onCancelAddClick}
            />;
        } else {
            const cardColorTheme = (
                isEdit ?
                    'yellow'
                : isDelete ?
                    'red'
                : null
            );

            schemasBoard = (
                <Box
                    className={classes.root}
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='space-evenly'
                >
                    {schemas.map((schema) => (
                        <CustomCard
                            colorTheme={cardColorTheme}
                            content={schema.items.map((item) => <div key={item.id}>{item.name}</div>)}
                            key={schema.id}
                            name={schema.name}
                            onClick={selectClickedSchema(schema.id)}
                        />
                    ))}
                </Box>
            );
        }
    }

    return schemasBoard;
}

export default connect(
    (state) => ({
        schemas: state.schemas,
        selectedSchemaId: state.ui.selectedSchemaId,
        mode: state.ui.mode
    }),
    { addSchema, updateSchema, deleteSchema, selectSchema, setMode }
)(SchemasBoard);
