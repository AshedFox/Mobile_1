import {makeAutoObservable} from "mobx";
import {User} from "firebase/auth";
import {auth} from "../../firebase/firebaseConfig";

class AccountStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);

        auth.onAuthStateChanged((user) => {
            this.setUser(user);
        });
    }

    setUser = (user: User | null) => {
        this.user = user;
    }
}

export default new AccountStore();
