export default class UserInfo {
    constructor({userInfoSelectors}){
        this._nameSelector = userInfoSelectors.name;
        this._professionSelector = userInfoSelectors.profession;
        this._nameElement = document.querySelector(this._nameSelector);
        this._professionElement = document.querySelector(this._professionSelector);
    };

    getUserInfo(){
        const userInfoObj = {};
        userInfoObj.name = document.querySelector(this._nameSelector).textContent;
        userInfoObj.profession = document.querySelector(this._professionSelector).textContent;
        return userInfoObj;
    };

    setUserInfo(name, profession){
        this._nameElement.textContent = name;
        this._professionElement.textContent = profession;
    };
}