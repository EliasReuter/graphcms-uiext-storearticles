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
import { useMutation, useQuery } from "@apollo/client";
import { Button, Checkbox, TextField } from "@mui/material";
import {
  GET_ARTICLES,
  CREATE_STOREARTICLES,
  PUBLISH_STOREARTICLE,
  UNPUBLISH_STOREARTICLE,
  GET_DATA,
  CREATE_ARTICLE,
  PUBLISH_ARTICLE,
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

  const { data, refetch } = useQuery(GET_DATA, { pollInterval: 500 });
  const [createStoreArticle] = useMutation(CREATE_STOREARTICLES);
  const [createArticle] = useMutation(CREATE_ARTICLE);
  const [publishStoreArticle] = useMutation(PUBLISH_STOREARTICLE);
  const [publishArticle, { loading, error }] = useMutation(PUBLISH_ARTICLE);
  const [unpublishStoreArticle] = useMutation(UNPUBLISH_STOREARTICLE);

  const [storeArticleId, setStoreArticleId] = useState("asd");
  const [disablePublish, setDisablePublish] = useState(true);

  const [_storeId, setStoreId] = useState(-1);
  const [_articleId, setArticleId] = useState(-1);
  const [articleId, setRealArticleId] = useState(-1);
  const [_ageRestriction, setAgeRestriction] = useState(-1);
  const [_price, setPrice] = useState(-1);
  const [_name, setName] = useState("");
  const [_description, setDescription] = useState("");
  const [_comingSoon, setComingSoon] = useState(false);
  const _stores: number[] = [];

  const [disableArticleInputs, setDisableArticleInputs] = useState(false);

  data?.stores?.map((store: any) => _stores.push(store.storeId));

  console.log(_stores);

  useEffect(() => {
    refetch();
  });

  const articleFields = [
    [
      { label: "Name", type: "text", func: (val: any) => setName(val) },
      {
        label: "Article ID",
        type: "number",
        func: (val: any) => setArticleId(val),
      },
    ],
    [
      {
        label: "Description",
        type: "text",
        func: (val: any) => setDescription(val),
      },
    ],
    [
      {
        label: "Age Restriction",
        type: "number",
        func: (val: any) => setAgeRestriction(val),
      },
      { label: "Price", type: "number", func: (val: any) => setPrice(val) },
      {
        label: "Coming soon",
        type: "boolean",
        func: (val: any) => setComingSoon(val),
      },
    ],
  ];

  return (
    <div className={"ml-10 mr-10"}>
      <p className={"text-5xl mt-10"}>STORE ARTICLES</p>
      <p className={"text-2xl mt-6"}>GraphCMS</p>
      <div>
        {articleFields.map((row) => {
          return (
            <div className={"mt-2 flex gap-4"}>
              {row.map((article) => {
                return article.type === "boolean" ? (
                  <div className={"w-64"}>
                    <p>{article.label}</p>
                    <Checkbox
                      disabled={disableArticleInputs}
                      key={article.label}
                      onChange={(ev) => article.func(ev.target.checked)}
                    />
                  </div>
                ) : (
                  <TextField
                    key={article.label}
                    label={article.label}
                    type={article.type}
                    fullWidth={true}
                    disabled={disableArticleInputs}
                    multiline={row.length === 1}
                    rows={4}
                    onChange={(ev) => article.func(ev.target.value)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={"flex gap-3 mt-5 mb-10"}>
        <Button
          variant="contained"
          disabled={disableArticleInputs}
          onClick={() => {
            try {
              createArticle({
                variables: {
                  articleId: Number(_articleId),
                  ageRestriction: Number(_ageRestriction),
                  price: Number(_price),
                  name: _name,
                  description: _description,
                },
              }).then((result) => {
                setRealArticleId(result.data.createArticle.id);
                publishArticle({
                  variables: { articleId: articleId },
                }).then((result) => {
                  console.log(result);
                  setDisableArticleInputs(true);
                });
              });
            } catch (ex) {
              alert("Error while trying to create Store Article");
            }
          }}
        >
          Create Article
        </Button>
      </div>
      <div className={"mb-10"}>
        <p className={"text-2xl mt-6"}>Select Stores to add "{_name}"</p>
        <div className={"flex gap-5"}>
          {data?.stores?.map((x: any, index: number) => (
            <div className={"mb-5"}>
              <Checkbox
                disabled={!disableArticleInputs}
                key={x.storeId}
                checked={true}
                onChange={(ev) => {
                  if (ev.target.value) _stores.push(x.storeId);
                }}
              ></Checkbox>
              <p>{x.name}</p>
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          disabled={!disableArticleInputs}
          onClick={() => {
            try {
              _stores.map((str) => {
                createStoreArticle({
                  variables: {
                    articleId: Number(_articleId),
                    storeId: str,
                  },
                }).then((result) => {
                  console.log(result);
                  publishStoreArticle({
                    variables: { sAID: result.data.createStoreArticle.id },
                  }).then((result) => {
                    setDisableArticleInputs(false);
                    console.log(result);
                  });
                });
              });
            } catch (ex) {
              alert("Error while trying to create the Store Article");
            }
          }}
        >
          Add Article to Stores
        </Button>
      </div>
    </div>
  );
  // </Wrapper>
}

export default App;
