export const div = (attributes, parent) => {
    return tag('div', attributes, parent);
};

export const p = (attributes, parent) => {
    return tag('p', attributes, parent);
};

export const image = (attributes, parent) => {
    return tag('img', attributes, parent);
};

export function label(attributes, parent) {
    return tag('label', attributes, parent);
}

export function input(attributes, parent) {
    return tag('input', attributes, parent);
}

const tag = (type, attributes, parent) => {
    var element = document.createElement(type);

    if (parent) {
        parent.appendChild(element);
    }

    for (const key in attributes) {
        element[key] = attributes[key];
    }

    return element;
};