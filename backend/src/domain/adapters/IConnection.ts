
export default interface IConnection {
    connect(): Promise<any>;
    disconnect(): Promise<void>;

}