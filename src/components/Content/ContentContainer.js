import React from 'react';

import css from './Content.module.css';
import SchemasBoardContainer from '../SchemasBoard/SchemasBoardContainer';

/**
 * Component for rendering the main part of the app.
 * @param {Object}  props
 * @param {boolean} props.isSchemasClicked - If true, [SchemasBoardContainer]{@link SchemasBoardContainer} will be rendered.
 */
const Content = ({ isSchemasClicked }) => (
    <div className={css.content}>
        {isSchemasClicked && <SchemasBoardContainer />}
    </div>
);

export default Content;