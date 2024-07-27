import styled from 'styled-components';
import { colors } from '../../constants/colors';

const BoardFooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  background: ${colors.success};
  padding: 20px;
  color: #fff;
`;

export const BoardFooter = () => {
  return (
    <BoardFooterContainer>Owner: Roman Chaban &copy;</BoardFooterContainer>
  );
};
