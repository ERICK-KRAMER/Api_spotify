import styled from "styled-components"; 

export const Body = styled.body`
display: flex;
justify-content: center;
align-items: center;
`

export const DivImage = styled.div`
background-color: red;
width: 500px;
height: 500px;
border-radius: 50%;
`

export const Div = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 3rem;
`

export const Button = styled.button`
 height: 40px;
 width: 300px;
 font-size: large;
 border-radius: 5px;
 border: none;
 transition: 0.5s ease;
 box-shadow: 1px 1px 3px lightgray; 
 a{
    color: black;
    text-decoration: none;
 }
 &:hover{
    background-color: red;
    transform: scale(1.1); 
 }
`