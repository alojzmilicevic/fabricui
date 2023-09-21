import { cloneElement, useLayoutEffect, useRef, useState } from 'react';
import { Point, calculatePosition } from './placement';
import { TooltipProps } from './Tooltip';

type TooltipHook = Pick<TooltipProps, 'children' | 'position'>;

export function useTooltip({ children, position }: TooltipHook) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [tooltipCoords, setTooltipCoords] = useState<Point>({
        x: 0,
        y: 0,
    });

    const ref = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget);
    const onMouseLeave = () => setAnchorEl(null);

    const childrenWithRef = cloneElement(children as React.ReactElement, { ref });

    useLayoutEffect(() => {
        if (!tooltipRef.current || !ref.current || !anchorEl) return;

        const {
            x: childX,
            y: childY,
            width: childWidth,
            height: childHeight,
        } = ref.current.getBoundingClientRect();

        const { height: tooltipHeight, width: tooltipWidth } = tooltipRef.current.getBoundingClientRect();

        const { x, y } = calculatePosition(
            childX,
            childY,
            childWidth,
            childHeight,
            tooltipHeight,
            tooltipWidth,
            position || 'top-start'
        );

        setTooltipCoords({ x, y });
    }, [anchorEl]);

    const show = Boolean(anchorEl);
    const styles = {
        transform: `translate3d(${tooltipCoords.x}px, ${tooltipCoords.y}px, 0px)`,
    };

    return {
        show,
        styles,
        anchorEl,
        tooltipRef,
        onMouseEnter,
        onMouseLeave,
        childrenWithRef,
    };
}
