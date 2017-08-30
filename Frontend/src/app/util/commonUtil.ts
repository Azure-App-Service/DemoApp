export class CommonUtil{
    
    public static isIgnoreCaseEqual(a:string,b:string):Boolean{
        return a.toLowerCase() == b.toLowerCase();
    }

    public static containsIgnoreCase(a:string,b:string):boolean{
        return a.toLowerCase().indexOf(b.toLowerCase())>0;
    }

    public static formatDate(date:Date):string{
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        return year + '-' + (monthIndex+1).toString() + '-'+day + ' ' + hour + ':' + (minutes >= 10?minutes.toString():'0'+minutes.toString());
    }

}