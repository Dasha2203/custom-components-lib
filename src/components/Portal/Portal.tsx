import { createPortal } from 'react-dom';
import { PortalProps } from './types';

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const Portal = ({
  children,
  wrapperId = 'react-portal-wrapper',
}: PortalProps) => {
  let element = document.getElementById(wrapperId);

  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }
  return createPortal(children, element);
};

export default Portal;
