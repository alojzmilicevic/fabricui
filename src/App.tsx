import styled from '@emotion/styled';
import { JsonViewer } from './fui-fabric/json-viewer/JsonViewer';
import { complexTestJson } from './fui-fabric/json-viewer/test/testData';
import { TransitionDelayed } from './components/transitions/TransitionDelay';

const MainWrapper = styled.div`
    display: flex;
    height: 100vh;
    background-color: white;
    justify-content: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 744px;
    padding: 20px;
    align-items: center;
`;

function App() {
    return (
        <MainWrapper>
            <Content>
                <JsonViewer json={complexTestJson} />
            </Content>
        </MainWrapper>
    );
}

export default App;
