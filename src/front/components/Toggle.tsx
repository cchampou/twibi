import React from 'react';
import styled from '@emotion/styled';

const StyledCheckbox = styled('input')`
  line-height: 2rem;
`;

const Toggle = ({ id, className, checked, onChange }) => (
  <StyledCheckbox
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onChange}
    className={className}
  />
);

export default Toggle;
