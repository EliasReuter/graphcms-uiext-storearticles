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

// use the ExtensionDeclaration type to validate the shape of your declaration object
const declaration: FieldExtensionDeclaration = {
  extensionType: 'field',
  fieldType: FieldExtensionType.STRING,
  name: 'Store Article Definition',
  description: '',
  features: [FieldExtensionFeature.FieldRenderer],
  permissions: [ExtensionPermission.INPUT]
};

const App = () => {

  const {
    form: { subscribeToFieldState },
    field
  } = useFieldExtension();

  const [graphcmsId, setGraphCmsId] = useState([]);

  useEffect(() => {
    const unsubscribe = async () => {
      await subscribeToFieldState(
        field.id,
        (state) => {
          setGraphCmsId(state.value);
        },
        { value: true },
      );
    };
    
    unsubscribe();
}, [subscribeToFieldState, field.id]);

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
