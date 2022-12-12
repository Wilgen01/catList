import { Category } from "./category.interface";

export interface Images {
    breeds:     any[];
    categories: Category[];
    id:         string;
    url:        string;
    width:      number;
    height:     number;
}