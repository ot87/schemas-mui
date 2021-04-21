import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import red   from '@material-ui/core/colors/red';

const customPrimaryColors = {
    colors: ['green', 'yellow', 'red'],
    light: {
        green: {
            main: green[500],
            shades: []
        },
        yellow: {
            main: amber[500],
            shades: []
        },
        red: {
            main: red[500],
            shades: []
        }
    },
    dark: {
        green: {
            main: green[300],
            shades: [300, 200, 400]
        },
        yellow: {
            main: amber[300],
            shades: [300, 200, 400]
        },
        red: {
            main: red[300],
            shades: [300, 200, 400]
        }
    }
};

export default customPrimaryColors;
