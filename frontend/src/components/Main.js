import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, cards, onAddPlace, onCardClick, onCardLike, openPopupDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile root__profile">
                <div className="profile__info-container">
                    <div className="profile__avatar-container">
                        <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                        <button className="profile__avatar-edit-button" onClick={onEditAvatar}></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <ul className="photo-grid root__photo-grid">
                {cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} openPopupDelete={openPopupDelete}/>
                ))}

            </ul>
        </main>
)
}




export default Main;

