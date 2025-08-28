export interface Record {
  id: number;
  name: string;
  email: string;
}

let mockData: Record[] = [
  { id: 1, name: "John Smith", email: "john@example.com" },
  { id: 2, name: "Emma Brown", email: "emma@example.com" },
];

const simulateDelay = <T>(data: T, ms = 500) =>
  new Promise<T>(resolve => setTimeout(() => resolve(data), ms));

export const api = {
  getRecords: async (): Promise<Record[]> => simulateDelay([...mockData]),
  addRecord: async (record: Omit<Record, "id">): Promise<Record> => {
    const newRecord = { id: Date.now(), ...record };
    mockData.push(newRecord);
    return simulateDelay(newRecord);
  },
  updateRecord: async (id: number, updated: Partial<Omit<Record, "id">>): Promise<Record | null> => {
    const index = mockData.findIndex(r => r.id === id);
    if (index === -1) return simulateDelay(null);
    mockData[index] = { ...mockData[index], ...updated };
    return simulateDelay(mockData[index]);
  },
  deleteRecord: async (id: number): Promise<void> => {
    mockData = mockData.filter(r => r.id !== id);
    return simulateDelay(undefined);
  },
};
