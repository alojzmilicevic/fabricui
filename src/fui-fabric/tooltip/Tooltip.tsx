import styled from '@emotion/styled';
import { useTooltip } from './useTooltip';
import { Placement } from './placement';
import { Portal } from './Portal';

const StyledTooltip = styled.div`
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 4px 8px;
    border-radius: 2px;
    font-size: 13px;
    white-space: nowrap;
`;

export const Tooltip = (props: TooltipProps) => {
    const { title, wrapperId, children, position, style } = props;

    const { childrenWithRef, onMouseEnter, onMouseLeave, show, tooltipRef, styles } = useTooltip({
        children,
        position,
    });

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {childrenWithRef}
            {show && (
                <Portal styles={styles} elementId={wrapperId}>
                    <StyledTooltip style={{ ...style }} ref={tooltipRef}>
                        {title}
                    </StyledTooltip>
                </Portal>
            )}
        </div>
    );
};

export type TooltipProps = {
    children: React.ReactNode;
    title: string;
    position?: Placement;
    wrapperId?: string;
    style?: React.CSSProperties;
};
