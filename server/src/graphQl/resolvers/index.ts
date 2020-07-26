import merge from 'lodash.merge';
import { accountResolvers } from './account';
import { crewResolvers } from './crew';
import { employeeResolvers } from './employee';
import { jobResolvers } from './job';
import { jobLogResolvers } from './joblog';
import { ranchResolvers } from './ranch';

export const resolvers = merge(
  accountResolvers,
  crewResolvers,
  employeeResolvers,
  jobLogResolvers,
  jobResolvers,
  ranchResolvers,
);
