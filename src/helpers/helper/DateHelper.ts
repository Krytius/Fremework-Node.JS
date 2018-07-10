export class DateHelper {

    /**
     * UNIXTIME para formato do MYSQL
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
     * Converte formato do banco de dados para o UNIXTIME
     * @param dateMYSQL 
     */
    public static convertUnix(dateMYSQL: string) {
        let date = new Date(dateMYSQL);
        return date.getTime();
    }

}