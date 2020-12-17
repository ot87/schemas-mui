import React from 'react';
import { connect } from 'react-redux';

import css from './SchemasBoard.module.css';
import CustomCard from '../Common/CustomCard/CustomCard';
import CardWithButtons from '../Common/Card/CardWithButtons';
import Schema from '../Schema/Schema';
import SchemaFormContainer from '../SchemaForm/SchemaFormContainer';
import { addSchema, updateSchema, deleteSchema } from '../../redux/reducers/schemas';
import { selectSchema, setMode, UiModes } from '../../redux/reducers/ui';

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
    const isAdd    = mode === UiModes.ADD;
    const isEdit   = mode === UiModes.EDIT;
    const isDelete = mode === UiModes.DELETE;

    let schemasBoard;

    if (selectedSchemaId) {
        if (isEdit) {
            schemasBoard = <SchemaFormContainer
                schema={schemas.find(schema => schema.id === selectedSchemaId)}
                onSubmit={updateSchema}
                onCancel={() => selectSchema(null)}
            />;
        } else if (isDelete) {
            schemasBoard = <div className={css.board}>
                {schemas.map((schema) => (
                    <CardWithButtons
                        key={schema.id}
                        name={schema.name}
                        content={schema.items.map((item) => <div key={item.id}>{item.name}</div>)}
                        colorTheme='red'
                        cardIsClicked={schema.id === selectedSchemaId}
                        onClick={() => selectSchema(schema.id)}
                        buttons={({
                            first: {
                                text: 'Delete',
                                onClick: () => deleteSchema(schema.id)
                            },
                            second: {
                                text: 'Cancel',
                                onClick: () => selectSchema(null)
                            }
                        })}
                    />
                ))}
            </div>;
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
                onCancel={() => setMode(UiModes.SHOW)}
            />;
        } else {
            const cardColorTheme = (
                isEdit ?
                    'gold'
                : isDelete ?
                    'red'
                : null
            );

            schemasBoard = <div className={css.board}>
                {schemas.map((schema) => (
                    <CustomCard
                        key={schema.id}
                        name={schema.name}
                        content={schema.items.map((item) => <div key={item.id}>{item.name}</div>)}
                        colorTheme={cardColorTheme}
                        onClick={() => selectSchema(schema.id)}
                    />
                ))}
            </div>;
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
