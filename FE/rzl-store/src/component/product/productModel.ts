export interface ProductModel {
    name?: string,
    category?: string | undefined,
    image?: string,
    price?: number
    qty?: number | null | undefined,
}

export interface ProductPage {
    title: string,
    currentPage: number,
    totalData: number,
    products: ProductModel[],
    loading: boolean, 
    handleFilterCategory: (category: string | undefined) => {},
    handlePageSize: (pageSize: number) => {},
    handleSortBy: (field: string) => {},
    categories: string[],
    pageSize: number,
    sortBy: string | '', 
    category: string | '',
    handleAddToCart: (param: ProductModel) => {}
}