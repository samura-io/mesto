export default class UserInfo {
    constructor({userInfoSelectors}){
        this._nameSelector = userInfoSelectors.name;
        this._professionSelector = userInfoSelectors.profession;
        this._avatarSelector = userInfoSelectors.avatar;
        this._avatarElement = document.querySelector(this._avatarSelector);
        this._nameElement = document.querySelector(this._nameSelector);
        this._professionElement = document.querySelector(this._professionSelector);

    };

    getUserInfo(){
        const userInfoObj = {};
        userInfoObj.username = document.querySelector(this._nameSelector).textContent;
        userInfoObj.profession = document.querySelector(this._professionSelector).textContent;
        return userInfoObj;
    };

    setUserInfo(data){
        this._nameElement.textContent = data.name;
        this._professionElement.textContent = data.about;
    };

    setAvatar(data) {
        this._avatarElement.setAttribute("src", `${data.avatar}`)
    }
}