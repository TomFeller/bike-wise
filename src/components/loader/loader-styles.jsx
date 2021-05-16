import styled, {keyframes} from "styled-components";

const  Spin = keyframes`
          to {transform: rotate(360deg);}

    `;
const LoaderStyle = styled.div`
    position: relative;
    padding: ${props => props.padding};
   height: ${props => props.size}px;
    &:before {
        content: '';
        box-sizing: border-box;
        position: absolute; 
        top: 50%;
        left: 50%;
        width: ${props => props.size || 15}px;
        height: ${props => props.size || 15}px;
        margin-top: -${props => props.size / 2}px;
        margin-left: -${props => props.size / 2}px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-top-color: ${props => props.color};
        border-bottom-color: ${props => props.color};
        animation: ${Spin} .8s ease infinite;
    }
`;

export {LoaderStyle, Spin};