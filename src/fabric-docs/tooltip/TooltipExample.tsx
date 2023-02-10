import styled from '@emotion/styled';
import { Tooltip } from '../../fui-fabric/tooltip/Tooltip';
import { Placement } from '../../fui-fabric/tooltip/placement';

const CenterContainer = styled.div`
    display: flex;
    align-items: space-between;
    justify-content: space-between;
    width: 100%;
`;

const endStyle = {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
};

const topPositions: Placement[] = ['top-start', 'top', 'top-end'];
const leftPositions: Placement[] = ['left-start', 'left', 'left-end'];
const rightPositions: Placement[] = ['right-start', 'right', 'right-end'];
const bottomPositions: Placement[] = ['bottom-start', 'bottom', 'bottom-end'];

const TooltipGroup = ({ pos, style }: { pos: Placement[]; style?: any }) => (
    <div style={{ ...style }}>
        {pos.map(position => (
            <Tooltip key={position} title="Add" wrapperId="test" position={position}>
                <button style={{ margin: 6 }}>{position}</button>
            </Tooltip>
        ))}
    </div>
);

export const TooltipExample = () => {
    return (
        <div style={{ width: 500 }}>
            <h3>Positioned tooltips</h3>
            <p>
                The Tooltip has 12 placement choices. They don't have directional arrows; instead, they rely on motion
                emanating from the source to convey direction.
            </p>
            <TooltipGroup pos={topPositions} style={endStyle} />
            <CenterContainer>
                <TooltipGroup pos={leftPositions} />
                <TooltipGroup
                    pos={rightPositions}
                    style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}
                />
            </CenterContainer>
            <TooltipGroup pos={bottomPositions} style={endStyle} />
        </div>
    );
};
