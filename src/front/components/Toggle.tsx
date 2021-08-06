import React, { ChangeEventHandler, FunctionComponent } from 'react';
import styled from '@emotion/styled';

const StyledCheckbox = styled('input')`
  line-height: 2rem;
`;

type ToggleProps = {
  className?: string;
  id?: string;
  checked: boolean;
  onChange: ChangeEventHandler;
};

const Toggle: FunctionComponent<ToggleProps> = ({
  id,
  className,
  checked,
  onChange,
}) => (
  <StyledCheckbox
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onChange}
    className={className}
  />
);

export default Toggle;
