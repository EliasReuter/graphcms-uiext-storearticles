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
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  createFilterOptions,
  Modal,
  TextField,
} from "@mui/material";
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

  const [_articleId, setArticleId] = useState(-1);
  const [realArticleId, setRealArticleId] = useState(-1);
  const [_ageRestriction, setAgeRestriction] = useState(-1);
  const [_price, setPrice] = useState(-1);
  const [_name, setName] = useState("");
  const [_description, setDescription] = useState("");
  const [_comingSoon, setComingSoon] = useState(false);

  const [log, setLog] = useState("");
  const [logColor, setLogColor] = useState("text-red-600");
  const [open, setOpen] = React.useState(false);
  const [disableArticleInputs, setDisableArticleInputs] = useState(true);
  const [disableStoreArticleInputs, setDisableStoreArticleInputs] =
    useState(true);

  const _stores: number[] = [];
  data?.stores?.map((store: any) => _stores.push(store.storeId));

  useEffect(() => {
    refetch();
  });

  const articleFields = [
    [
      {
        label: "Name",
        type: "text",
        func: (val: any) => setName(val),
        value: _name,
      },
      {
        label: "Article ID",
        type: "number",
        func: (val: any) => setArticleId(val),
        value: _articleId,
      },
    ],
    [
      {
        label: "Description",
        type: "text",
        func: (val: any) => setDescription(val),
        value: _description,
      },
    ],
    [
      {
        label: "Age Restriction",
        type: "number",
        func: (val: any) => setAgeRestriction(val),
        value: _ageRestriction,
      },
      {
        label: "Price",
        type: "number",
        func: (val: any) => setPrice(val),
        value: _price,
      },
      {
        label: "Coming soon",
        type: "boolean",
        func: (val: any) => setComingSoon(val),
        value: _comingSoon,
      },
    ],
  ];

  function setLogText(text: string, color: string) {
    setLog(text);
    setLogColor(color);
  }

  const clearFields = () => {
    articleFields.forEach((row) => {
      row.forEach((article) => {
        if (typeof article.value === "boolean") {
          article.func(false);
        } else if (typeof article.value === "string") {
          article.func("");
        } else {
          article.func(null);
        }
      });
    });
  };

  //
  return (
    <Wrapper declaration={declaration}>
      <div className={"ml-10 mr-10"}>
        <div className={"mb-5"}>
          <p className={"text-5xl mt-10"}>STORE ARTICLES</p>
          <p className={"text-2xl mt-6"}>GraphCMS</p>
          <p className={logColor}>{log}</p>
        </div>
        <Button
          disabled={!disableArticleInputs || !disableStoreArticleInputs}
          onClick={() => {
            setDisableArticleInputs(false);
          }}
        >
          + Add Article
        </Button>
        <div>
          {articleFields.map((row) => {
            return (
              <div className={"mt-2 flex gap-4"}>
                {row.map((article) => {
                  if (article.type === "boolean") {
                    return (
                      <div className={"w-64"}>
                        <p>{article.label}</p>
                        <Checkbox
                          disabled={disableArticleInputs}
                          key={article.label}
                          onChange={(ev) => article.func(ev.target.checked)}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <TextField
                        key={article.label}
                        label={article.label}
                        type={article.type}
                        fullWidth={true}
                        disabled={disableArticleInputs}
                        multiline={row.length === 1}
                        rows={4}
                        onChange={(ev) => article.func(ev.target.value)}
                        value={article.value}
                      />
                    );
                  }
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
              if (_articleId === -1) {
                setLog("Please complete Article Id field");
                return;
              }
              if (_name === "") {
                setLog("Please complete Name field");
                return;
              }
              if (_description === "") {
                setLogText("Please complete Description field", "text-red-600");
                return;
              }
              if (_ageRestriction === -1) {
                setLogText(
                  "Please complete Age Restriction field",
                  "text-red-600"
                );
                return;
              }
              if (_price === -1) {
                setLog("Please complete Price field");
                return;
              }
              createArticle({
                variables: {
                  articleId: Number(_articleId),
                  ageRestriction: Number(_ageRestriction),
                  price: Number(_price),
                  name: _name,
                  description: _description,
                },
              })
                .then((result) => {
                  setLogText(
                    "Successful creation of Article",
                    "text-green-600"
                  );
                  setRealArticleId(result.data.createArticle.id);
                  console.log(result);
                  publishArticle({
                    variables: { articleId: result.data.createArticle.id },
                  })
                    .then((result) => {
                      setLogText(
                        "Successful publishing of Article",
                        "text-green-600"
                      );
                      setDisableStoreArticleInputs(false);
                      setDisableArticleInputs(true);
                    })
                    .catch((reason) => {
                      setLogText(
                        "Error while trying to publish Article",
                        "text-red-600"
                      );
                    });
                })
                .catch((reason) => {
                  setLogText(
                    "Error while trying to create Article",
                    "text-red-600"
                  );
                });
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
                  disabled={disableStoreArticleInputs}
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
            disabled={disableStoreArticleInputs}
            onClick={() => {
              _stores.map((str) => {
                createStoreArticle({
                  variables: {
                    articleId: Number(_articleId),
                    storeId: str,
                  },
                })
                  .then((result) => {
                    publishStoreArticle({
                      variables: { sAID: result.data.createStoreArticle.id },
                    })
                      .then((result) => {
                        publishArticle({
                          variables: { articleId: realArticleId },
                        }).then((result) => {
                          setLogText(
                            "Successful creation of Store Articles",
                            "text-black"
                          );
                          setOpen(true);
                          setDisableStoreArticleInputs(true);
                          setDisableArticleInputs(true);
                          clearFields();
                        });
                      })
                      .catch((reason) => {
                        setLogText(
                          "Error while trying to publish Store Articles",
                          "text-red-600"
                        );
                      });
                  })
                  .catch((reason) => {
                    setLogText(
                      "Error while trying to create Store Articles",
                      "text-red-600"
                    );
                  });
              });
            }}
          >
            Add Article to Stores
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
