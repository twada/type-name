declare type Options = {
    default?: string | ((value: object) => string);
    name?: (value: object) => string;
};

declare function typeName (value: any, options?: Options): string;
export = typeName;
