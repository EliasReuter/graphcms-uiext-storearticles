import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Wrapper,
  FieldExtensionDeclaration,
  FieldExtensionType,
  FieldExtensionFeature,
  ExtensionPermission,
  useFieldExtension,
  useUiExtension,
} from '@graphcms/uix-react-sdk';

// use the ExtensionDeclaration type to validate the shape of your declaration object
const declaration: FieldExtensionDeclaration = {
  extensionType: 'field',
  fieldType: FieldExtensionType.STRING,
  name: 'Store Article Definition',
  description: '',
  features: [FieldExtensionFeature.FieldRenderer],
  permissions: [ExtensionPermission.INPUT]
};

function App() {

  const {
    form: { subscribeToFieldState },
    field
  } = useFieldExtension();

  const [storeIds, setStoreIds] = useState([]);
  const [graphcmsId, setGraphCmsId] = useState([]);

  useEffect(() => {
    fetch("https://api-eu-central-1.graphcms.com/v2/cl1eyp2gh2pc901z7amoq8axs/master?query=query%7B%0A%20%20storeArticles%7B%0A%20%20%20%20storeId%0A%20%20%20%20articleId%0A%20%20%7D%0A%7D")
    .then(res => res.json())
    .then(
      (result) => {
        setStoreIds(result.data.storeArticles);
      },
      (error) => {
      }
    );
    const unsubscribe = async () => {
      await subscribeToFieldState(
        field.apiId,
        (state) => {
          setGraphCmsId(state.value);
        },
        { value: true },
      );
    };
    return () => unsubscribe();

}, [subscribeToFieldState, field.apiId]);

  return(
    <Wrapper declaration={declaration}> 
      <div className={"ml-10"}>
        <h1 className={"text-3xl font-bold underline mt-10 mb-4"}>Create Article</h1>
        <div>
          <label className={"mb-4"}>
            Id:
            <input type="text" name="name" value={graphcmsId} />
          </label>
        </div>
      </div>
    </Wrapper>
  );

}

export default App;
