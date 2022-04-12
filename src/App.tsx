import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Wrapper,
  FieldExtensionDeclaration,
  FieldExtensionType,
  FieldExtensionFeature,
  ExtensionPermission,
  useFieldExtension,
} from "@graphcms/uix-react-sdk";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useMutation,
  useQuery,
} from "@apollo/client";
import { Button, TextField } from "@mui/material";
import {
  GET_ARTICLES,
  CREATE_STOREARTICLES,
  PUBLISH_STOREARTICLE,
  UNPUBLISH_STOREARTICLE,
} from "./gql/gql";

function App() {
  const declaration: FieldExtensionDeclaration = {
    extensionType: "field",
    fieldType: FieldExtensionType.STRING,
    name: "Store Article Definition",
    description: "",
    features: [FieldExtensionFeature.FieldRenderer],
    permissions: [ExtensionPermission.INPUT],
  };

  const { data, refetch } = useQuery(GET_ARTICLES, { pollInterval: 500 });
  const [createStoreArticle] = useMutation(CREATE_STOREARTICLES);
  const [publishStoreArticle, { loading, error }] =
    useMutation(PUBLISH_STOREARTICLE);
  const [unpublishStoreArticle] = useMutation(UNPUBLISH_STOREARTICLE);

  const [storeArticleId, setStoreArticleId] = useState("asd");
  const [disablePublish, setDisablePublish] = useState(true);

  const [_storeId, setStoreId] = useState(-1);
  const [_articleId, setArticleId] = useState(-1);

  const [disableInputs, setDisableInputs] = useState(false);

  useEffect(() => {
    refetch();
  });

  return (
    <div className={"ml-10"}>
      <p className={"text-5xl mt-10"}>STORE ARTICLES</p>
      <p className={"text-2xl mt-6"}>GraphCMS</p>
      <div className={"mt-5"}>
        <TextField
          label={"StoreID"}
          type="number"
          disabled={disableInputs}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(evt) => {
            setStoreId(Number(evt.target.value));
          }}
        ></TextField>
        <TextField
          label={"ArticleID"}
          type="number"
          disabled={disableInputs}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(evt) => {
            setArticleId(Number(evt.target.value));
          }}
        ></TextField>
      </div>
      <div className={"flex gap-3 mt-5 mb-10"}>
        <Button
          variant="contained"
          disabled={!disablePublish}
          onClick={() => {
            if (_storeId === -1 || _articleId === -1) {
              alert("Please complete all the Fields");
              return;
            }
            setDisablePublish(false);
            setDisableInputs(true);
            try {
              createStoreArticle({
                variables: {
                  articleId: _storeId,
                  storeId: _articleId,
                },
              }).then((result) => {
                setStoreArticleId(result.data.createStoreArticle.id);
              });
            } catch (ex) {
              alert("Error while trying to create Store Article");
            }
          }}
        >
          Create Store Article
        </Button>
        <Button
          variant="contained"
          disabled={disablePublish}
          onClick={() => {
            setDisablePublish(true);
            setDisableInputs(false);
            try {
              publishStoreArticle({ variables: { sAID: storeArticleId } }).then(
                (result) => console.log(result)
              );
            } catch (ex) {
              alert("Error while trying to publish the Store Article");
            }
          }}
        >
          Publish Store Article
        </Button>
        <Button
          variant="contained"
          disabled={true}
          onClick={() => {
            unpublishStoreArticle({ variables: { sAID: storeArticleId } }).then(
              (result) => console.log(result)
            );
          }}
        >
          Unpublish Store Article
        </Button>
      </div>
      {/*<Wrapper declaration={declaration}></Wrapper>*/}
      <div className={"ml-10"}>
        <div className={"flex gap-[115px] ml-2"}>
          <p> Store Article # </p>
          <p> Article ID </p>
          <p> Store ID </p>
        </div>
        {data?.storeArticles?.map((x: any, index: number) => (
          <div className={"flex gap-2"}>
            <TextField
              disabled={true}
              value={"Store Article #" + index.toString()}
            />
            <TextField disabled={true} value={x.storeId} />
            <TextField disabled={true} value={x.storeId} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
