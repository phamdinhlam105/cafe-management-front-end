
export const stringToDate = (dateString: string | undefined): Date => {

    if (!dateString)
        return new Date;
    const parts = dateString.split("/");
    if (parts.length !== 3) return new Date;

    const [month, day, year] = parts.map(Number);

    if (isNaN(month) || isNaN(day) || isNaN(year)) return new Date;
    if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1000) return new Date;

    return new Date(year, month - 1, day);
}

export const stringToDateYearFirst = (dateString: string | undefined): Date=>{
    if (!dateString)
        return new Date;
    const parts = dateString.split("-");
    if (parts.length !== 3) return new Date;

    const [year, month, day] = parts.map(Number);

    if (isNaN(month) || isNaN(day) || isNaN(year)) return new Date;
    if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1000) return new Date;

    return new Date(year, month - 1, day);
}


export const formatISOToNormalDate = (isoString: string): string => {
    const date = new Date(isoString);

    const pad = (num: number) => num.toString().padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
