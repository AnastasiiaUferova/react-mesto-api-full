import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupConfirm from "./PopupConfirm";
import { setToken, removeToken } from "../utils/token"
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import tick from "../images/Tick.svg";
import cross from "../images/Cross.svg";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    const [userData, setUserData] = useState({});
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
    const [imageTooltip, setImageTooltip] = useState('');
    const [textTooltip, setTextTooltip] = useState('');


    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            history.push("/");
        }
    }, [loggedIn, history]);

    useEffect(() => {
        if(loggedIn===true) {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}, [loggedIn]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setIsTooltipPopupOpen(false);
    }

    function handleCardClick(data) {
        setSelectedCard({ name: data.name, link: data.link });
        setIsImagePopupOpen(true);
    }

    function handleUpdateUser(userData) {
        return api
            .changeUserInfo(userData)
            .then((result) => {
                setCurrentUser(result);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(userData) {
        return api
            .changeAvatar(userData)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i === currentUser._id);

        return api
            .changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => console.log(`Error: ${err}`));
    }

    function handleOpenPopupDelete(card) {
        setIsConfirmPopupOpen(true);
        setSelectedCard(card);
    }

    function handleCardDelete(card) {
        return api
            .deleteCard(card._id)
            .then(
                setCards((state) => state.filter((newCard) => newCard._id !== card._id)),
                closeAllPopups()
            )
            .catch((err) => console.log(`Error: ${err}`));
    }

    function handleAddPlaceSubmit(newCard) {
        return api
            .addCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleRegister(password, email) {
        return auth
            .register(password, email)
            .then(() => {
                setImageTooltip(tick);
                setTextTooltip("You have successfully registered!");
                setIsTooltipPopupOpen(true);
                history.push("/signin");
            })
            .catch(() => {
                setImageTooltip(cross);
                setTextTooltip("Something went wrong! Try again.");
                setIsTooltipPopupOpen(true);
            });
    }

    function handleLogin(password, email) {
        return auth.authorize(password, email).then((data) => {
            if (data.token) {
                setToken(data.token);
                setLoggedIn(true);
                console.log(data.token)
                setUserData({ email: email });
                history.push("/");
            }
        })
        .catch((err) => {
        setImageTooltip(cross);
        setTextTooltip(err);
        setIsTooltipPopupOpen(true);
        })
        
    }


    function tokenCheck() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            auth.getContent(jwt).then((data) => {
                if (data) {
                    setUserData({ email: data.email });
                    setLoggedIn(true);
                    history.push("/");
                }
            });
        }
    }


    function handleSignOut() {
        removeToken("jwt");
        history.push("/signup");
        setLoggedIn(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <Header signOut={handleSignOut} userData={userData} />

                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        openPopupDelete={handleOpenPopupDelete}
                        onCardLike={handleCardLike}
                        cards={cards}
                    />
                    <Route path="/signup">
                        <Register handleRegister={handleRegister} />
                    </Route>
                    <Route path="/signin">
                        <Login handleLogin={handleLogin} />
                    </Route>
                </Switch>

                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <PopupConfirm name="confirm" title="Are you sure?" card={selectedCard} isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete}></PopupConfirm>

                <ImagePopup name="pic" card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

                <InfoTooltip text={textTooltip} image={imageTooltip} isOpen={isTooltipPopupOpen} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;