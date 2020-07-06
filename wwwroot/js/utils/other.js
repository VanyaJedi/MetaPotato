
export const removeAllClasses = (nodeCollection, className) => {
    if (nodeCollection) {
        for (let nodeItem of nodeCollection) {
            nodeItem.classList.remove(className);
        }
    }
};

export const createAvatarTemplate = (photo, className = null) => {
    if (!photo) {
        return `<img class="${className}" src="img/default_avatar.png" />`;
    }
    const imgSrc = `data:image/jpeg;base64,${photo}`;
    return `<img  ${!className ? '' : `class="${className}"`} src="${imgSrc}" />`;
};

export const generateCSSVarForCorrectMobileHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};