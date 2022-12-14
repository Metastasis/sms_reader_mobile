import React, {ReactNode} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {GridRow} from '../Layout/Grid';
import {TextProps} from 'react-native';
import {codeBoxStyles} from '@ory/themes';
import StyledText from './StyledText';

const StyledCodeBox = styled.View(codeBoxStyles);

interface Props extends TextProps {
  children: ReactNode;
  testID?: string;
}

export default ({testID, ...props}: Props) => (
  <GridRow>
    <StyledCodeBox>
      <StyledText testID={testID} variant="code" {...props} />
    </StyledCodeBox>
  </GridRow>
);
