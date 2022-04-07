import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Wrapper,
  useUiExtension,
  FieldExtensionDeclaration,
  FieldExtensionType,
  FieldExtensionFeature,
} from '@graphcms/uix-react-sdk';

// use the ExtensionDeclaration type to validate the shape of your declaration object
const declaration: FieldExtensionDeclaration = {
  extensionType: 'field',
  fieldType: FieldExtensionType.STRING,
  name: 'My first custom input',
  description: '',
  features: [FieldExtensionFeature.FieldRenderer],
};

// Create a new type from your declaration object.
type MyExactDeclarationType = typeof declaration;

// And give it to the hook, allowing it do dynamically type the returned props, reflecting your extension configuration.
const MyField = () => {
  const { value, onChange } = useUiExtension<MyExactDeclarationType>();

  return (
    <input value={value} onChange={(event) => onChange(event.target.value)} />
  );
};

const App = () => (
  <Wrapper declaration={declaration}>
    <MyField />
  </Wrapper>
);

export default App;
