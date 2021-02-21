import React       from 'react';
import { connect } from 'react-redux';

import CustomCard        from 'components/Common/CustomCard/CustomCard';
import CustomCardButtons from 'components/Common/CustomCard/CustomCardButtons';
import Schema            from 'components/Schemas/Schema/Schema';
import AddSchemaForm     from 'components/Schemas/AddSchemaForm/AddSchemaForm';
import EditSchemaForm    from 'components/Schemas/EditSchemaForm/EditSchemaForm';

import {
    deleteSchema,
    selectSchemas
} from 'redux/reducers/schemas';
import { setActiveSchemaId, UiModes } from 'redux/reducers/ui';

import { makeStyles } from '@material-ui/core/styles';
import Box            from '@material-ui/core/Box';

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
 * Component to display a list of all Schemas by [Card]{@link Card} or [CardWithButtons]{@link CardWithButtons} or a single selected [Schema]{@link Schema} or [SchemaFormContainer]{@link SchemaFormContainer}.
 * The displayed content depends on value of the activeSchemaId and mode parameters.
 * @param {Object}               props
 * @param {Object[]}             props.schemas                - The data of the all schemas from the Redux State.
 * @param {string}               props.schemas.id             - Schema id.
 * @param {string}               props.schemas.name           - Schema name.
 * @param {string}               [props.schemas.description]  - Schema description.
 * @param {Object[]}             props.schemas.items          - Array of schema items.
 * @param {number}               props.schemas.items.id       - Schema item id.
 * @param {string}               props.schemas.items.name     - Schema item name.
 * @param {string}               props.schemas.items.quantity - Schema item quantity.
 * @param {string}               props.schemas.items.time     - Schema item time.
 *
 * @param {string|null}          props.activeSchemaId         - The id of the selected schema from the Redux State.
 * @param {string}               props.mode                   - The current ui mode from the Redux State.
 * @param {function}             props.deleteSchema           - A function to delete schema.
 * @param {function}             props.setActiveSchemaId      - A function to select schema.
 */
const SchemasBoard = ({
    schemas,
    activeSchemaId,
    mode,
    deleteSchema,
    setActiveSchemaId
}) => {
    const classes = useStyles();
    const isAdd    = mode === UiModes.ADD;
    const isEdit   = mode === UiModes.EDIT;
    const isDelete = mode === UiModes.DELETE;

    const onDeleteClick       = id => () => deleteSchema(id);
    const onClickResetSchema  = () => setActiveSchemaId(null);
    const selectClickedSchema = id => () => setActiveSchemaId(id);

    let schemasBoard;

    if (activeSchemaId) {
        if (isEdit) {
            schemasBoard = <EditSchemaForm id={activeSchemaId} />;
        } else if (isDelete) {
            schemasBoard = (
                <Box
                    className={classes.root}
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='space-evenly'
                >
                    {schemas.map(schema => (
                        <CustomCardButtons
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
                            isCardClicked={schema.id === activeSchemaId}
                            content={schema.items.map(item => <div key={item.id}>{item.name}</div>)}
                            key={schema.id}
                            name={schema.name}
                            onClick={selectClickedSchema(schema.id)}
                        />
                    ))}
                </Box>
            );
        } else {
            schemasBoard = <Schema id={activeSchemaId} />;
        }
    } else {
        if (isAdd) {
            schemasBoard = <AddSchemaForm />;
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
                    {schemas.map(schema => (
                        <CustomCard
                            colorTheme={cardColorTheme}
                            content={schema.items.map(item => <div key={item.id}>{item.name}</div>)}
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
};

export default connect(
    state => ({
        schemas: selectSchemas(state),
        activeSchemaId: state.ui.activeSchemaId,
        mode: state.ui.mode
    }),
    { deleteSchema, setActiveSchemaId }
)(SchemasBoard);
