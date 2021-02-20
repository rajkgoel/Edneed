export default class Domain {
    id?: string | undefined;
    text: string;
    parent_id?: string | undefined;
    level: number;
    modified_on?: Date;
    domains: Domain[];

    constructor(text: string, level: number, id?: string, parent_id?: string, domains?: Domain[]){
        this.text = text;
        this.level = level;
        this.id = id;
        this.parent_id = parent_id;
        this.domains = domains? [...domains] : [];
    }
}