import React, { useState } from 'react';

import { Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import grey from '@material-ui/core/colors/grey';

import HeaderContainer from './components/Header/HeaderContainer';
import ContentContainer from './components/Content/ContentContainer';

const styles = {
    root: {
        minHeight: '100vh',
        backgroundColor: grey[50]
    }
};

const App = ({ classes }) => {
    // TODO isSchemasClicked is set true while profile isn't available
    const [isSchemasClicked, setIsSchemasClicked] = useState(true);

    const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Container disableGutters={matches}>
            <Box display="flex" flexDirection="column" className={classes.root}>
                <HeaderContainer
                    isSchemasClicked={isSchemasClicked}
                    setIsSchemasClicked={setIsSchemasClicked}
                />
                <ContentContainer isSchemasClicked={isSchemasClicked} />
            </Box>
        </Container>
    );
};

export default withStyles(styles)(App);