import { getOppositeOrDefault, isBracket, Token } from "../jsonTokenizer";
import styled from "@emotion/styled";

const StyledToken = styled.div((props: { color: string }) => ({
    margin: 0,
    display: "inline",
    color: props.color,
}));

type TokenProps = {
    token: Token;
    collapsed: boolean;
    color: string;
};

const TokenComponent = ({ token, collapsed, color }: TokenProps) => {
    let value = token.value;

    if (collapsed && isBracket(token.type)) {
        value = `${token.value}...${getOppositeOrDefault(token.value)}`;
    }

    return <StyledToken color={color}>{value}</StyledToken>;
};

export { TokenComponent };
