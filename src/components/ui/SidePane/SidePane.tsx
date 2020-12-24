import React from 'react';
import ReactSlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './SidePane.css';

type Props = {
  children: React.ReactNode | null;

  isOpen?: boolean;
};

export default function SidePane({
  children,
  isOpen = false,
  ...props
}: Props) {
  return (
    <ReactSlidingPane
      isOpen={isOpen}
      hideHeader
      shouldCloseOnEsc={false}
      width="35%"
      onRequestClose={() => {}}
      {...props}
    >
      {children}
    </ReactSlidingPane>
  );
}
