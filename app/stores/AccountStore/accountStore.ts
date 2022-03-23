import {makeAutoObservable} from "mobx";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "../../firebase/firebaseConfig";

class AccountStore {
    constructor() {
        makeAutoObservable(this);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.setUser(user);
            } else {
                this.resetUser();
            }
        });
    }

    user?: User;

    setUser = (user: User) => {
        this.user = user;
    }
    resetUser = () => {
        this.user = undefined;
    }
}

export default new AccountStore();
