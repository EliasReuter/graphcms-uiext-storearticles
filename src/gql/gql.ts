import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query GetStoreArticles {
    articles {
      name
      articleId
    }
    stores {
      storeId
      name
    }
    storeArticles {
      storeId
      articleId
      article {
        name
      }
      store {
        name
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  query GetStoreArticles {
    storeArticles {
      storeId
      articleId
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation (
    $articleId: Int!
    $ageRestriction: Int!
    $price: Int!
    $name: String!
    $description: String!
  ) {
    createArticle(
      data: {
        articleId: $articleId
        ageRestriction: $ageRestriction
        price: $price
        name: $name
        description: $description
      }
    ) {
      id
    }
  }
`;

export const CREATE_STOREARTICLES = gql`
  mutation ($articleId: Int!, $storeId: Int!) {
    createStoreArticle(
      data: {
        article: { connect: { articleId: $articleId } }
        store: { connect: { storeId: $storeId } }
        articleId: $articleId
        storeId: $storeId
      }
    ) {
      id
    }
  }
`;

export const PUBLISH_ARTICLE = gql`
  mutation ($articleId: ID!) {
    publishArticle(where: { id: $articleId }, to: PUBLISHED) {
      id
    }
  }
`;

export const PUBLISH_STOREARTICLE = gql`
  mutation ($sAID: ID!) {
    publishStoreArticle(where: { id: $sAID }, to: PUBLISHED) {
      id
    }
  }
`;

export const UNPUBLISH_STOREARTICLE = gql`
  mutation ($sAID: ID!) {
    unpublishStoreArticle(where: { id: $sAID }, from: PUBLISHED) {
      id
    }
  }
`;
