export type Subscriber = {
    id: string,
    email: string,
    created_at: Date,
    modified_at: Date,
}

export type Database = {
    subscribers: Subscriber;
};