import styled from '@emotion/styled';
import { Row } from './components/Row';
import { Token } from './jsonTokenizer';
import { getColor } from './theme';
import { TokenComponent } from './components/TokenComponent';

const Container = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    backgroundColor: props.theme.colors.main.primaryColor,
    padding: '8px 0',
    cursor: 'text',
    height: 'fit-content',
    minHeight: '100%',
    flex: 1,
    boxSizing: 'border-box',
}));

const TextArea = ({ parsedData, themeType, setSelected, selected, isRowHidden, isCollapsed }: TextAreaProps) => (
    <Container>
        {parsedData.map(
            (tokens, currentRow) =>
                !isRowHidden(currentRow) && (
                    <Row
                        key={`row${currentRow}`}
                        onClick={() => setSelected(currentRow)}
                        selected={selected === currentRow}>
                        {tokens.map((token: Token, currentCol) => (
                            <TokenComponent
                                token={token}
                                collapsed={isCollapsed(currentRow)}
                                color={getColor(token.type, themeType)}
                                key={`row${currentCol}`}
                            />
                        ))}
                    </Row>
                )
        )}
    </Container>
);

type TextAreaProps = {
    parsedData: Token[][];
    themeType: string;
    selected: number;
    setSelected: (index: number) => void;
    isRowHidden: (currentRow: number) => boolean;
    isCollapsed: (currentRow: number) => boolean;
};

export { TextArea };
