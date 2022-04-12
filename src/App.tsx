import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Wrapper,
  FieldExtensionDeclaration,
  FieldExtensionType,
  FieldExtensionFeature,
  ExtensionPermission,
  useFieldExtension,
} from "@graphcms/uix-react-sdk";
import Article from "./Models/Article";
import StoreArticle from "./Models/StoreArticle";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useMutation,
  useQuery,
} from "@apollo/client";

const declaration: FieldExtensionDeclaration = {
  extensionType: "field",
  fieldType: FieldExtensionType.STRING,
  name: "Store Article Definition",
  description: "",
  features: [FieldExtensionFeature.FieldRenderer],
  permissions: [ExtensionPermission.INPUT],
};

const GET_ARTICLES = gql`
  query GetStoreArticles {
    storeArticles {
      storeId
      articleId
    }
  }
`;

const CREATE_STOREARTICLES = gql`
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

const PUBLISH_STOREARTICLE = gql`
  mutation ($sAID: ID!) {
    publishStoreArticle(where: { id: $sAID }, to: PUBLISHED) {
      id
    }
  }
`;

const UNPUBLISH_STOREARTICLE = gql`
  mutation ($sAID: ID!) {
    unpublishStoreArticle(where: { id: $sAID }, from: PUBLISHED) {
      id
    }
  }
`;

function App() {
  const declaration: FieldExtensionDeclaration = {
    extensionType: "field",
    fieldType: FieldExtensionType.STRING,
    name: "Store Article Definition",
    description: "",
    features: [FieldExtensionFeature.FieldRenderer],
    permissions: [ExtensionPermission.INPUT],
  };

  const { data, refetch } = useQuery(GET_ARTICLES);
  const [createStoreArticle] = useMutation(CREATE_STOREARTICLES);
  const [publishStoreArticle, { loading, error }] =
    useMutation(PUBLISH_STOREARTICLE);
  const [unpublishStoreArticle] = useMutation(UNPUBLISH_STOREARTICLE);

  const [storeArticleId, setStoreArticleId] = useState("asd");

  return (
    <>
      <button
        onClick={() => {
          refetch();
          console.log(data);
        }}
      >
        Get Store Articles
      </button>
      <br />
      <button
        onClick={() =>
          createStoreArticle({
            variables: { articleId: 2, storeId: 2 },
          }).then((result) => {
            console.log(result);
            setStoreArticleId(result.data.createStoreArticle.id);
          })
        }
      >
        Create Store Article
      </button>
      <br />
      <button
        onClick={() => {
          console.log(storeArticleId);
          publishStoreArticle({ variables: { sAID: storeArticleId } }).then(
            (result) => console.log(result)
          );
        }}
      >
        Publish Store Article
      </button>
      <br />
      <button
        onClick={() => {
          console.log(storeArticleId);
          unpublishStoreArticle({ variables: { sAID: storeArticleId } }).then(
            (result) => console.log(result)
          );
        }}
      >
        Unpublish Store Article
      </button>
      {/*<Wrapper declaration={declaration}></Wrapper>*/}
      <br />
      {data?.storeArticles?.map((x: any, index: number) => (
        <>
          <input value={"Store Article #" + index.toString()} />
          <input value={x.storeId} />
          <input value={x.storeId} />
          <br />
        </>
      ))}
    </>
  );
}

export default App;
