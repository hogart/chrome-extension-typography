import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const entry = process.env.ENTRY;
const prod = process.env.PROD === 'true';

const plugins = [
    nodeResolve({
        jsnext: true,
        main: true,
    }),
    commonjs(),
];

export default {
    entry: `js/${entry}.js`,
    dest: `dist/${entry}.js`,

    format: `iife`,

    plugins,

    sourceMap: !prod,
}