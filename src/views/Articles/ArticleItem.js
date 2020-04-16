import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import removeIcon from 'assets/icons/rubbish-bin.svg';
import penIcon from 'assets/icons/pen.svg';
import infoIcon from 'assets/icons/info.svg';
import PropTypes from 'prop-types';

const Tr = styled.tr`
  height: 35px;
  background-color: ${({ theme }) => theme.cancel};
`;

const Td = styled.td`
  padding-right: 5px;
  padding-left: 5px;
  color: ${({ theme }) => theme.grey100};
`;
const StyledButtonIcon = styled(ButtonIcon)`
  cursor: pointer;
  margin: 0 auto;
  display: block;
`;

function ArticleItem({ article, index, onDelete, onEdit, accessToken }) {
  const { title, slug } = article;
  const style = { width: '15px' };

  return (
    <Tr>
      <Td style={style}>{index + 1}.</Td>
      <Td>{title}</Td>
      <Td style={style}>
        <Link to={`/articles/${slug}`}>
          <StyledButtonIcon icon={infoIcon} info />
        </Link>
      </Td>
      {accessToken ? (
        <>
          <Td style={style}>
            <StyledButtonIcon disabled={!accessToken} onClick={onEdit} icon={penIcon} edit />
          </Td>
          <Td style={style}>
            <StyledButtonIcon disabled={!accessToken} onClick={onDelete} icon={removeIcon} del />
          </Td>
        </>
      ) : null}
    </Tr>
  );
}

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleItem;
