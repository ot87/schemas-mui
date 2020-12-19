import React from 'react';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        padding: theme.spacing(3),
        width: 150,
        height: 200,
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2)
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1),
            width: 145,
            height: 190,
        }
    },
    actionArea: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'inherit',
        height: '100%',
        borderRadius: 4
    },
    highlight: {
        backgroundColor: ({ color }) => (
            color === 'yellow' ?
                yellow[600]
            : color === 'red' ?
                red[600]
            : null
        )
    },
    header: {
        padding: 0
    },
    content: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: 0
    }
}));

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Functional component which renders a custom CustomCard element.
 * @param {Object}               props
 * @param {'yellow'|'red'}       [props.colorTheme] - Color theme of the CustomCard.
 * @param {*}                    props.content      - Content of the CustomCard.
 * @param {boolean}              [props.isClicked]  - Indicates whether the CustomCard is clicked.
 * @param {string}               props.name         - Name of the CustomCard.
 * @param {EventHandlerFunction} props.onClick      - On click function for the CustomCard.
 */
const CustomCard = ({ colorTheme, content, isClicked, name, onClick }) => {
    const classes = useStyles({ color: colorTheme });
    // const customCardCss = cn({
    //     [css.goldCustomCard]: colorTheme === 'gold',
    //     [css.redCustomCard]: colorTheme === 'red',
    //     [css.customCard]: ['gold', 'red'].indexOf(colorTheme) === -1,
    //     [css.clicked]: isClicked
    // });

    return (
        <Card className={classes.root}>
            <CardActionArea
                classes={{
                    root: classes.actionArea,
                    focusHighlight: classes.highlight
                }}
                onClick={onClick}
            >
                <CardHeader
                    className={classes.header}
                    subheader={name}
                />
                <div><hr /></div>
                <CardContent className={classes.content}>
                    <Typography component='div'>
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CustomCard;
