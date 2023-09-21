import { useState } from 'react';
import styled from '@emotion/styled';
import { CollapseIcon } from './components/CollapseIcon';
import { JsonViewerReturn } from './hooks/useJsonViewer';

const Container = styled.div(props => ({
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #a9a9a93d',
    userSelect: 'none',
    padding: '8px 12px',
    color: '#616161',
    backgroundColor: props.theme.colors.main.secondaryColor,
    height: 'fit-content',
    minHeight: '-webkit-fill-available',
    minWidth: 48,
    position: 'sticky',
    left: 0,
    width: 900,
}));

const NumberRow = styled.pre<{ selected: boolean }>(({ selected }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: 1.6,
    margin: 0,
    ...(selected && {
        color: '#bababa',
    }),
}));

const LineNumbers = ({
    rowCount,
    isRowHidden,
    selected,
    onCollapseRow,
    isCollapsed,
    isCollapsible,
}: LineNumbersProps) => {
    const [hovered, setHovered] = useState(false);

    const numbers = [...Array(rowCount).keys()];

    return (
        <Container onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {numbers.map(
                (cur: number) =>
                    !isRowHidden(cur) && (
                        <NumberRow key={cur} selected={cur === selected}>
                            {cur + 1}

                            <CollapseIcon
                                hovered={hovered}
                                collapsed={isCollapsed(cur)}
                                isCollapsible={isCollapsible(cur)}
                                onCollapseRow={() => onCollapseRow(cur)}
                            />
                        </NumberRow>
                    )
            )}
        </Container>
    );
};

type LineNumbersProps = Pick<
    JsonViewerReturn,
    'isRowHidden' | 'selected' | 'onCollapseRow' | 'isCollapsed' | 'isCollapsible'
> & {
    rowCount: number;
};

export { LineNumbers };
