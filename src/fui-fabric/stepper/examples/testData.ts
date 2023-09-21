import { StepInfo } from "../components/Step/Step";

export const stepsTestData: StepInfo[] = [
    {
        label: "Published",
        description: "Kuvertet har publicerats",
    },
    {
        label: "Pending",
        description: "Kuvertet inväntar signering från kund",
    },
    {
        label: "Signed",
        description: "Kuvertet har signerats",
    },
    {
        label: "Completed_by_Verified",
        description: "Kuvertet har markerats som slutfört av Verified och är redo för nedladdning",
    },
    {
        label: "Downloaded",
        description: "Kuvertet har laddats ned av nedladdningstjänsten för behandling",
    },
    {
        label: "Archived",
        description: "Kuvertet är bekräftat arkiverat i ADHA och är till fullo hanterat",
    },
];
