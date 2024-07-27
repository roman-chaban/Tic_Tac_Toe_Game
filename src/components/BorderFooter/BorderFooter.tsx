import styled from 'styled-components';

const BoardFooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  background: orange;
  padding: 20px;
  color: #fff;
`;

export const BoardFooter = () => {
  return (
    <BoardFooterContainer>Owner: Roman Chaban &copy;</BoardFooterContainer>
  );
};
