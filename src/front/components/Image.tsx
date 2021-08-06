import React, { FunctionComponent, MouseEventHandler } from 'react';
import styled from '@emotion/styled';

export enum SizeEnum {
  LARGE,
  MEDIUM,
  SMALL,
}

const getBorderRadius = ({ round }) => (round ? '50%' : 0);

const getSize = ({ size }) => {
  switch (size) {
    case SizeEnum.LARGE:
      return '20rem';
    case SizeEnum.MEDIUM:
      return '10rem';
    case SizeEnum.SMALL:
      return '5rem';
    default:
      return '10rem';
  }
};

type StyledPictureProps = {
  round: boolean;
  size: SizeEnum;
};

const StyledPicture = styled('img')<StyledPictureProps>`
  border-radius: ${getBorderRadius};
  height: ${getSize};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : null)};
`;

type PictureProps = {
  alt: string;
  onClick?: MouseEventHandler;
  round?: boolean;
  size?: SizeEnum;
  src: string;
  className?: string;
};

const Picture: FunctionComponent<PictureProps> = ({
  alt,
  onClick,
  round = false,
  size = SizeEnum.MEDIUM,
  src,
  className,
}) => (
  <StyledPicture
    alt={alt}
    onClick={onClick}
    round={round}
    size={size}
    src={src}
    className={className}
  />
);

export default Picture;
