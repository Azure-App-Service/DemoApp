import {Profile} from './profile'
import {User} from './user'
export class Friend{
    userAccount?:User;
    userProfile?:Profile;
    friendAccount?:User;
    friendProfile?:Profile;
    isAlreadyFriend?:Boolean;
    disableAddFriendTip?:string;
}