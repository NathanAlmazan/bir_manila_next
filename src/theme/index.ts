import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
// theme options
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';


export function createCustomTheme(): Theme {
    const options = {
        palette,
        shape: { borderRadius: 8 },
        typography,
        shadows,
        customShadows,
    }

    const theme = createTheme(options as unknown as ThemeOptions);
    theme.components = componentsOverride(theme);

    return theme;
}

const theme = createCustomTheme();
export default theme;