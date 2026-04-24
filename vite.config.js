import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const externalPackages = [
  'react',
  'react-dom',
  'prop-types',
  'd3-array',
  'd3-chord',
  'd3-color',
  'd3-format',
  'd3-scale',
  'd3-selection',
  'd3-shape',
];

const externalRE = new RegExp(
  `^(${externalPackages.join('|')})(/.*)?$`,
);

const external = (id) => externalRE.test(id);

const globals = (id) => {
  if (id === 'react' || id.startsWith('react/')) return 'React';
  if (id === 'react-dom' || id.startsWith('react-dom/')) return 'ReactDOM';
  if (id === 'prop-types') return 'PropTypes';
  if (id.startsWith('d3-')) return 'd3';
  return undefined;
};

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactChordDiagram',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'react-chord-diagram.js';
        if (format === 'cjs') return 'react-chord-diagram.cjs';
        return 'react-chord-diagram.umd.js';
      },
    },
    sourcemap: true,
    rollupOptions: {
      external,
      output: {
        globals,
      },
    },
  },
});
