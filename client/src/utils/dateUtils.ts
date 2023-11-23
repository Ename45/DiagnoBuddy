// Function to get current day, month, and year
export const getCurrentDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const [day, month, year] = new Date()
        .toLocaleDateString('en-GB', options)
        .split(' ');
    const formattedDate: string = `${day} ${month}, ${year}`;
    return formattedDate;
};

// Function to get current time in AM/PM format
export const getCurrentTime = (): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    const currentTime: string = new Date().toLocaleTimeString(
        undefined,
        options
    );
    return currentTime;
};
