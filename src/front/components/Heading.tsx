import styled from '@emotion/styled';

const getFontSizeByLevel = ({ level }) => {
  switch (level) {
    case 2:
      return '2rem';
    case 3:
      return '1.5rem';
    default:
      return '4rem';
  }
};

const getFontWeightByLevel = ({ level }) => {
  switch (level) {
    case 2:
      return 'lighter';
    default:
      return 'bold';
  }
};

const getLetterSpacingByLevel = ({ level }) => {
  switch (level) {
    case 2:
      return '10px';
    default:
      return null;
  }
};

type HeadingProps = {
  level: number;
};

const Heading = styled('h1')<HeadingProps>`
  font-family: Helvetica, Open-Sans;
  font-weight: ${getFontWeightByLevel};
  margin: 10px;
  letter-spacing: ${getLetterSpacingByLevel};
  font-size: ${getFontSizeByLevel};
`;

export default Heading;
