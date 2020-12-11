import React, { useState } from 'react';

import HeaderContainer from './components/Header/HeaderContainer';
import ContentContainer from './components/Content/ContentContainer';

import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        backgroundColor: grey[50]
    }
}));

const App = () => {
    const classes = useStyles();
    // TODO isSchemasClicked is set true while profile isn't available
    const [isSchemasClicked, setIsSchemasClicked] = useState(true);
    const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Container disableGutters={smallScreen}>
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

export default App;