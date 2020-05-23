

export const removeAllClasses = (nodeCollection, className) => {
    if (nodeCollection) {
        for (let nodeItem of nodeCollection) {
            nodeItem.classList.remove(className);
        }
    }
}