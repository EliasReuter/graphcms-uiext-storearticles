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

  const {form} = useFieldExtension();

  const [graphcmsId, setGraphCmsId] = useState("default id");

  
  useEffect(() => {
    const unsubscribe = async () => {
      await form.subscribeToFieldState(
        "articleID",
        (state) => {
          setGraphCmsId(state.value);
        },
        { value: true },
      );
    };
    unsubscribe();
  }, [form]);
  
  console.log(useFieldExtension());

  return(
    <Wrapper declaration={declaration}> 
        <input value={graphcmsId}/>
    </Wrapper>
  );

}

export default App;
