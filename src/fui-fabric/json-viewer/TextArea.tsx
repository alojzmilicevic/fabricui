import { styled } from '@mui/material';
import { Row } from './components/Row';
import { TokenComponent } from './components/TokenComponent';
import { JsonViewerReturn } from './hooks/useJsonViewer';
import { Token } from './jsonTokenizer';
import { getColor } from './theme';

const Container = styled('div')(props => ({
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    backgroundColor: "white",
    padding: '8px 0',
    cursor: 'text',
    height: 'fit-content',
    minHeight: '100%',
    flex: 1,
    boxSizing: 'border-box',
}));

type TokenRowProps = Pick<TextAreaProps, 'isCollapsed' | 'setSelected' | 'selected' | 'themeType'> & {
    tokens: Token[];
    currentRow: number;
    offset: number;
};

const TokenRow = ({ tokens, currentRow, setSelected, selected, themeType, isCollapsed, offset }: TokenRowProps) => {
    return (
        <div>
            <Row onClick={() => setSelected(currentRow)} selected={selected === currentRow}>
                {tokens.map((token: Token, currentCol: number) => (
                    <TokenComponent
                        token={token}
                        collapsed={isCollapsed(currentRow)}
                        color={getColor(token.type, themeType)}
                        key={`row${currentCol}`}
                    />
                ))}
            </Row>
        </div>
    );
};

const TextArea = ({ parsedData, isRowHidden, ...rest }: TextAreaProps) => (
    <Container>
        {parsedData.map(
            (tokens, currentRow) =>
                !isRowHidden(currentRow) && <TokenRow tokens={tokens} currentRow={currentRow} {...rest} />
        )}
    </Container>
);

type TextAreaProps = Pick<
    JsonViewerReturn,
    'parsedData' | 'selected' | 'setSelected' | 'isRowHidden' | 'isCollapsed'
> & {
    themeType: string | undefined;
    offset: number;
};

export { TextArea };
