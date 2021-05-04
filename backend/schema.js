const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        users: [User]!
        user: User
        getImageGallery: [MultiMedia]
        getCoverPhoto: MultiMedia
        getItem(uid: String!): Item
        getProductItems(page: Int!): ProductItemsResponse
        productItemsAggregate: AggregateItem
    }

    type Mutation {
        signUp(email: String!, firstName: String!, lastName: String!, password: String!): User!
        signIn(email: String!, password: String!): User!
        signOut: SuccessMessage!
        googleSignIn(tokenId: String!): User!
        uploadImageToGallery(image: String!, largeImage: String!): MultiMedia!
        deleteImages(keys: [ID]): Keys!
        updateCoverPhoto(key: ID): CoverPhoto!
        removeCoverPhoto: SuccessMessage!
        createItem(name: String!, price: Float!, salePrice: Float, weight: Float, description: String, productImages: [ProductImage]): Item!
        updateItem(id: ID!, name: String!, price: Float!, salePrice: Float, weight: Float, description: String, productImages: [ProductImage]): ProductItem!
    }

    # update schema to not expose my DB schema table names
    type User {
        id: ID
        fst_nm: String!
        lst_nm: String!
        email: String!
        password_nm: String!
    }

    type Item {
        id: ID!
        item_uid: String!
        item_title: String!
        item_desc: String
        price: Int!
        sale_price: Int
        item_weight: Float
        multimedia: [MultiMedia]
        crte_tm: String
    }

    type ProductItemsResponse {
        result: [ProductItem]
        count: Int!
    }

    type ProductItem { # relationship to item with additional fields may be a good idea to create an interface
        id: ID!
        item_uid: String!
        item_title: String!
        item_desc: String
        price: Int!
        sale_price: Int
        item_weight: Float
        mltmd_url: String
    }

    type MultiMedia {
        id: ID,
        mltmd_url: String!
        mltmd_lg_url: String!
        multimedia_xref_id: ID,
    }

    input ProductImage {
        id: ID,
        multimediaUrl: String
        multimediaXrefId: ID,
        displayCount: Int
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

    type Keys {
        keys: [ID!]!
    }

    type AggregateItem {
        count: Int!
    }
`;

module.exports = typeDefs;