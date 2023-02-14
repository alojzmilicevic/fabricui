import { useState } from "react";
import styled from "@emotion/styled";
import { Themes } from "../theme";
import { complexTestJson } from "../test/testData";
import { JsonViewer } from "../JsonViewer";

const Wrapper = styled.div`
    background-color: white;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Settings = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    color: black;
`;

const JsonViewerExample = () => {
    const [themeType, setThemeType] = useState(Themes.AtomOneDark);
    const [tabSize, setTabSize] = useState(4);
    const [json] = useState(complexTestJson);

    return (
        <Wrapper>
            <JsonViewer json={json} tabSize={tabSize} themeType={themeType} />
            <Settings>
                <p className={"shb-title-3"}>Settings</p>
            </Settings>
        </Wrapper>
    );
};

export { JsonViewerExample };
