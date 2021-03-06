import React from 'react';
import PropTypes from 'prop-types';

import SchemasBoard from 'components/Schemas/SchemasBoard/SchemasBoard';

import { Box } from '@material-ui/core';

/**
 * Component for rendering the main part of the app.
 * @param {Object}  props
 * @param {boolean} props.isSchemasClicked - If true, [SchemasBoard]{@link SchemasBoard} will be rendered.
 */
const Content = ({ isSchemasClicked }) => (
    <Box p={'2%'}>
        {isSchemasClicked && <SchemasBoard />}
    </Box>
);

Content.propTypes = {
    isSchemasClicked: PropTypes.bool.isRequired
};

export default Content;
