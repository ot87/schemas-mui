import React, { useState } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import css from './SchemaForm.module.css';
import FormField from '../Common/FormField/FormField';
import SchemaFormItemsControls from './SchemaFormItemsControls/SchemaFormItemsControls';
import SchemaFormItems from './SchemaFormItems/SchemaFormItems';
import SchemaFormButtons from './SchemaFormButtons/SchemaFormButtons';

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Form container to add or edit schemas. [React Final Form]{@link https://final-form.org/react} library is used.
 * @param {Object}               props
 * @param {Object}               props.schema                - Initial data for the form.
 * @param {number}               [props.schema.id]           - Schema id.
 * @param {string}               [props.schema.name]         - Schema name.
 * @param {string}               [props.schema.description]  - Schema description.
 * @param {Object[]}             props.schema.items          - Array of schema items.
 * @param {number}               props.schema.items.id       - Schema item id.
 * @param {string}               props.schema.items.name     - Schema item name.
 * @param {string}               props.schema.items.quantity - Schema item quantity.
 * @param {string}               [props.schema.items.time]   - Schema item time.
 * @param {EventHandlerFunction} props.onSubmit              - On click function for Submit Plate.
 * @param {EventHandlerFunction} props.onCancel              - On click function for Cancel Plate.
 */
const SchemaFormContainer = ({ schema, onSubmit, onCancel }) => {
    const [isRemoveClicked, setIsRemoveClicked] = useState(false);
    const [itemsIdsToRemove, setItemsIdsToRemove] = useState([]);
    const [isRemoveAllClicked, setIsRemoveAllClicked] = useState(false);

    const addOnClick = (push, items) => {
        push(
            'items',
            {
                id: items.length ?
                    items[items.length - 1].id + 1 :
                    1,
                name: '', quantity: '', time: ''
            }
        );
    };

    const removeOnClick = (removeBatch) => {
        if (isRemoveClicked && itemsIdsToRemove.length) {
            removeBatch('items', itemsIdsToRemove);
            setItemsIdsToRemove([]);
            setIsRemoveAllClicked(false);
        }
        setIsRemoveClicked(!isRemoveClicked);
    };

    const removeAllOnClick = (items) => {
        if (isRemoveAllClicked) {
            setItemsIdsToRemove([]);
        } else {
            setItemsIdsToRemove([...items.keys()]);
        }
        setIsRemoveAllClicked(!isRemoveAllClicked);
    };

    const handleRemoveOnItemsRowClick = (items) => (index) => {
        let newItemsIdsToRemove = [...itemsIdsToRemove];

        if (itemsIdsToRemove.indexOf(index) !== -1) {
            newItemsIdsToRemove = itemsIdsToRemove.filter((id) => id !== index);
        } else {
            newItemsIdsToRemove = itemsIdsToRemove.concat(index);
        }

        setItemsIdsToRemove(newItemsIdsToRemove);
        setIsRemoveAllClicked(items.length === newItemsIdsToRemove.length);
    };

    const required = (value) => !value;

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
                <div className={css.schemaForm}>
                    <SchemaFormItemsControls
                        isRemoveClicked={isRemoveClicked}
                        showRemove={!!values.items.length}
                        isRemoveAllClicked={isRemoveAllClicked}
                        addOnClick={() => addOnClick(push, values.items)}
                        removeOnClick={() => removeOnClick(removeBatch)}
                        removeAllOnClick={() => removeAllOnClick(values.items)}
                    />
                    <form onSubmit={handleSubmit}>
                        <div role="table" className={css.schema}>
                            <FormField
                                name='name'
                                type='text'
                                tag='input'
                                validate={required}
                                disabled={isRemoveClicked}
                            />
                            <FormField
                                name='description'
                                type='text'
                                tag='textarea'
                                disabled={isRemoveClicked}
                            />
                            <SchemaFormItems
                                initItems={initialValues.items}
                                onValidate={required}
                                isRemoveClicked={isRemoveClicked}
                                itemsIdsToRemove={itemsIdsToRemove}
                                handleRemoveOnItemsRowClick={handleRemoveOnItemsRowClick(values.items)}
                            />
                            <SchemaFormButtons
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
                        </div>
                    </form>
                </div>
            )}
        />
    );
};

export default SchemaFormContainer;