import React, { useState } from 'react';

import Header  from 'components/Header';
import Content from 'components/Content/Content';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box       from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    rootContainer: {
        backgroundColor: theme.palette.background.paper
    },
    gutters: {
        [theme.breakpoints.down('xs')]: {
          paddingLeft: 0,
          paddingRight: 0
        }
    },
    rootBox: {
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
    }
}));

/**
 * A Dashboard component with Header and Content.
 */
const Dashboard = () => {
    const classes = useStyles();

    // TODO isSchemasClicked is set true while profile isn't available
    const [isSchemasClicked, setIsSchemasClicked] = useState(true);

    return (
        <Container className={classes.rootContainer} maxWidth={false} disableGutters>
            <Container className={classes.gutters}>
                <Box display='flex' flexDirection='column' className={classes.rootBox}>
                    <Header
                        isSchemasClicked={isSchemasClicked}
                        setIsSchemasClicked={setIsSchemasClicked}
                    />
                    <Content isSchemasClicked={isSchemasClicked} />
                </Box>
            </Container>
        </Container>
    );
};

export default Dashboard;
