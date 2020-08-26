import React from 'react';
import styled from 'styled-components';
import { NavLogo } from '../TopBanner.tsx/NavBar';

const ListItemTap = styled.div<{
  color?: string;
}>`
  display: flex;
  font-size: 1.2rem;
  padding: 0 15px;
  font-weight: 600;
  transition: color 0.25s;
  cursor: pointer;

  color: ${props => props.color};
  ${hover =>
    hover &&
    `
    ${NavLogo}:hover & {
      color: black;
    }
`}
`;

export type ListItemProps = {
  items: string;
  color?: string;
};

function ListItem(props: ListItemProps) {
  return <ListItemTap {...props}>{props.items}</ListItemTap>;
}

export default ListItem;
