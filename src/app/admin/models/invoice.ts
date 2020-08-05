export interface Invoice {
  _id: string;
  item: string;
  price: number;
  qty: number;
}
export interface InvoicePaginate {
  docs: Invoice[];
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
