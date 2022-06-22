import styled from "styled-components";

export const Wrapper = styled.div`
    margin-top: 100px;
    margin-bottom: 60px;
`

export const Spacer = styled.div`
    height: 40px;
`

export const MyHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    background-color: cyan;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
`

export const MyFooter = styled.footer`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: cyan;
    color: white;
    text-align: center;    
    justify-content: center;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
`

export const MainText = styled.p`
    font-size: 24px; 
`