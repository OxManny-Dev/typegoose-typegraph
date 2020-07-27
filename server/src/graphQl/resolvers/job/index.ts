import {
  Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware,
} from 'type-graphql';
import { validate, ValidationError } from 'class-validator';

import { Context } from '../../../lib/types';

import { CreateJobInput } from '../../inputTypes/jobInput';

import { AuthenticateEmployee } from '../../gqlMiddleware/authenticate';
import { validateInput } from '../../../lib/utils/validateInput';

import { Employee as GqlEmployee, Job as GqlJob } from '../../Entities';
@Resolver((_of) => GqlJob)
export class JobResolver {
  @Query((_returns) => [GqlJob])
  @UseMiddleware(AuthenticateEmployee)
  async fetchJobs(
    @Ctx() { req, EmployeeModel }: Context,
  ): Promise<GqlJob[] | null> {
    console.log('fetching');
    try {
      const employeeAccount = await EmployeeModel.getAuthEmployeeAccount(req.signedCookies.loggedInEmployee);
      if (employeeAccount) {
        const jobs = await employeeAccount.getJobs();
        console.log('i am jobs', jobs);
        return jobs.jobs;
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
    return null;
  }

  @Mutation((_returns) => GqlJob)
  @UseMiddleware(AuthenticateEmployee)
  async createJob(
    @Arg('createJobInput') createJobInput: CreateJobInput,
    @Ctx() { req, EmployeeModel, JobModel }: Context,
  ): Promise<GqlJob | null> {
    console.log('hitting');
    try {
      await validateInput(validate, createJobInput);
    } catch (e) {
      console.log('Error input');
      throw new Error(e);
    }

    try {
      // Get account of employee
      const employeeAccount = await EmployeeModel.getAuthEmployeeAccount(req.signedCookies.loggedInEmployee);
      const newJob = await new JobModel({ ...createJobInput, account: employeeAccount.id });
      // Wants you yo save first then create
      if (newJob) {
        await newJob.save();
        employeeAccount.jobs.push(newJob);
        await employeeAccount.save();
        return newJob;
      }
    } catch (e) {
      console.log('creating job error', e);
      throw new Error(e);
    }
    return null;
  }

  @FieldResolver()
  id(@Root() currentEmployee: GqlEmployee) {
    return currentEmployee._id.toString();
  }
}
