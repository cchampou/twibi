import styled from '@emotion/styled';
import theme from '../theme';

const Button = styled('button')`
  border: none;
  padding: 0.5rem 1rem;
  margin: 24px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-weight: bold;
`;

export default Button;
