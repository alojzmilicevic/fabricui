import * as React from 'react';
import styled from '@emotion/styled';

type RowProps = {
    text?: string;
    children: React.ReactNode;
    onClick?: () => void;
    selected?: boolean;
};

const StyledPre = styled('pre')<{ selected?: boolean }>(({ selected }) => ({
    margin: 0,
    lineHeight: 1.6,
    backgroundColor: 'revert',
    ...(selected && {
        backgroundColor: '#dedede2e',
    }),
}));

const Row = ({ text, children, selected, ...rest }: RowProps) => (
    <StyledPre selected={selected} {...rest}>
        {children || text}
    </StyledPre>
);

export { Row };
