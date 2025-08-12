export const formatDate = (date? : FormDataEntryValue)=>{
    if (!date) throw new Error("Missing date field");
    return new Date(date.toString());
}

export const getDateValue = (date : string | Date) =>{
    return new Date(date).getTime()
}

export const calculateDaysBetweenDates = (startDate : string | Date , endDate : string | Date)  =>{
    return Math.round( getDateValue(endDate) - getDateValue(startDate) ) / (1000 * 60 * 60 * 24)
}