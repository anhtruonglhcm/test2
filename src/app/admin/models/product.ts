export interface Product {
    _id: string;
    name: string;
    product_cate: string;
    slug: string;
    photo: string;
    status: boolean;
    is_home: boolean;
    position: number;
    intro: string;
    description: string;
}
export interface ProductPaginate {
    docs: Product[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: any;
}