import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const SidebarWrapper = ({ children, className, isOpened }) => {
  return (
    <Sidebar className={className} isOpened={isOpened}>
      {children}
    </Sidebar>
  );
};

const Sidebar = styled.div`
  display: ${props => props.isOpened ? "flex" : "none"};
}`;

SidebarWrapper.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  isOpened: PropTypes.bool,
};

SidebarWrapper.defaultProps = {
  children: null,
  className: '',
  isOpened: true,
}
