import { Injectable } from "@angular/core";
//import { Observable } from "rxjs/Observable";
import { User } from "../models/user";
import { AngularFireDatabase } from 'angularfire2/database';
//Repo that has all CRUD operatoins for Restroom Ratings

@Injectable()
export class UserRepository {
    private users: any[];
    private loaded: boolean = false;
    private currentUser: any;

    constructor(private dataSource: AngularFireDatabase) { }

    loadUsers() {
        this.loaded = true;
        this.dataSource.list('/Users').valueChanges().subscribe(users => {
            this.users = users;
            // console.log(this.users);
        });
    }
    //Get Ratings in Database
    getUsers(): User[] {
        if (!this.loaded) {
            this.loadUsers();
        }
        return this.users;
    }
    //Save user to firebase database
    saveUser(user: any) {

        console.log('Adding user');
        if (user != undefined) {
            this.upsert(user);
    
        }
    }
    //delete user from firebase database
    deleteUser(user: any): void {
        this.dataSource.database.ref("Users").remove(user);

    }
    //update user from firebase database
    updateUser(user: any) {
        this.dataSource.database.ref("Users").update(user);

    }
    checkIfUserExists(userId) {
        this.dataSource.object(userId);
        //this.dataSource.list('/Users', (ref) => ref.where('username', '==', this.username).limit(1)).valueChanges();

    }
    //make sure that duplicate values are not stored in database for User list
    upsert<T>(user) {
        if(JSON.parse(sessionStorage.getItem('newUser'))) {
            console.log('new User');
            this.dataSource.database.ref("Users").push({ email: user.email, displayName: user.displayName, uId: user.uid });
            sessionStorage.setItem('newUser','false');
        }
        else if(!JSON.parse(sessionStorage.getItem('newUser'))) {
         //   this.dataSource.database.ref("Users").set({ email: user.email, displayName: user.displayName, uId: user.uid });


        }
    }
    




}
