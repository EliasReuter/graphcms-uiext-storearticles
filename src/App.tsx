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
} from '@graphcms/uix-react-sdk';

const declaration: FieldExtensionDeclaration = {
  extensionType: 'field',
  fieldType: FieldExtensionType.STRING,
  name: 'Store Article Definition',
  description: '',
  features: [FieldExtensionFeature.FieldRenderer],
  permissions: [ExtensionPermission.INPUT]
};

function App() {

  const fieldExtProps = useFieldExtension();

  const [graphcmsId, setGraphCmsId] = useState("default id");

  useEffect(() => {
    const unsubscribe = async () => {
      await fieldExtProps.form.subscribeToFieldState(
        "ID",
        (state) => {
          setGraphCmsId(state.value);
        },
        { value: true },
      );
    };
    unsubscribe();
}, [fieldExtProps]);


  console.log(fieldExtProps);
  return(
    <Wrapper declaration={declaration}> 
        <input value={graphcmsId}/>
    </Wrapper>
  );

}

export default App;
