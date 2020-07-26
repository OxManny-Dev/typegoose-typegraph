import { gql } from 'apollo-server-express';

export default gql`
  type Crew {
    id: String!
    crewName: String!
    account: Account!
    crewMembers: [Employee]!
    jobs: [Job]!
    jobLogs: [JobLog]!
    ranches: [Ranch]!
    fields: [Field]!
  },
  
  type Query {
    crews: [Account]!
    crew(id: String): Crew!
  }

  input CreateCrewInput {
    name: String!
  }

  input AddCrewMemberInput {
    crewId: String!
    employeeId: String!
  }

  type Mutation {
    CreateCrew(input: CreateCrewInput): Crew!
    AddCrewMember(input: AddCrewMemberInput): Crew!
  }
`;
