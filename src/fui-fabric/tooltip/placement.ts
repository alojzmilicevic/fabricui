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

const isBottomOverflow = (y: number, tooltipHeight: number, position: Placement) =>
    position.includes('bottom') && y + tooltipHeight > window.innerHeight;

const isLeftOverflow = (x: number, placement: Placement) => placement.includes('left') && x < 0;

const isRightOverflow = (x: number, tooltipWidth: number, placement: Placement) =>
    placement.includes('right') && x + tooltipWidth > window.innerWidth;

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
    
        // Check available space
        const availableTopSpace = childY;
        const availableBottomSpace = window.innerHeight - (childY + childHeight);
        const availableLeftSpace = childX;
        const availableRightSpace = window.innerWidth - (childX + childWidth);
    
        if (isTopOverflow(y, placement)) {
            if (tooltipHeight <= availableBottomSpace) {
                dy = bottomAnchor; // Flip to bottom if there's enough space
            }
        } else if (isBottomOverflow(y, tooltipHeight, placement)) {
            if (tooltipHeight <= availableTopSpace) {
                dy = topAnchor - tooltipHeight; // Flip to top if there's enough space
            }
        } else if (isLeftOverflow(x, placement)) {
            if (tooltipWidth <= availableRightSpace) {
                dx = rightAnchor; // Flip to right if there's enough space
            }
        } else if (isRightOverflow(x, tooltipWidth, placement)) {
            if (tooltipWidth <= availableLeftSpace) {
                dx = leftAnchor - tooltipWidth; // Flip to left if there's enough space
            }
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
