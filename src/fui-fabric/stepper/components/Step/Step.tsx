import * as React from 'react';
import { ReactElement } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const StepConnector = styled.span(() => ({
    marginLeft: 12,
    display: 'block',
    minHeight: 24,
    borderColor: '#bdbdbd',
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
}));

const Step = ({
    index = 0,
    onClick = () => true,
    children,
    last = false,
    active = false,
    completed = false,
}: StepProps) => {
    const disabled = !completed && !active;
    const childrenArray = React.Children.toArray(children).filter(Boolean);

    const steps = childrenArray.map(child => {
        const el = child as ReactElement;
        return React.cloneElement(el, {
            index,
            disabled,
            onClick,
            last,
            active,
            completed,
            ...el.props,
        });
    });

    return (
        <Wrapper>
            {steps}
            {!last && <StepConnector />}
        </Wrapper>
    );
};

export type StepProps = {
    active?: boolean;
    completed?: boolean;
    last?: boolean;
    index?: number;
    onClick?: () => void;
    children: React.ReactNode;
};

export type StepInfo = { label: string; description: string };

export { Step };
