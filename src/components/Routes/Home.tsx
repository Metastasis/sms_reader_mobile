import React, {useCallback, useContext, useEffect} from 'react';
import StyledText from '../Styled/StyledText';
import CodeBox from '../Styled/CodeBox';
import {AuthContext} from '../AuthProvider';
import Layout from '../Layout/Layout';
import StyledCard from '../Styled/StyledCard';
import StyledButton from '../Styled/StyledButton';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const {isAuthenticated, session, sessionToken} = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated || !session) {
      // @ts-ignore
      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, sessionToken]);

  const onNotificationPage = useCallback(() => {
    // @ts-ignore
    navigation.navigate('NotificationPattern');
  }, [navigation]);

  const onNotificationList = useCallback(() => {
    // @ts-ignore
    navigation.navigate('NotificationPatternList');
  }, [navigation]);

  if (!isAuthenticated || !session) {
    return null;
  }

  // Get the name, or if it does not exist in the traits, use the
  // identity's ID
  const {name: {first = String(session.identity.id)} = {}} = session.identity
    .traits as any;
  const stl = {marginBottom: 14};
  return (
    <Layout>
      <StyledCard>
        <StyledText style={stl} variant="h1">
          Welcome back, {first}!
        </StyledText>
        <StyledButton
          onPress={onNotificationPage}
          title="Go to notifications"
        />
        <StyledButton onPress={onNotificationList} title="Go to list" />
        <StyledText variant="lead">
          Hello, nice to have you! You signed up with this data:
        </StyledText>
        <CodeBox>
          {JSON.stringify(session.identity.traits || '{}', null, 2)}
        </CodeBox>
        <StyledText variant="lead">
          You are signed in using an ORY Kratos Session Token:
        </StyledText>
        <CodeBox testID="session-token">{sessionToken}</CodeBox>
        <StyledText variant="lead">
          This app makes REST requests to ORY Kratos' Public API to validate and
          decode the ORY Kratos Session payload:
        </StyledText>
        <CodeBox testID="session-content">
          {JSON.stringify(session || '{}', null, 2)}
        </CodeBox>
      </StyledCard>
    </Layout>
  );
};

export default Home;
