import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query GetStoreArticles {
    storeArticles {
      storeId
      articleId
    }
  }
`;

export const CREATE_STOREARTICLES = gql`
  mutation ($articleId: Int!, $storeId: Int!) {
    createStoreArticle(
      data: {
        article: { connect: { articleId: $articleId } }
        comingsoon: false
        store: { connect: { storeId: $storeId } }
        articleId: $articleId
        storeId: $storeId
      }
    ) {
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
