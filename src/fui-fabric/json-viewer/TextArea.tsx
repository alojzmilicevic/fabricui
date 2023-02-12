import styled from '@emotion/styled';
import { Row } from './components/Row';
import { Token } from './jsonTokenizer';
import { getColor } from './theme';
import { TokenComponent } from './components/TokenComponent';
import { useState } from 'react';
import { TransitionDelayed } from '../../components/transitions/TransitionDelay';

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
        <div style={{ width: '100%', display: 'flex' }}>
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
            <TransitionDelayed>
                <div style={{ position: 'sticky', right: 0 }}>
                    <button
                        style={{
                            position: 'absolute',
                            right: 0,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 12,
                            width: 48,
                            justifyContent: 'center',
                        }}>
                        Copy
                    </button>
                </div>
            </TransitionDelayed>
        </div>
    );
};

const TextArea = ({ parsedData, themeType, setSelected, selected, isRowHidden, isCollapsed }: TextAreaProps) => {
    return (
        <Container>
            {parsedData.map(
                (tokens, currentRow) =>
                    !isRowHidden(currentRow) && (
                        <div style={{ display: 'flex' }} key={`row${currentRow}`}>
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
};

type TextAreaProps = {
    parsedData: Token[][];
    themeType: string;
    selected: number;
    setSelected: (index: number) => void;
    isRowHidden: (currentRow: number) => boolean;
    isCollapsed: (currentRow: number) => boolean;
};

export { TextArea };
