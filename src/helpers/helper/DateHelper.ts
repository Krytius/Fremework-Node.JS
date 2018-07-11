export class DateHelper {

    /**
     * UNIXTIME to MYSQL
	 * int => 0000-00-00 00:00:00
     * @param unixTime number
     */
    public static convert(unixTime: number) {
        let date = new Date(unixTime);

        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let month = ((date.getMonth()+1) < 10) ? `0${(date.getMonth()+1)}` : (date.getMonth()+1);
        let year = date.getFullYear();
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
    }

    /**
	 * MYSQL to UNIXTIME
	 * 0000-00-00 00:00:00 => int
     * @param dateMYSQL 
     */
    public static convertUnix(dateMYSQL: string) {
        let date = new Date(dateMYSQL);
        return date.getTime();
    }

}