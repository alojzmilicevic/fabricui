import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { StepProps } from './Step/Step';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { StyledTypography } from './StyledTypography';

const Wrapper = styled.div(() => ({
    display: 'flex',
    padding: '8px 0px',

    '&:hover': {
        cursor: 'pointer',
    },
}));

const CircleWrapper = styled.div(() => ({
    paddingRight: 8,
}));

const Circle = styled.div<{ active: boolean }>(({ active, theme }) => ({
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: theme.colors.main.secondaryColor,
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    ...(!active && {
        backgroundColor: '#00000061',
    }),
}));

const StepIcon = ({ index, active, variant }: { index: number; active: boolean; variant: Variant }) => {
    const theme = useTheme();
    console.log(theme);
    

    let icon;

    switch (variant) {
        case 'success':
            icon = <CheckIcon style={{ color: theme.palette.success }} />;
            break;
        case 'warning':
            icon = <CancelIcon style={{ color: '#e86f00' }} />;
            break;
        case 'error':
            icon = <CancelIcon style={{ color: theme.palette.error }} />;
            break;
        default:
            icon = <Circle active={active}>{index}</Circle>;
            break;
    }

    return <CircleWrapper>{icon}</CircleWrapper>;
};

const StepLabel = ({
    active = false,
    index = -1,
    children,
    disabled = false,
    onClick,
    variant,
    optional,
}: StepLabelProps) => {
    return (
        <Wrapper onClick={onClick} style={{ position: 'relative' }}>
            <StepIcon active={active} index={index} variant={variant} />
            <div>
                <StyledTypography disabled={disabled} bold={!disabled} variant={variant}>
                    {children}
                </StyledTypography>
                {optional && <p style={{ margin: 0, fontSize: 12 }}>{optional}</p>}
            </div>
        </Wrapper>
    );
};

export type Variant = 'success' | 'warning' | 'error' | undefined;

// Construct a type from StepProps (parent) but force the props to be required unlike the parents props
type StepLabelProps = Partial<Pick<StepProps, 'active' | 'index' | 'onClick'>> & {
    disabled?: boolean;
    variant: Variant;
    children: React.ReactNode | string;
    optional?: string;
};

export { StepLabel };
