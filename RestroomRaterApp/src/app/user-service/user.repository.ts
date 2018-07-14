import { Injectable } from "@angular/core";
//import { Observable } from "rxjs/Observable";
import {User } from "../models/user";
import { AngularFireDatabase } from 'angularfire2/database';
//Repo that has all CRUD operatoins for Restroom Ratings

@Injectable()
export class UserRepository {
    private users: any[];
    private loaded: boolean = false;

    constructor(private dataSource: AngularFireDatabase) { }

    loadUsers() {
        this.loaded = true;
        this.dataSource.list('/Users').valueChanges().subscribe(users => {
            this.users = users;
            // console.log(this.users);
        });
    }
    //Get Ratings in Database
    getUsers():User[] {
        if (!this.loaded) {
            this.loadUsers();
        }
        return this.users;
    }
    //Save user to firebase database
    saveUser(user:User) {
        // console.log(user);
        this.dataSource.database.ref("Users").push(user);
    }
    //delete user from firebase database
    deleteUser(user: any): void {
        //  this.dataSource.object('/Users/' + user.$key).remove();
        this.dataSource.database.ref("Users").remove(user);

    }
    //update user from firebase database
    updateUser(user: any) {
        // this.dataSource.object('/Users/' + user.$key).update(user);
        this.dataSource.database.ref("Users").update(user);

    }

   


}
