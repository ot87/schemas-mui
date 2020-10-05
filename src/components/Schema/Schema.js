import React from 'react';

import css from './Schema.module.css';
import Item from '../Common/Item/Item';

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
const Schema = ({ schema }) => (
    <div className={css.schema}>
        <div>
            {schema.name}
        </div>
        <div>{schema.description}</div>
        <div>
            {schema.items.map((item, key) => (
                <div key={key} className={css.items}>
                    <Item>{item.name}</Item>
                    <Item>{item.quantity}</Item>
                    <Item>{item.time}</Item>
                </div>
            ))}
        </div>
    </div>
);

export default Schema;