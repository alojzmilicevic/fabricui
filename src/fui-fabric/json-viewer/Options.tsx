import styled from '@emotion/styled';
import { TransitionDelayed } from '../../components/transitions/TransitionDelay';

const Wrapper = styled.div(() => ({
    position: 'sticky',
    display: 'flex',
    flexDirection: 'column',
    right: 0,
    padding: '8px 0',
}));

const Options = ({ rowCount, hovered }: OptionsProps) => {
    const data = Array.from({ length: rowCount });

    return (
        <Wrapper>
            {data.map((_, index) => (
                <TransitionDelayed shouldShow={index === hovered}>
                    <button
                        style={{
                            fontSize: 12,
                            color: '#bdbdbd',
                            height: 25.6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                        }}>
                        abc
                    </button>
                </TransitionDelayed>
            ))}
        </Wrapper>
    );
};

type OptionsProps = {
    rowCount: number;
    hovered: number;
};

export { Options };
