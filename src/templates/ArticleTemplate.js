import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  margin: 0 auto;
`;

const Tr = styled.tr`
  height: 35px;
  background-color: ${({ theme }) => theme.add};
`;

const Th = styled.th`
  padding-right: 5px;
  padding-left: 5px;
`;

const ArticleTemplate = ({ children, articles, accessToken }) => (
  <Table>
    <thead>
      {articles.length === 0 ? (
        <Tr>
          <Th>no articles yet</Th>
        </Tr>
      ) : (
        <Tr>
          <Th>nr</Th>
          <Th>title</Th>
          <Th>view</Th>

          {accessToken ? (
            <>
              <Th>edit</Th>
              <Th>del</Th>
            </>
          ) : null}
        </Tr>
      )}
    </thead>
    <tbody>{children}</tbody>
  </Table>
);

export default ArticleTemplate;
