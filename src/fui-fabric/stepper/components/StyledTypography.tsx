import styled from '@emotion/styled';
import { Variant } from './StepLabel';

const StyledTypography = styled.p<{ disabled?: boolean; bold?: boolean; variant?: Variant }>(
    ({ disabled = false, bold = false, variant, theme }) => ({
        margin: 0,

        ...(disabled && {
            color: '#00000099',
            fontWeight: 'lighter',
        }),

        ...(bold && {
            fontWeight: 'bold',
        }),

        ...(variant === 'warning' && {
            color: '#e86f00',
        }),

        ...(variant === 'error' && {
            color: theme.palette.error,
        }),
    })
);

export { StyledTypography };
