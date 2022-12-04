import React from 'react';
import {TextInputProps, View} from 'react-native';
import StyledTextInput from './../Styled/StyledTextInput';
// @ts-ignore
import styled from 'styled-components/native';
import {textInputSubtitleStyles, textInputTitleStyles} from '@ory/themes';

type Props = InputProps;

type Variant = 'text' | 'username' | 'hidden' | 'email' | 'submit' | 'password';
type Message = {
  text: string;
  id: string;
  type: string;
};
export interface InputProps {
  name: string;
  title: string;
  onChange: (value: any) => void;
  value: any;
  messages?: Message[];
  variant?: Variant;
  disabled?: boolean;
  textInputOverride?: TextInputOverride;
}

export type TextInputOverride = (props: TextInputProps) => TextInputProps;

const typeToState = ({type, disabled}: {type?: string; disabled?: boolean}) => {
  if (disabled) {
    return 'disabled';
  }
  switch (type) {
    case 'error':
      return 'error';
  }
  return undefined;
};

const Title = styled.Text(textInputTitleStyles);
const Subtitle = styled.Text(textInputSubtitleStyles);

export const Input = ({
  name,
  title,
  value,
  messages,
  onChange,
  disabled,
  textInputOverride,
  variant = 'text',
}: Props) => {
  let extraProps: TextInputProps = {};
  switch (variant) {
    case 'email':
      // @ts-ignore
      extraProps.autoCompleteType = 'email';
      extraProps.keyboardType = 'email-address';
      extraProps.textContentType = 'emailAddress';
      extraProps.autoCapitalize = 'none';
      extraProps.autoCorrect = false;
      break;
    case 'password':
      // @ts-ignore
      extraProps.autoCompleteType = 'password';
      extraProps.textContentType = 'password';
      extraProps.autoCapitalize = 'none';
      extraProps.secureTextEntry = true;
      extraProps.autoCorrect = false;
      break;
    case 'username':
      // @ts-ignore
      extraProps.autoCompleteType = 'username';
      extraProps.textContentType = 'username';
      extraProps.autoCapitalize = 'none';
      extraProps.autoCorrect = false;
      break;
  }

  if (textInputOverride) {
    extraProps = textInputOverride(extraProps);
  }

  return (
    <View testID={`field/${name}`}>
      <Title>{title}</Title>
      <StyledTextInput
        testID={name}
        onChange={onChange}
        value={value ? String(value) : ''}
        editable={!disabled}
        onChangeText={onChange}
        state={disabled ? 'disabled' : undefined}
        {...extraProps}
      />
      <>
        {messages?.map(({text, id, type}, k) => (
          <Subtitle key={`${id}${k}`} state={typeToState({type, disabled})}>
            {text}
          </Subtitle>
        ))}
      </>
    </View>
  );
};