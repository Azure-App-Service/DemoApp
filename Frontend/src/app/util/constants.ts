/*
* Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
* See LICENSE in the project root for license information.
*/

export class Constants {
    public static readonly LoginUrl = "/login/github/";
    public static readonly ConnectLinkedInUrl = "/login/linkedin-oauth2/";
    public static readonly AADInstance = "https://login.microsoftonline.com/";
    public static readonly Authority = Constants.AADInstance + "common/";
    public static readonly TokenProcessorUrl = "https://localhost:44380/node_modules/kurvejs/dist/login.html";
    public static readonly SourceCodeRepositoryUrl = "SourceCodeRepositoryUrl";

    public static readonly avatarImgUrl = 'assets/images/profile-none.png';

    public static readonly fromUnreadToChat = "unread";

    public static readonly disableAddFriendAndChatTip = "This profile id which is bigger than 10000 could not be chatted with or added as friend.";

    public static readonly seedFriendIdBegin = 10000;
    public static readonly chatRequestInterval = 1000 * 10;

    // Cookie names
    public static readonly AuthKey = "is_authenticated";
    public static readonly ConnectKey = "is_accessedConnect";

    static SocialProvider = class {
        public static readonly GitHub = "github";   
        public static readonly LinkedIn = "linkedin-oauth2";   
        public static readonly SkipSocialKey = "SkipSocial";
    }

    static hireableSearch = class{
        public static readonly yes = "yes";
        public static readonly no = "no";
        public static readonly unknown = "unknown";
    }

    static logoutArgs = class{
        public static readonly default = "";
        public static readonly logout ="/logout";
        public static readonly clear = "/logout?clear=true";
    }

    static WebAPI = class {
        public static readonly profileUrl = '/api/profiles';  // URL to web api
        public static readonly meUrl  = '/api/me';
        public static readonly connectedAccountUrl  = '/api/connected-accounts';
        public static readonly suggestedFriendsUrl = '/api/profiles/suggested';
        public static readonly searchFriendsUrl = '/api/profiles';
        public static readonly friendsUrl= '/api/friends';
        public static readonly smsUrl= '/api/sms';
        public static readonly chatMessageUrl= '/api/messages';
        public static readonly messageSummaryUrl= '/api/messages/summary';
        public static readonly chatSMSUrl= '/api/sms';
    }
}
