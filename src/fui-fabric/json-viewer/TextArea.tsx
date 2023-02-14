import styled from '@emotion/styled';
import { TransitionDelayed } from '../../components/transitions/TransitionDelay';
import { Row } from './components/Row';
import { TokenComponent } from './components/TokenComponent';
import { Token } from './jsonTokenizer';
import { getColor } from './theme';
import React, { useRef } from 'react';

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

const TokenRow = ({
    tokens,
    currentRow,
    setSelected,
    selected,
    themeType,
    isCollapsed,
}: {
    tokens: any;
    currentRow: number;
    setSelected: any;
    selected: number;
    themeType: any;
    isCollapsed: any;
}) => {
    return (
        <Row onClick={() => setSelected(currentRow)} selected={selected === currentRow}>
            {tokens.map((token: Token, currentCol: number) => (
                <TokenComponent
                    token={token}
                    collapsed={isCollapsed(currentRow)}
                    color={getColor(token.type, themeType)}
                    key={`row${currentCol}`}
                />
            ))}

            <button
                style={{
                    width: 48,
                    height: 24,
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    marginLeft: 750,
                }}>
                Copy
            </button>
        </Row>
    );
};

const TextArea = ({ parsedData, themeType, setSelected, selected, isRowHidden, isCollapsed }: TextAreaProps) => (
    <Container>
        {parsedData.map(
            (tokens, currentRow) =>
                !isRowHidden(currentRow) && (
                    <div key={`row${currentRow}`}>
                        <TokenRow
                            tokens={tokens}
                            currentRow={currentRow}
                            setSelected={setSelected}
                            selected={selected}
                            themeType={themeType}
                            isCollapsed={isCollapsed}
                        />
                    </div>
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
