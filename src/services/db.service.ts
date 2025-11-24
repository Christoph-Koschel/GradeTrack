export type DBTable = "year" | "subject";

export class DBService {
    private db!: IDBDatabase;
    private readyPromise: Promise<void>;
    private readyResolve!: () => void;
    private readonly dbName: string;
    private readonly version: number;
    private readonly tables: DBTable[];

    constructor() {
        this.readyPromise = new Promise((resolve) => {
            this.readyResolve = resolve;
        });

        this.dbName = "GradeTrack";
        this.version = 1;
        this.tables = ["year", "subject"];

        this.init();
    }

    private async ready(): Promise<void> {
        return this.readyPromise;
    }

    private async init(): Promise<void> {
        this.db = await new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = () => {
                const db = request.result;

                for (const table of this.tables) {
                    if (!db.objectStoreNames.contains(table)) {
                        db.createObjectStore(table, { keyPath: "id", autoIncrement: true });
                    }
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        this.readyResolve();
    }

    public async save<T>(table: DBTable, item: Omit<T, "id"> & { id?: number }): Promise<number> {
        await this.ready();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(table, "readwrite");
            const store = tx.objectStore(table);
            const req = store.put(item);

            req.onsuccess = () => resolve(req.result as number);
            req.onerror = () => reject(req.error);
        });
    }

    public async get<T>(table: DBTable, id: number): Promise<T | undefined> {
        await this.ready();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(table, "readonly");
            const store = tx.objectStore(table);
            const req = store.get(id);

            req.onsuccess = () => resolve(req.result as T | undefined);
            req.onerror = () => reject(req.error);
        });
    }

    public async getAll<T>(table: DBTable): Promise<T[]> {
        await this.ready();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(table, "readonly");
            const store = tx.objectStore(table);
            const req = store.getAll();

            req.onsuccess = () => resolve(req.result as T[]);
            req.onerror = () => reject(req.error);
        });
    }

    public async delete(table: DBTable, id: number): Promise<void> {
        await this.ready();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(table, "readwrite");
            const store = tx.objectStore(table);
            const req = store.delete(id);

            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        });
    }

    public async clear(table: DBTable): Promise<void> {
        await this.ready();
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(table, "readwrite");
            const store = tx.objectStore(table);
            const req = store.clear();

            req.onsuccess = () => resolve();
            req.onerror = () => reject(req.error);
        });
    }
}
