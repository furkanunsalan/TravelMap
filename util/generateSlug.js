const convertTurkishChars = (str) => {
    const turkishToEnglishMap = {
        'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'ı': 'i', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U',
        'ç': 'c', 'ğ': 'g', 'ö': 'o', 'ş': 's', 'ü': 'u'
    };
    return str.split('').map(char => turkishToEnglishMap[char] || char).join('');
};

export const generateSlug = (name) => {
    const normalizedName = convertTurkishChars(name);
    return normalizedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};