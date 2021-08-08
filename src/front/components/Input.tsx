import styled from '@emotion/styled';
import theme from '../theme';

const Input = styled('input')`
  padding: 0.5rem 1rem;
  background-color: black;
  color: ${theme.colors.white};
  font-weight: bold;
  margin: 1rem;
  border-radius: 2px;
  border: solid 1px ${theme.colors.gray};
  flex: 1;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 5px 0;
  }
`;

export default Input;
