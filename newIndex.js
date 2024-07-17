function getTime(){
    let currentTime = Date.now();
    let currentDate = new Date(currentTime);
    console.log(currentDate.toString());
}

export default getTime;