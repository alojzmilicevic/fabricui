export type Placement =
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end'
    | 'right-start'
    | 'right'
    | 'right-end';

export type Point = { x: number; y: number };


type PositionData = {
    x: number;
    y: number;
    childY: number;
    childX: number;
    childHeight: number;
    childWidth: number;
    tooltipHeight: number;
    tooltipWidth: number;
    placement: Placement;
};

function isTopOverflow(y: number, placement: Placement) {
    return placement.includes('top') && y < 0;
}

function isBottomOverflow(
    y: number,
    tooltipHeight: number,
    position: Placement
) {
    return (
        position.includes('bottom') && y + tooltipHeight > window.innerHeight
    );
}

function isLeftOverflow(x: number, placement: Placement) {
    return placement.includes('left') && x < 0;
}

function isRightOverflow(
    x: number,
    tooltipWidth: number,
    placement: Placement
) {
    return placement.includes('right') && x + tooltipWidth > window.innerWidth;
}

const handleOverflow = (positionData: PositionData) => {
    const {
        x,
        y,
        childY,
        childX,
        childHeight,
        childWidth,
        tooltipHeight,
        tooltipWidth,
        placement,
    } = positionData;

    const topAnchor = childY;
    const leftAnchor = childX;
    const bottomAnchor = childY + childHeight;
    const rightAnchor = childX + childWidth;

    let dx = x;
    let dy = y;

    if (isTopOverflow(y, placement)) {
        dy = bottomAnchor;
    } else if (isBottomOverflow(y, tooltipHeight, placement)) {
        dy = topAnchor - tooltipHeight;
    } else if (isLeftOverflow(x, placement)) {
        dx = rightAnchor;
    } else if (isRightOverflow(x, tooltipWidth, placement)) {
        dx = leftAnchor - tooltipWidth;
    }

    return { dx, dy };
};

export function calculatePosition(
    childX: number,
    childY: number,
    childWidth: number,
    childHeight: number,
    tooltipHeight: number,
    tooltipWidth: number,
    placement: Placement
): Point {
    let x = 0;
    let y = 0;

    switch (placement) {
        case 'top-start':
            y = childY - tooltipHeight;
            x = childX;
            break;
        case 'top':
            y = childY - tooltipHeight;
            x = childX + childWidth / 2 - tooltipWidth / 2;
            break;
        case 'top-end':
            y = childY - tooltipHeight;
            x = childX + childWidth - tooltipWidth;
            break;
        case 'bottom-start':
            y = childY + childHeight;
            x = childX;
            break;
        case 'bottom':
            y = childY + childHeight;
            x = childX + childWidth / 2 - tooltipWidth / 2;
            break;
        case 'bottom-end':
            y = childY + childHeight;
            x = childX + childWidth - tooltipWidth;
            break;
        case 'left-start':
            y = childY;
            x = childX - tooltipWidth;
            break;
        case 'left':
            y = childY + childHeight / 2 - tooltipHeight / 2;
            x = childX - tooltipWidth;
            break;
        case 'left-end':
            y = childY + childHeight - tooltipHeight;
            x = childX - tooltipWidth;
            break;
        case 'right-start':
            y = childY;
            x = childX + childWidth;
            break;
        case 'right':
            y = childY + childHeight / 2 - tooltipHeight / 2;
            x = childX + childWidth;
            break;
        case 'right-end':
            y = childY + childHeight - tooltipHeight;
            x = childX + childWidth;
            break;
    }

    let { dx, dy } = handleOverflow({
        x,
        y,
        childY,
        childX,
        childHeight,
        childWidth,
        tooltipHeight,
        tooltipWidth,
        placement,
    });

    return { x: dx, y: dy };
}
