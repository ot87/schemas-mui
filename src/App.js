import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import API from 'api';
import { loadSchemas } from 'redux/reducers/schemas';

import Header from 'components/Header';
import ContentContainer from 'components/Content/ContentContainer';

import { makeStyles } from '@material-ui/core/styles';
import Container      from '@material-ui/core/Container';
import Box            from '@material-ui/core/Box';
import grey           from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
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
    const classes  = useStyles();
    const dispatch = useDispatch();

    // TODO isSchemasClicked is set true while profile isn't available
    const [isSchemasClicked, setIsSchemasClicked] = useState(true);

    useEffect(() => {
        // TODO demo profile
        API.init('Profile 1');
        dispatch(loadSchemas());
    }, [dispatch]);

    return (
        <Container className={classes.gutters}>
            <Box display='flex' flexDirection='column' className={classes.root}>
                <Header
                    isSchemasClicked={isSchemasClicked}
                    setIsSchemasClicked={setIsSchemasClicked}
                />
                <ContentContainer isSchemasClicked={isSchemasClicked} />
            </Box>
        </Container>
    );
};

export default App;
