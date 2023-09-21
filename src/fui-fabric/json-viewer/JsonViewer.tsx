import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { LineNumbers } from './LineNumbers';
import { TextArea } from './TextArea';
import { useJsonViewer } from './hooks/useJsonViewer';
import { JSONValue } from './jsonTokenizer';
import { Themes } from './theme';
import { useState } from 'react';

const Main = styled.div(props => ({
    display: 'flex',
    fontSize: 16,
    overflow: 'auto',
    height: 600,
    width: 900,
    borderRadius: props.theme.borderRadius,
    position: 'relative',

    '&::-webkit-scrollbar': {
        width: 20,
        backgroundColor: props.theme.colors.main.secondaryColor,
    },

    '&::-webkit-scrollbar:vertical': {
        borderTopRightRadius: props.theme.borderRadius,
        backgroundColor: props.theme.colors.main.primaryColor,
        borderLeft: `1px solid #a9a9a93d`,
    },

    '&::-webkit-scrollbar-thumb': {
        borderRadius: props.theme.borderRadius,
        backgroundColor: props.theme.colors.main.offsetColor,
        border: '6px solid transparent',
        backgroundClip: 'content-box',
    },

    '&::-webkit-scrollbar:horizontal': {
        borderBottomLeftRadius: props.theme.borderRadius,
        height: 20,
    },

    '&::-webkit-scrollbar-corner': {
        borderLeft: `24px solid ${props.theme.colors.main.secondaryColor}`,
        borderBottomRightRadius: props.theme.borderRadius,
    },
}));

const JsonViewer = (props: JsonViewerProps) => {
    const { themeType = Themes.AtomOneDark } = props;
    const { parsedData, customTheme, ...rest } = useJsonViewer(props);
    const [scrollDistance, setScrollDistance] = useState(0);
    const timer = null;

    const handleScrollWithDelay = (e: any) => {
        if (timer) {
            clearTimeout(timer);
        }

        setTimeout(() => {
            console.log(e);
            
            setScrollDistance(e.target.scrollLeft);
        }, 400);
    };
    return (
        <ThemeProvider theme={customTheme}>
            <Main onScroll={handleScrollWithDelay}>
                <LineNumbers rowCount={parsedData.length} {...rest} />
                <TextArea offset={scrollDistance} parsedData={parsedData} themeType={themeType} {...rest} />
            </Main>
        </ThemeProvider>
    );
};

export type JsonViewerProps = {
    json: JSONValue;
    themeType?: string;
    tabSize?: number;
};

export { JsonViewer };
