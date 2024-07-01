import { createContext } from 'react';
import { TUser } from '../types';

type TDefaultValue = {
    user: TUser | undefined,
    login: Function,
    logout: Function
}
const defaultValue: TDefaultValue = {
    user: undefined,
    login: (_user: TUser) => {},
    logout: () => {}
}
const AuthContext = createContext(defaultValue);

export default AuthContext;