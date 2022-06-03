export const  getTimeFromMins = (mins:number):String => {
    let hours = Math.trunc(mins/60);
	let minutes = mins % 60;
    return `${hours}h ${minutes}m`;
};