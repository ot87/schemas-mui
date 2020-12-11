import React from 'react';

import SchemasBoardContainer from '../SchemasBoard/SchemasBoardContainer';

import { Box } from '@material-ui/core';

/**
 * Component for rendering the main part of the app.
 * @param {Object}  props
 * @param {boolean} props.isSchemasClicked - If true, [SchemasBoardContainer]{@link SchemasBoardContainer} will be rendered.
 */
const Content = ({ isSchemasClicked }) => (
    <Box p={'2%'}>
        {isSchemasClicked && <SchemasBoardContainer />}
    </Box>
);

export default Content;