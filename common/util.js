export function getDataFromKeys(keys, data) {
	const len = keys.length;
	const newRow = {};
	for(let m = 0;m<len;m++) {
		newRow[keys[m]] = data[keys[m]]; 
	}
	return newRow;
}