import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import AccountApi from 'apis/account.api';
import axios from '../utils/axios';
import SnakeBar from '../utils/snackbar';

import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, jwtDecode, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';


      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const decodeToken = jwtDecode(accessToken);
        const { Avatar, EmployeeId, Roles, Email, RefreshToken } = decodeToken;
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user: {
              refreshToken: RefreshToken,
              avatar: Avatar,
              employeeId: EmployeeId,
              userName: decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
              localId: 'fboCrcczHrTNLHkIaFtevl2Zeod2',
              email: Email,
              passwordHash: 'UkVEQUNURUQ=',
              emailVerified: false,
              passwordUpdatedAt: 1616027772799,
              providerUserInfo: [
                {
                  providerId: 'password',
                  federatedId: 'demo@minimals.cc',
                  email: 'demo@minimals.cc',
                  rawId: 'demo@minimals.cc',
                },
              ],
              roles: Roles,
              photoURL: decodeToken.Avatar,
              validSince: '1616027772',
              lastLoginAt: '1683675805077',
              createdAt: '1616027772799',
              lastRefreshAt: '2023-05-09T23:43:52.435862Z',
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const response = await AccountApi.login({
      userName: email,
      password,
    });

    const { token, RefreshToken } = response.data;
    const decodeToken = jwtDecode(token);
    const { Avatar, EmployeeId, Roles, Email } = decodeToken;

    if (token) {
      setSession(token);
      dispatch({
        type: Types.LOGIN,
        payload: {
          user: {
            refreshToken: RefreshToken,
            userName: decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            avatar: Avatar,
            employeeId: EmployeeId,
            localId: 'fboCrcczHrTNLHkIaFtevl2Zeod2',
            email: Email,
            passwordHash: 'UkVEQUNURUQ=',
            emailVerified: false,
            passwordUpdatedAt: 1616027772799,
            providerUserInfo: [
              {
                providerId: 'password',
                federatedId: 'demo@minimals.cc',
                email: 'demo@minimals.cc',
                rawId: 'demo@minimals.cc',
              },
            ],
            roles: Roles,
            validSince: '1616027772',
            lastLoginAt: '1683675805077',
            createdAt: '1616027772799',
            lastRefreshAt: '2023-05-09T23:43:52.435862Z',
            photoURL: Avatar,
          },
        },
      });
    } else {
      SnakeBar.error(response.data.message);
    }
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const response = await axios.post('/api/account/register', {
        email,
        password,
        firstName,
        lastName,
      });
      const { accessToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      loginWithGoogle: () => {},
      loginWithGithub: () => {},
      loginWithTwitter: () => {},
      register,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
