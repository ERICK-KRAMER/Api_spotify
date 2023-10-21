import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align:center;
  gap: 1rem;
  img {
    padding: 1rem;
    width: 300px;
    border-radius: 30px;
    cursor: pointer;
  }
  &:first-child {
    img {
      width: 500px;
      background-color: red;
    }
  }
`;
export const Content = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  gap: .5rem
`;
