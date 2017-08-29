import { Injectable,Inject }    from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Constants } from '../util/constants';
import { DataService } from './dataService';
import { ProfileService } from '../services/profile.service';
import {Profile} from '../shared/profile';
import {Friend} from '../shared/friend';
import {ConnectedAccount} from '../shared/connectedAccount';

@Injectable()
export class FriendService {

  constructor(@Inject('data') private dataService: DataService,
              private profileService: ProfileService) { }

  public getSuggestedFriends():Observable<Friend[]>{
      let activeObject:ReplaySubject<Friend[]> = new ReplaySubject(1);
      this.dataService.getArray<Profile>(Constants.WebAPI.suggestedFriendsUrl)
                      .subscribe((resp)=>{
                          let suggestedProfiles = <Profile[]>resp;
                          let suggestedFriends = new Array<Friend>();
                          let friends = resp as Friend[];
                            for(let i = 0;i < suggestedProfiles.length;i++){
                                let friend = new Friend();
                                friend.friendProfile = suggestedProfiles[i];
                                this.addDefaultAvatar(friend.friendProfile);
                                friend.friendProfile.position = this.profileService.getProfilePosition(friend.friendProfile);
                                friend.isAlreadyFriend = false;
                                suggestedFriends.push(friend);
                            }
                          activeObject.next(suggestedFriends);
                      },
                      (error)=>{activeObject.error(error)});
      return activeObject;
   }

   public getFriends():Observable<Friend[]>{
      let activeObject:ReplaySubject<Friend[]> = new ReplaySubject(1);
      this.dataService.getArray<number>(Constants.WebAPI.friendsUrl)
                      .subscribe((resp)=>{
                          activeObject.next(resp.map(i=>{
                              let friend = new Friend();
                              friend.friendProfile = new Profile();
                              friend.friendProfile.id = i;
                              friend.isAlreadyFriend = true;
                              return friend;
                          }));
                      },
                      (error)=>{activeObject.error(error)});
      return activeObject;
   }

   public addFriend(friendId:string):Observable<Boolean>{
       let activeObject:ReplaySubject<Boolean> = new ReplaySubject(1);
       this.dataService.post(Constants.WebAPI.friendsUrl,{"friend_id":friendId})
                       .subscribe(
                        resp=>{
                            activeObject.next(resp==friendId);
                        },
                        error=>activeObject.error(error));
       return activeObject;
   }

   public searchFriend(urlParam:string,currentUser:Profile):Observable<Friend[]>{
      let activeObject:ReplaySubject<Friend[]> = new ReplaySubject(1);
      this.dataService.getArray<Profile>(Constants.WebAPI.searchFriendsUrl+'?'+urlParam)
                      .subscribe((resp)=>{
                          let searchedProfiles = <Profile[]>resp;
                          let searchedFriends = new Array<Friend>();
                          this.getFriends().subscribe(
                             (resp)=>{
                                 let friends = resp as Friend[];
                                 for(let i = 0;i < searchedProfiles.length;i++){
                                     if(currentUser.id == searchedProfiles[i].id)
                                        continue;
                                     let friend = new Friend();
                                     friend.friendProfile = searchedProfiles[i];
                                     this.addDefaultAvatar(friend.friendProfile);
                                     friend.friendProfile.position = this.profileService.getProfilePosition(friend.friendProfile);
                                     friend.isAlreadyFriend = friends.filter(f=>f.friendProfile.id==friend.friendProfile.id).length>0;
                                     searchedFriends.push(friend);
                                 }
                                 activeObject.next(searchedFriends);
                             }
                          );
                      },
                      (error)=>{activeObject.error(error)});
      return activeObject;
   }

   private addDefaultAvatar(profile:Profile){
        if(!profile.avatar_url)
            profile.avatar_url = Constants.avatarImgUrl;
   }

}

