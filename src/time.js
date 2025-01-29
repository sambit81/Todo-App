const Time = {
    getWeekDayName: () => {
        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date();
        const weekNum = date.getDay();
        return week[weekNum];
    },
    
    getDay: () => {
        const date = new Date();
        if (date.getDate() < 10) {
            return "0" + date.getDate();
        }
        return date.getDate();
    },
    
    getMonth: () => {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const date = new Date();
        const monthNum = date.getMonth();
        return month[monthNum];
    },
    
    getYear: () => {
        const date = new Date();
        return date.getFullYear();
    },
    
    getTime: (format) => {
        let time = '';
        let ampm = '';
        if (format === '12') {
            const date = new Date();
            const hours = date.getHours();
            if (hours === 0) {
                time += '12';
                ampm = 'AM';
            } else if (hours >= 1 && hours <= 9) {
                time += `0${hours}`;
                ampm = 'AM';
            } else if (hours >= 10 && hours <= 11) {
                time += `${hours}`;
                ampm = 'AM';
            } else if(hours === 12) {
                time += `${hours}`;
                ampm = 'PM';
            } else if (hours >= 13 && hours <= 21) {
                time += `0${hours-12}`;
                ampm = 'PM';
            } else if (hours >= 22 && hours <= 23) {
                time += `${hours-12}`;
                ampm = 'PM';
            }
    
            time += ':';
    
            const minutes = date.getMinutes();
            if (minutes >= 0 && minutes <= 9) {
                time += `0${minutes}`;
            } else {
                time += `${minutes}`;
            }
    
            time += ` ${ampm}`;
            return time;
        } else if (format === '24') {
            const date = new Date();
            const hours = date.getHours();
            if (hours >= 0 && hours <= 9) {
                time += `0${hours}`;
            } else if (hours >= 10 && hours <= 23) {
                time += `${hours}`;
            }
    
            time += ':';
    
            const minutes = date.getMinutes();
            if (minutes >= 0 && minutes <= 9) {
                time += `0${minutes}`;
            } else {
                time += `${minutes}`;
            }
            return time;
        }
    }
}

export default Time;