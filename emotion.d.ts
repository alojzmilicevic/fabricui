import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            main: {
                primaryColor: string;
                secondaryColor: string;
                primaryDarkColor: string;
                offsetColor: string;
            };
        };
        palette: {
            success: string;
            error: string;
            warning: string;
            info: string;
        };
        borderRadius: number;
    }
}
