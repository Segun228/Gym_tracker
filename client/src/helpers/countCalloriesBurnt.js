const countCalloriesBurnt = (workout, weight=70, MET=6 ) => { 
    const duration = timeStrToHours(workout?.duration)
    return Math.round(weight * MET * duration)
}

function timeStrToHours(timeStr) {
    const [h, m, s] = timeStr.split(':').map(Number);
    return h + m / 60 + s / 3600;
}

export default countCalloriesBurnt