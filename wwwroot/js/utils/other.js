

export const removeAllClasses = (nodeCollection, className) => {
    console.log(nodeCollection);
    if (nodeCollection) {
        for (let nodeItem of nodeCollection) {
            nodeItem.classList.remove(className);
        }
    }
}