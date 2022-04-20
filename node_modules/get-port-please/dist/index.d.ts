interface GetPortOptions {
    name: string;
    random: boolean;
    port: number;
    ports: number[];
    host: string;
    memoDir: string;
    memoName: string;
}
declare type GetPortInput = Partial<GetPortOptions> | number | string;
declare function getPort(config?: GetPortInput): Promise<number>;
declare function checkPorts(ports: number[], host?: string): Promise<number>;
declare function checkPort(port: number, host?: string): Promise<number | false>;

export { GetPortInput, GetPortOptions, checkPort, checkPorts, getPort };
