const { gql } = require('apollo-server-express');

module.exports.typeDefs = gql`
    type Query {
        students: [Student!]
        groups: [Group!]
    }

    type Mutation {
        createStudent(fullName: String!, email: String!, age: Int!): Student!
        createGroup(name: String!, code: String!): Boolean!
    }

    type Student {
        id: ID!
        fullName: String!
        email: String!
        age: Int!
    }

    type Group {
        id: ID!
        name: String!
        code: String!
        students: [Student!]
    }
`;