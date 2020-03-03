/**
 *
 * @param startDay
 * @param {int} numberOfDays
 *
 * @returns {string[]}
 *
 *
 */
export function getNextDaysOfTheWeek(startDay, numberOfDays) {
    const daysOfTheWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    for (let i = 0; i < daysOfTheWeek.length; i++) {

        let actualElement = daysOfTheWeek[i];

        if (startDay === "Lundi") {

            let finalResult =  daysOfTheWeek.slice(0,numberOfDays);

            return finalResult;
        }

        if (startDay === 'Mardi') {

console.log(i);
            let finalResult = daysOfTheWeek.slice(1,numberOfDays +1);

            return finalResult;

        }

        if (actualElement === startDay) {

            let endOfArray = daysOfTheWeek.slice(i);

            let startOfArray = daysOfTheWeek.slice(0,(numberOfDays - endOfArray.length));

            let finalResult =  endOfArray.concat(startOfArray);

            return finalResult;
        }
    }
}


/**
 *
 * @param date
 * @returns {string}
 */
export function getDayOfTheWeekFirstLetterCapitalized(date) {
    if (date === false || date === undefined) {
        date = new Date();
    }
    const dayOFTheWeek = new Intl.DateTimeFormat('fr-FR', {weekday: 'long'}).format(new Date(date));
    const firstLetterCapitalizedDOTW = dayOFTheWeek[0].toUpperCase() + dayOFTheWeek.slice(1);

    return firstLetterCapitalizedDOTW
}