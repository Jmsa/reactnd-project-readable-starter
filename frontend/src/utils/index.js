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

    if (!arr || arr.length === 0) {
        return {};
    }

    // Create an object from each item in the array - using the id as key to match.
    const objects = arr.map((d) => {
        return {
            [d[k]]: d
        }
    });

    // Merge the objects into 1.
    return Object.assign(...objects);
}

// Generate guid for use as id
export function generateGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function getRandomNamedColor() {
    const colors = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}