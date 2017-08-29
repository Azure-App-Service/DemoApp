import {Profile} from './profile';
export class ChatMessage{
    profile?:Profile;
    created?:string;
    content?:string;
    ownByMe?:Boolean;
}