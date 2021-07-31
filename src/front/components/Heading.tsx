import styled from '@emotion/styled';

const getFontSizeByLevel = ({ level }) => {
  switch (level) {
    case 2:
      return '3rem';
    case 3:
      return '2rem';
    default:
      return '5rem';
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

type HeadingProps = {
  level: number;
};

const Heading = styled('h1')<HeadingProps>`
  font-family: Helvetica, Open-Sans;
  font-weight: ${getFontWeightByLevel};
  margin: 10px;
  font-size: ${getFontSizeByLevel};
`;

export default Heading;
