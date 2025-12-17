/**
 * Returns an array of day names starting from `startDay`.
 *
 * @param startDay - The name of the day to start from (e.g., "Lundi").
 * @param numberOfDays - How many days to return.
 * @returns An array of strings representing the days.
 */
export function getNextDaysOfTheWeek(startDay: string, numberOfDays: number): string[] {
    const daysOfTheWeek: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    const startIndex = daysOfTheWeek.indexOf(startDay);

    if (startIndex === -1) {
        return daysOfTheWeek.slice(0, numberOfDays);
    }

    const rotatedWeek = [
        ...daysOfTheWeek.slice(startIndex),
        ...daysOfTheWeek.slice(0, startIndex)
    ];

    return rotatedWeek.slice(0, numberOfDays);
}


/**
 * Returns the current day of the week capitalized (e.g., "Lundi").
 * If a date string is provided, it returns the day for that date.
 *
 * @param date - Optional date string or Date object.
 * @returns The capitalized day name.
 */
export function getDayOfTheWeekFirstLetterCapitalized(date?: string | Date | boolean): string {
    let dateObj: Date;

    if (!date || typeof date === 'boolean') {
        dateObj = new Date();
    } else {
        dateObj = new Date(date);
    }

    if (isNaN(dateObj.getTime())) {
        dateObj = new Date();
    }

    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    const dayOfTheWeek = new Intl.DateTimeFormat('fr-FR', options).format(dateObj);

    const firstLetterCapitalizedDOTW = dayOfTheWeek.charAt(0).toUpperCase() + dayOfTheWeek.slice(1);

    return firstLetterCapitalizedDOTW;
}
