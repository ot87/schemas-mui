import { useTheme } from '@material-ui/core/styles';
import green  from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';
import red    from '@material-ui/core/colors/red';

const useNewPrimaryColor = colorTheme => {
    const theme = useTheme();
    const augmentColor = (color) => theme.palette.augmentColor(
        {
            main: color,
            contrastText: theme.palette.background.default
        },
        700, 500, 900
    );
    const primary = (
        colorTheme === 'green' ?
            augmentColor(green[700])
        : colorTheme === 'yellow' ?
            augmentColor(yellow[700])
        : colorTheme === 'red' ?
            augmentColor(red[700])
        : theme.palette.primary
    );

    return {
        ...theme,
        palette: {
            ...theme.palette,
            primary
        }
    };
};

export default useNewPrimaryColor;
