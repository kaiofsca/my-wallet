// styled.d.ts é uma ferramenta do typescript para sobre escrever tipos de arquivos
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string

        colors: {
            primary: string
            secondary: string
            tertiary: string

            white: string
            black: string
            gray: string

            success: string
            info: string
            warning: string

        },
    }
}
