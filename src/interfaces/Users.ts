interface Users {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    creationDate: Date;
    updateDate: Date;
    passwordUpdateDate: Date;
    lastLoginDate: Date;
    connectionAttempts: number;
    isActive: boolean;
    role: number;
    curencyId: number;

    curency: Curencies;

    tokens: Tokens[];
    fbTokens: FbTokens[];
    alerts: Alerts[];
    epargnes: Epargnes[];
    frequancies: Frequencies[];
    subCategories: SubCategories[];
    groups: UserGroups[];
};
