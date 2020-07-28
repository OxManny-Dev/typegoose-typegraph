import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Account of the User */
export type Account = {
  __typename?: 'Account';
  id?: Maybe<Scalars['String']>;
  admin: Employee;
  employees?: Maybe<Array<Employee>>;
  jobs?: Maybe<Array<Job>>;
  crews?: Maybe<Array<Crew>>;
};

export type CreateCrewInput = {
  crewName?: Maybe<Scalars['String']>;
};

export type CreateEmployeeInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type CreateJobInput = {
  jobName: Scalars['String'];
};

/** The different crews of the account */
export type Crew = {
  __typename?: 'Crew';
  id?: Maybe<Scalars['String']>;
  crewName?: Maybe<Scalars['String']>;
  account?: Maybe<Account>;
  crewMembers?: Maybe<Array<Employee>>;
  jobs?: Maybe<Array<Job>>;
};

/** A User or Employee of the program */
export type Employee = {
  __typename?: 'Employee';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  account?: Maybe<Account>;
  jobs?: Maybe<Array<Job>>;
  crews?: Maybe<Array<Crew>>;
  logOut?: Maybe<Scalars['Boolean']>;
};

/** The job model */
export type Job = {
  __typename?: 'Job';
  id?: Maybe<Scalars['String']>;
  jobName?: Maybe<Scalars['String']>;
  employees: Array<Employee>;
  crews?: Maybe<Array<Crew>>;
  account?: Maybe<Account>;
  pay: Scalars['Float'];
  pieces: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEmployee: Employee;
  signUp: Employee;
  signIn: Employee;
  signOut: Employee;
  createJob: Job;
  createCrew: Crew;
};


export type MutationCreateEmployeeArgs = {
  createEmployeeInput: CreateEmployeeInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};


export type MutationSignInArgs = {
  signInInput?: Maybe<SignInInput>;
};


export type MutationCreateJobArgs = {
  createJobInput: CreateJobInput;
};


export type MutationCreateCrewArgs = {
  createCrewInput: CreateCrewInput;
};

export type Query = {
  __typename?: 'Query';
  fetchEmployees: Array<Employee>;
  fetchJobs: Array<Job>;
  fetchCrews: Array<Crew>;
};

export type SignInInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type SignUpInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CreateCreateMutationVariables = Exact<{
  input: CreateCrewInput;
}>;


export type CreateCreateMutation = (
  { __typename?: 'Mutation' }
  & { createCrew: (
    { __typename?: 'Crew' }
    & Pick<Crew, 'crewName'>
  ) }
);

export type CreateEmployeeMutationVariables = Exact<{
  input: CreateEmployeeInput;
}>;


export type CreateEmployeeMutation = (
  { __typename?: 'Mutation' }
  & { createEmployee: (
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'firstName' | 'lastName' | 'email' | 'role'>
    & { account?: Maybe<(
      { __typename?: 'Account' }
      & Pick<Account, 'id'>
    )> }
  ) }
);

export type CreateJobMutationVariables = Exact<{
  input: CreateJobInput;
}>;


export type CreateJobMutation = (
  { __typename?: 'Mutation' }
  & { createJob: (
    { __typename?: 'Job' }
    & Pick<Job, 'id' | 'jobName'>
  ) }
);

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'email' | 'token'>
  ) }
);

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & { signOut: (
    { __typename?: 'Employee' }
    & Pick<Employee, 'logOut'>
  ) }
);

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'email' | 'token'>
  ) }
);

export type FetchCrewsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCrewsQuery = (
  { __typename?: 'Query' }
  & { fetchCrews: Array<(
    { __typename?: 'Crew' }
    & Pick<Crew, 'crewName'>
    & { crewMembers?: Maybe<Array<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName'>
    )>> }
  )> }
);

export type FetchEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchEmployeesQuery = (
  { __typename?: 'Query' }
  & { fetchEmployees: Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'firstName' | 'lastName' | 'email' | 'role'>
  )> }
);

export type FetchJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchJobsQuery = (
  { __typename?: 'Query' }
  & { fetchJobs: Array<(
    { __typename?: 'Job' }
    & Pick<Job, 'id' | 'jobName'>
    & { employees: Array<(
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName' | 'email'>
    )> }
  )> }
);


export const CreateCreateDocument = gql`
    mutation createCreate($input: CreateCrewInput!) {
  createCrew(createCrewInput: $input) {
    crewName
  }
}
    `;
export type CreateCreateMutationFn = ApolloReactCommon.MutationFunction<CreateCreateMutation, CreateCreateMutationVariables>;

/**
 * __useCreateCreateMutation__
 *
 * To run a mutation, you first call `useCreateCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCreateMutation, { data, loading, error }] = useCreateCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCreateMutation, CreateCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCreateMutation, CreateCreateMutationVariables>(CreateCreateDocument, baseOptions);
      }
export type CreateCreateMutationHookResult = ReturnType<typeof useCreateCreateMutation>;
export type CreateCreateMutationResult = ApolloReactCommon.MutationResult<CreateCreateMutation>;
export type CreateCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCreateMutation, CreateCreateMutationVariables>;
export const CreateEmployeeDocument = gql`
    mutation createEmployee($input: CreateEmployeeInput!) {
  createEmployee(createEmployeeInput: $input) {
    id
    firstName
    lastName
    email
    role
    account {
      id
    }
  }
}
    `;
export type CreateEmployeeMutationFn = ApolloReactCommon.MutationFunction<CreateEmployeeMutation, CreateEmployeeMutationVariables>;

/**
 * __useCreateEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeMutation, { data, loading, error }] = useCreateEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEmployeeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(CreateEmployeeDocument, baseOptions);
      }
export type CreateEmployeeMutationHookResult = ReturnType<typeof useCreateEmployeeMutation>;
export type CreateEmployeeMutationResult = ApolloReactCommon.MutationResult<CreateEmployeeMutation>;
export type CreateEmployeeMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>;
export const CreateJobDocument = gql`
    mutation createJob($input: CreateJobInput!) {
  createJob(createJobInput: $input) {
    id
    jobName
  }
}
    `;
export type CreateJobMutationFn = ApolloReactCommon.MutationFunction<CreateJobMutation, CreateJobMutationVariables>;

/**
 * __useCreateJobMutation__
 *
 * To run a mutation, you first call `useCreateJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobMutation, { data, loading, error }] = useCreateJobMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJobMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateJobMutation, CreateJobMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateJobMutation, CreateJobMutationVariables>(CreateJobDocument, baseOptions);
      }
export type CreateJobMutationHookResult = ReturnType<typeof useCreateJobMutation>;
export type CreateJobMutationResult = ApolloReactCommon.MutationResult<CreateJobMutation>;
export type CreateJobMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateJobMutation, CreateJobMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($input: SignInInput!) {
  signIn(signInInput: $input) {
    id
    email
    token
  }
}
    `;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation signOut {
  signOut {
    logOut
  }
}
    `;
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        return ApolloReactHooks.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, baseOptions);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($input: SignUpInput!) {
  signUp(signUpInput: $input) {
    id
    email
    token
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const FetchCrewsDocument = gql`
    query fetchCrews {
  fetchCrews {
    crewName
    crewMembers {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useFetchCrewsQuery__
 *
 * To run a query within a React component, call `useFetchCrewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCrewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCrewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchCrewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FetchCrewsQuery, FetchCrewsQueryVariables>) {
        return ApolloReactHooks.useQuery<FetchCrewsQuery, FetchCrewsQueryVariables>(FetchCrewsDocument, baseOptions);
      }
export function useFetchCrewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchCrewsQuery, FetchCrewsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FetchCrewsQuery, FetchCrewsQueryVariables>(FetchCrewsDocument, baseOptions);
        }
export type FetchCrewsQueryHookResult = ReturnType<typeof useFetchCrewsQuery>;
export type FetchCrewsLazyQueryHookResult = ReturnType<typeof useFetchCrewsLazyQuery>;
export type FetchCrewsQueryResult = ApolloReactCommon.QueryResult<FetchCrewsQuery, FetchCrewsQueryVariables>;
export const FetchEmployeesDocument = gql`
    query fetchEmployees {
  fetchEmployees {
    id
    firstName
    lastName
    email
    role
  }
}
    `;

/**
 * __useFetchEmployeesQuery__
 *
 * To run a query within a React component, call `useFetchEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchEmployeesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FetchEmployeesQuery, FetchEmployeesQueryVariables>) {
        return ApolloReactHooks.useQuery<FetchEmployeesQuery, FetchEmployeesQueryVariables>(FetchEmployeesDocument, baseOptions);
      }
export function useFetchEmployeesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchEmployeesQuery, FetchEmployeesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FetchEmployeesQuery, FetchEmployeesQueryVariables>(FetchEmployeesDocument, baseOptions);
        }
export type FetchEmployeesQueryHookResult = ReturnType<typeof useFetchEmployeesQuery>;
export type FetchEmployeesLazyQueryHookResult = ReturnType<typeof useFetchEmployeesLazyQuery>;
export type FetchEmployeesQueryResult = ApolloReactCommon.QueryResult<FetchEmployeesQuery, FetchEmployeesQueryVariables>;
export const FetchJobsDocument = gql`
    query fetchJobs {
  fetchJobs {
    id
    jobName
    employees {
      firstName
      lastName
      email
    }
  }
}
    `;

/**
 * __useFetchJobsQuery__
 *
 * To run a query within a React component, call `useFetchJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchJobsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FetchJobsQuery, FetchJobsQueryVariables>) {
        return ApolloReactHooks.useQuery<FetchJobsQuery, FetchJobsQueryVariables>(FetchJobsDocument, baseOptions);
      }
export function useFetchJobsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FetchJobsQuery, FetchJobsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FetchJobsQuery, FetchJobsQueryVariables>(FetchJobsDocument, baseOptions);
        }
export type FetchJobsQueryHookResult = ReturnType<typeof useFetchJobsQuery>;
export type FetchJobsLazyQueryHookResult = ReturnType<typeof useFetchJobsLazyQuery>;
export type FetchJobsQueryResult = ApolloReactCommon.QueryResult<FetchJobsQuery, FetchJobsQueryVariables>;