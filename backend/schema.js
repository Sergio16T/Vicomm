const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        users: [User]!
        user: User
        getImageGallery: [MultiMedia]
        getCoverPhoto: MultiMedia
    }

    type Mutation {
        signUp(email: String!, firstName: String!, lastName: String!, password: String!): User!
        signIn(email: String!, password: String!): User!
        signOut: SuccessMessage!
        googleSignIn(firstName: String!, lastName: String!, email: String!, accessToken: String!): User!
        uploadImageToGallery(image: String!, largeImage: String!): MultiMedia!
        deleteImages(keys: [ID]): SuccessMessage!
        updateCoverPhoto(key: ID): CoverPhoto!
        removeCoverPhoto: SuccessMessage!
        createItem(title: String!, description: String!, price: Int!, salePrice: Int, weight: Float): Item!
    }

    type User {
        id: ID
        fst_nm: String!
        lst_nm: String!
        email: String!
        password_nm: String!
    }

    type Item {
        id: ID
        item_title: String!
        item_desc: String!
        price: Int!
        sale_price: Int
        item_weight: Float
        crte_by_acct_key: ID!
    }
    type MultiMedia {
        id: ID,
        mltmd_url: String!
        mltmd_lg_url: String!
        crte_by_acct_key: ID!
    }
    type SuccessMessage {
        message: String!
    }
    type CoverPhoto {
        id: ID,
        acct_key: ID,
        mltmd_key: ID,
        act_ind: Int
    }
`;

module.exports = typeDefs;