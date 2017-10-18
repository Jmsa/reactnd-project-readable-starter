export function createArrayFromObject(obj) {
    const newArray = [];
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            newArray.push(obj[prop]);
        }
    }
    return newArray;
}

// Given an array return and object where the key can be specified and the entire item at index
// is the property.
export function createObjectFromArray(arr, k = 'id') {

    // Create an object from each item in the array - using the id as key to match.
    const objects = arr.map((d) => {
        return {
            [d[k]]: d
        }
    });

    // Merge the objects into 1.
    return Object.assign(...objects);
}