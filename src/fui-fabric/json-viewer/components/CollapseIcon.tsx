import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type CollapseIconProps = {
    collapsed: boolean;
    hovered: boolean;
    isCollapsible: boolean;
    onCollapseRow: () => void;
};

const StyledCollapse = styled.div<{ hovered: boolean; isCollapsible: boolean; collapsed: boolean }>(
    ({ isCollapsible, hovered, collapsed }) => ({
        width: 20,
        height: 20,
        opacity: 0,
        transitionProperty: 'opacity',
        transitionDuration: '.25s',
        ...(!isCollapsible && {
            visibility: 'hidden',
        }),
        ...(hovered && {
            opacity: '.99',
            cursor: 'pointer',
        }),
        ...(collapsed && {
            transform: 'rotate(-90deg)',
        }),
    })
);

const CollapseIcon = ({ collapsed, hovered, isCollapsible, onCollapseRow }: CollapseIconProps) => (
    <StyledCollapse onClick={onCollapseRow} hovered={hovered} isCollapsible={isCollapsible} collapsed={collapsed}>
        <ExpandMoreIcon style={{ width: 20, height: 20, color: '#616161' }} />
    </StyledCollapse>
);

export { CollapseIcon };
