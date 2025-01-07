export const formatDate = (date: string) => {
    const formatDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }
    return formatDate.toLocaleString("en-US", options);
}