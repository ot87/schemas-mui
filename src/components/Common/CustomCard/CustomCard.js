import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card           from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader     from '@material-ui/core/CardHeader';
import CardContent    from '@material-ui/core/CardContent';
import Typography     from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        padding: theme.spacing(3),
        width: 200,
        height: 250,
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            width: 180,
            height: 230,
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1),
            width: 160,
            height: 205
        }
    },
    actionArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'inherit',
        height: '100%',
        borderRadius: theme.shape.borderRadius
    },
    highlight: {
        backgroundColor: theme.palette.primary.main
    },
    header: {
        padding: 0
    },
    content: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: 0
    },
    subheader: {
        color: ({ isClicked }) => isClicked ? theme.palette.primary.main : null
    }
}));

/**
 * Callback for events handling.
 * @callback EventHandler
 */

/**
 * Functional component which renders a custom CustomCard element.
 * @param {Object}       props
 * @param {*}            props.content     - Content of the CustomCard.
 * @param {boolean}      [props.isClicked] - Indicates whether the CustomCard is clicked.
 * @param {string}       props.name        - Name of the CustomCard.
 * @param {EventHandler} [props.onClick]   - On click function for the CustomCard.
 */
const CustomCard = ({
    content,
    isClicked = false,
    name,
    onClick = null
}) => {
    const classes = useStyles({ isClicked });

    let cardContent = (
        <>
            <CardHeader
                classes={{
                    root: classes.header,
                    subheader: classes.subheader
                }}
                subheader={name}
            />
            <div><hr /></div>
            <CardContent className={classes.content}>
                <Typography component='div'>
                    {content}
                </Typography>
            </CardContent>
        </>
    );

    if (!isClicked) {
        cardContent = (
            <CardActionArea
                classes={{
                    root: classes.actionArea,
                    focusHighlight: classes.highlight
                }}
                onClick={onClick}
            >
                {cardContent}
            </CardActionArea>
        );
    }

    return (
        <Card className={classes.root} role='button' elevation={isClicked ? 5 : 3}>
            {cardContent}
        </Card>
    );
};

CustomCard.propTypes = {
    content:    PropTypes.node.isRequired,
    isClicked:  PropTypes.bool,
    name:       PropTypes.string.isRequired,
    onClick:    PropTypes.func
};

export default CustomCard;
