DEFAULT_PAGE_NUMBER=1;
DEFAULT_LIMIT=0;


function getPagination(filter){
    const page=Math.abs(filter.page) || DEFAULT_PAGE_NUMBER;
    const limit=Math.abs(filter.limit) || DEFAULT_LIMIT;
    const skip=(page-1)*limit;

    return {
        skip,
        limit
    }
}

module.exports={
    getPagination
}