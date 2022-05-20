const parseFilterInflux = (items, kind, property = null) => {
    let parseDevices = '';
    items.forEach((item, index) => {
        if (index === 0) {
            parseDevices += `"${property ? item[property] : item}"`;
        } else {
            parseDevices += ` or r["${kind}"] == "${property ? item[property] : item}"`;
        }
    });
    return parseDevices;
};

const buildFilters = (value, field) => `|> filter(fn: (r) => r["${field}"] == ${parseFilterInflux(value, field)}`;

const parseTimestampToIso = date => new Date(parseInt(date, 10)).toISOString();

module.exports = {
    buildFilters,
    parseTimestampToIso
};
