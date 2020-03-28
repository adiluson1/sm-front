export class Pagination<T> {
    items: T[];
    itemCount: number;
    totalItems: number;
    pageCount: number;
    next: string;
    previous: string;

    constructor(items: T[]) {
        this.items = items
    }
}