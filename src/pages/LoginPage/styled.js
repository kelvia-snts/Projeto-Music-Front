import styled from "styled-components"

export const Section = styled.section`
  button{
    width: 70%;
    margin: auto;
  }
`

export const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  >button{
    width: 30vw;
  }
  >span{
    margin-top: 20vh;
  }
  @media (max-width: 600px) {
    >button{
      width: 50vw;
    }
  }
`