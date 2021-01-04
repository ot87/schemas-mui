import React, { useState } from 'react';

import HeaderContainer  from 'components/Header/HeaderContainer';
import ContentContainer from 'components/Content/ContentContainer';

import { makeStyles } from '@material-ui/core/styles';
import Container      from '@material-ui/core/Container';
import Box            from '@material-ui/core/Box';
import grey           from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundColor: grey[50]
    },
    gutters: {
        [theme.breakpoints.down('xs')]: {
          paddingLeft: 0,
          paddingRight: 0
        }
    }
}));

const App = () => {
    const classes = useStyles();
    // TODO isSchemasClicked is set true while profile isn't available
    const [isSchemasClicked, setIsSchemasClicked] = useState(true);

    return (
        <Container className={classes.gutters}>
            <Box display='flex' flexDirection='column' className={classes.root}>
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
