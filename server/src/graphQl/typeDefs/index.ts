import { mergeTypeDefs, loadFilesSync } from 'graphql-tools';
import path from 'path';

const types = loadFilesSync(path.join(__dirname, 'types'));

export const typeDefs = mergeTypeDefs(types);
