import React from 'react';
import css from './Item.module.css';

/**
 * Component to display content as a cell.
 * @param {Object} props
 * @param {*}      props.children - Content to display.
 */
const Item = ({ children }) => (
    <span className={css.item}>
        {children}
    </span>
);

export default Item;