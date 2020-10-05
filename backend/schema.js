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
    }

    type User {
        ACCT_KEY: ID
        FST_NAME: String!
        LST_NAME: String!
        EMAIL: String!
        PASSWORD_NM: String!
        ACCT_TYP_CD: String!
    }

    type Item {
        ITEM_KEY: ID
        ITEM_TITLE: String! 
        ITEM_DESC: String!
        IMG: String!
        LG_IMG: String!
        PRICE: Int!
        CRTE_BY_ACCT_KEY: User!
    }
    type MultiMedia {
        MLTMD_KEY: ID, 
        MLTMD_URL: String!
        MLTMD_LG_URL: String!
        SRC_TBL_KEY_CD: Int
        CRTE_BY_ACCT_KEY: Int
    }
    type SuccessMessage {
        message: String!
    }
    type CoverPhoto {
        COVER_PHOTO_KEY: ID, 
        ACCT_KEY: ID, 
        MLTMD_KEY: ID, 
        ACT_IND: Int
    }
`; 

module.exports = typeDefs; 