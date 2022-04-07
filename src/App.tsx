import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Wrapper,
  useUiExtension,
  FieldExtensionDeclaration,
  FieldExtensionType,
  FieldExtensionFeature,
  ExtensionPermission,
  useFieldExtension,
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

  const [storeIds, setStoreIds] = useState([]);

  useEffect(() => {
    fetch("https://api-eu-central-1.graphcms.com/v2/cl1eyp2gh2pc901z7amoq8axs/master?query=query%7B%0A%20%20storeArticles%7B%0A%20%20%20%20storeId%0A%20%20%20%20articleId%0A%20%20%7D%0A%7D")
    .then(res => res.json())
    .then(
      (result) => {
        setStoreIds(result.data.storeArticles);
      },
      (error) => {
      }
    )
}, []);

  return(
    <Wrapper declaration={declaration}>
      {
        storeIds.map((x:any) => 
        <>
          <input value={x?.storeId}/>
          <input value={x?.articleId}/>
          <br/>
          </>
        )
      }
    </Wrapper>
  );
}

export default App;
