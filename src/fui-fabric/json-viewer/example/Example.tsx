import * as React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { LabeledSelect } from "SHB/jedi/base/kit/reactComponents/form/LabeledSelect/LabeledSelect";
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
                <LabeledSelect
                    label="Theme"
                    name="labeledHelpText"
                    value={themeType}
                    options={Object.keys(Themes).map(theme => ({ value: theme, label: theme }))}
                    valueChange={(_, value: string) => setThemeType(value)}
                />
                <br />
                <LabeledSelect
                    label="Tab Size"
                    name="tab-size"
                    value={tabSize.toString()}
                    options={[
                        { value: 2, label: "2" },
                        { value: 4, label: "4" },
                        { value: 6, label: "6" },
                    ]}
                    valueChange={(_, value: string) => setTabSize(parseInt(value, 10))}
                />
            </Settings>
        </Wrapper>
    );
};

export { JsonViewerExample };
