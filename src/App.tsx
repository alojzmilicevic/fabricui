import { useState } from 'react';
import { Tooltip } from './fui-fabric/tooltip/Tooltip';
import styled from '@emotion/styled';

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
`;

function App() {
    return (
        <MainWrapper>
            <Tooltip title="tooltip" position="left">
                <div style={{ backgroundColor: 'red', maxWidth: 100, padding: 16, color: 'white' }}>hello</div>
            </Tooltip>
        </MainWrapper>
    );
}

export default App;
