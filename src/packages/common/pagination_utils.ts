export const getStartAndEndIndex = (activePage: number, numberOfItemsToShow: number) => {
    // Special case
    if (activePage === 1) {
        return [0, numberOfItemsToShow];
    }
    const startIndex = (numberOfItemsToShow * (activePage -1));
    const endIndex = startIndex  + numberOfItemsToShow;
    return [startIndex, endIndex];
};

export const calculatePageNumber = (totalItems: number, numberOfItemsToShow: number): number => {
    //@ts-ignore
    const numberOfPages: number = parseInt(totalItems) / parseInt(numberOfItemsToShow);

    // @ts-ignore
    if (parseInt(numberOfPages) === 0) {
        return 1;
    }

    // @ts-ignore
    if (parseInt(numberOfPages) < numberOfPages){
        // @ts-ignore
        return parseInt(numberOfPages) + 1;
    }

    // @ts-ignore
    return parseInt(numberOfPages);
};