import {Session as KratosSession} from '@ory/kratos-client';
// import SecureStore, {ACCESSIBLE} from 'rn-secure-storage';
import AsyncStore from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

// The key under which the session is being stored
const userSessionName = 'user_session';

// The session type
export type SessionContext = {
  // The session token
  session_token: string;

  // The session itself
  session: KratosSession;
} | null;

// getAuthenticatedSession returns a promise with the session of the authenticated user, if the
// user is authenticated or null is the user is not authenticated.
//
// If an error (e.g. network error) occurs, the promise rejects with an error.
export const getAuthenticatedSession = (): Promise<SessionContext> => {
  const parse = (sessionRaw: string | null): SessionContext => {
    if (!sessionRaw) {
      return null;
    }

    // sessionRaw is a JSON String that needs to be parsed.
    return JSON.parse(sessionRaw);
  };

  let p = AsyncStore.getItem(userSessionName);
  if (Platform.OS !== 'web') {
    // We can use SecureStore if not on web instead!
    // p = SecureStore.get(userSessionName);
  }

  return p.then(parse);
};

// Sets the session.
export const setAuthenticatedSession = (
  session: SessionContext,
): Promise<null | void> => {
  if (!session) {
    return killAuthenticatedSession();
  }

  // if (Platform.OS === 'web') {
  // SecureStore is not available on the web platform. We need to use AsyncStore
  // instead.
  return AsyncStore.setItem(userSessionName, JSON.stringify(session));
  // }

  // return (
  //   SecureStore
  //     The SecureStore only supports strings so we encode the session.
  // .set(userSessionName, JSON.stringify(session), {
  //   accessible: ACCESSIBLE.WHEN_UNLOCKED,
  // }) as Promise<null>
  // );
};

// Removes the session from the store.
export const killAuthenticatedSession = () => {
  // if (Platform.OS === 'web') {
  // SecureStore is not available on the web platform. We need to use AsyncStore
  // instead.
  return AsyncStore.removeItem(userSessionName);
  // }

  // return SecureStore.remove(userSessionName) as Promise<null>;
};
