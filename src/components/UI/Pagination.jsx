import React from 'react';

import styled from 'styled-components';

export default props => {
  const startPage = parseInt(props.page) > 3 ? parseInt(props.page) - 2 : 1;
  const maxButtons =
    parseInt(props.nrOfPages) < 5
      ? parseInt(props.nrOfPages)
      : parseInt(props.page) > 3
      ? parseInt(props.page) + 2
      : 5;

  const items = [];
  for (let i = startPage; i <= maxButtons; i++) {
    const active = parseInt(props.page) === i ? 'active' : '';
    console.log(parseInt(props.nrOfPages), parseInt(props.postsPerPage));
    items.push(
      <PageBtn
        key={i}
        className={active}
        onClick={() => props.fetchPosts(i, parseInt(props.postsPerPage))}
      >
        {i}
      </PageBtn>
    );
  }

  return (
    <Pagination>
      <CenterBox>
        <PageBtn
          disabled={parseInt(props.page) === 1}
          onClick={() =>
            props.fetchPosts(
              parseInt(props.page) - 1,
              parseInt(props.postsPerPage)
            )
          }
        >
          Previous
        </PageBtn>
        {items}
        <PageBtn
          disabled={parseInt(props.page) === parseInt(props.nrOfPages)}
          onClick={() =>
            props.fetchPosts(
              parseInt(props.page) + 1,
              parseInt(props.postsPerPage)
            )
          }
        >
          Next
        </PageBtn>
      </CenterBox>
    </Pagination>
  );
};

const Pagination = styled.div`
  display: grid;
  position: relative;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
`;

const CenterBox = styled.div`
  margin: auto;
`;

const PageBtn = styled.button`
  display: inline-block;
  padding: 0 10px;
  background: transparent;
  border-radius: 5px;
  margin-right: 3px;
  line-height: 28px;
  color: #000;

  &:hover:enabled,
  &.active {
    color: #fff;
    background: #82b74b;
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
  }
`;
