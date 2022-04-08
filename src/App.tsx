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

  const {
    form,
    model
  } = useFieldExtension();

  const [graphcmsId, setGraphCmsId] = useState([]);

  useEffect(() => {
    const unsubscribe = async () => {
      await form.subscribeToFieldState(
        model.id,
        (state) => {
          setGraphCmsId(state.value);
        },
        { value: true },
      );
    };
    unsubscribe();
}, [form, model]);


  return(
    <Wrapper declaration={declaration}> 
        <input value={graphcmsId}/>
    </Wrapper>
  );

}

export default App;
