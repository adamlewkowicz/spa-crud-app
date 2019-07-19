import React from 'react';
import css from './style.scss';
import { applyCss } from '../../common/utils';

export const Table = ({
  children,
  thead,
  className,
}) => (
  <table {...applyCss(css.container, className)}>
    {thead && <thead>{thead}</thead>}
    {children}
  </table>
);

export const Thead = ({ children }) => (
  <thead {...applyCss()}>
    {children}
  </thead>
);

export const Tr = ({
  className,
  ...props
}) => (
  <tr
    {...applyCss(css.row, className)}
    {...props}
  />
);

export const Td = ({
  align = 'center',
  className,
  ...props
}) => (
  <td
    {...applyCss(
      css.col,
      css[`align_${align}`],
      className
    )}
    {...props}
  />
);

export const Th = ({
  align = 'center',
  className,
  ...props
}) => (
  <th
    {...applyCss(
      css.col_head,
      css[`align_${align}`],
      className
    )}
    {...props}
  />
);