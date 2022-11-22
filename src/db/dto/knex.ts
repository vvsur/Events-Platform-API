export interface Account {
    id?: number;
    email: string;
    name?: string;
    password?: string;
    pk?: string;
    pub?: string;
    permission: string;
}

export interface P2SH {
    id?: number;
    userid?: number;
    address: string;
    redeem?: string;
}

export interface AccountLogin extends Account {
    token: string;
}