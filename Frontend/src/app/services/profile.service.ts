import { Injectable,Inject }    from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Constants } from '../util/constants';
import { DataService } from './dataService';
import {Profile} from '../shared/profile';
import {Friend} from '../shared/friend';


@Injectable()
export class ProfileService {

  constructor(@Inject('data') private dataService: DataService) { }

  public getCurrentUserProfile(): Observable<Profile> {
      let activeObject: ReplaySubject<Profile> = new ReplaySubject(1);
      this.dataService.getObject<Profile>(Constants.WebAPI.meUrl)
                  .subscribe((profile) => {
                        activeObject.next(profile);
                    },
                    (error) => {
                        activeObject.error(error);
                    });
      return activeObject;
   } 

   public updateCurrentUserProfile(currentProfile:Profile):Observable<Boolean>{
      let activeObject: ReplaySubject<Boolean> = new ReplaySubject(1);
      this.dataService.post(Constants.WebAPI.meUrl,currentProfile)
                      .subscribe((resp)=>{
                          activeObject.next(resp.id>0);
                      },
                      (error)=>{
                          activeObject.error(error);
                      });
      return activeObject;
   }

   public getUserProfile(id:number):Observable<Profile>{
      let activeObject: ReplaySubject<Profile> = new ReplaySubject(1);
      this.dataService.getObject<Profile>(Constants.WebAPI.profileUrl + "/" + id)
                  .subscribe((profile) => {
                        if(!profile.avatar_url)
                            profile.avatar_url = Constants.avatarImgUrl;
                        activeObject.next(profile);
                    },
                    (error) => {
                        activeObject.error(error);
                    });
      return activeObject;
   }


   public getProfilePosition(profile:Profile){
       if(profile==null)
        return '';
       if(profile.positions && profile.positions.length>0){
            return profile.positions[profile.positions.length-1];
       }
       return '';
   }
  
}