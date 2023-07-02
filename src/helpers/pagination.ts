/* eslint-disable prettier/prettier */
export const calculatePagination = (currentPage, totalItems, keywords) => {
  const currentPageNumber = Number(currentPage);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pages = Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: i + 1,
    isActive: i + 1 === currentPageNumber,
  }));

  return {
    startIndex,
    endIndex,
    pages,
    hasPrev: currentPageNumber > 1,
    prevPage: currentPageNumber - 1,
    hasNext: currentPageNumber < totalPages,
    nextPage: currentPageNumber + 1,
    keywords,
  };
};
