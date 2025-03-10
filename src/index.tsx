import { createRoot } from 'react-dom/client';
const root = document.getElementById('root');
import React from 'react';

if (!root) {
  throw new Error('Root was not found');
}

const container = createRoot(root);
container.render(<div>Hello world</div>);
