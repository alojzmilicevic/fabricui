import styled from '@emotion/styled';

const ProgressBar = styled.div`
    position: relative;
    width: 100%;
    height: 4px;
    background-color: #90caf9; /* Lighter blue background */
    overflow: hidden;
`;

const MovingBar = styled.div`
    position: absolute;
    width: 50%;
    height: 100%;
    background-color: #0d47a1; /* Dark blue moving bar */
    animation: indeterminate 1.25s infinite ease-out; /* Updated duration and timing function */

    @keyframes indeterminate {
        0% {
            transform: translate3d(-100%, 0, 0);
        }
        100% {
            transform: translate3d(100%, 0, 0);
        }
    }
`;

const LinearProgress = () => (
    <ProgressBar>
        <MovingBar />
    </ProgressBar>
);

export { LinearProgress };
