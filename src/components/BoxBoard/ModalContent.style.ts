import styled from "@emotion/styled";

export const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 90%;

  color: white;
  background-color: rgba(0, 0, 0, .3);
  line-height: 2;
  text-align: center;

  > button {
    padding: 10px 20px;
    color: black;
    background-color: white;
    vertical-align: middle;
    border-radius: 10px;
    font-size: 2rem;
    cursor: pointer;
  }
`;