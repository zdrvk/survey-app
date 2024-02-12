import { createContext, useContext, useState } from 'react';

const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    userToken: null,
    setUserToken: () => {},
    surveys: [],
    questionTypes: [],
    notification: {
        message: '',
        show: false,
    },
});

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    const [surveys, setSurveys] = useState();
    const [questionTypes] = useState(['text', 'select', 'radio', 'checkbox', 'textarea']);
    const [notification, setNotification] = useState({ message: '', show: false });
    const setUserTokenMethod = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token);
        } else {
            localStorage.removeItem('TOKEN');
        }
        setUserToken(token);
    };

    const showNotification = (message) => {
        setNotification({ message, show: true });
        setTimeout(() => {
            setNotification({ message: '', show: false });
        }, 2500);
    };
    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                surveys,
                setUserTokenMethod,
                questionTypes,
                notification,
                showNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
