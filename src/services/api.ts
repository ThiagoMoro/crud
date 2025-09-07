export interface Record {
  id: number;
  name: string;
  email: string;
  file?: string;
  fileName?: string;
}

let mockData: Record[] = [];

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("mockData");
  if (data) {
    mockData = JSON.parse(data);
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem("mockData", JSON.stringify(mockData));
};

loadFromLocalStorage();

const simulateDelay = <T>(data: T, ms = 500) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(data), ms));

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const api = {
  getRecords: async (): Promise<Record[]> => simulateDelay([...mockData]),
  addRecord: async (record: Omit<Record, "id"> & { file?: File }): Promise<Record> => {
    const newRecord: Record = {
      id: Date.now(),
      name: record.name,
      email: record.email,
      file: record.file ? await fileToBase64(record.file) : undefined,
      fileName: record.file ? record.file.name : undefined, 
    };

    mockData.push(newRecord);
    saveToLocalStorage();
    return simulateDelay(newRecord);
  },
  updateRecord: async (
    id: number,
    updated: Partial<Omit<Record, "id"> & { file?: File }>
  ): Promise<Record | null> => {
    const index = mockData.findIndex((r) => r.id === id);
    if (index === -1) return simulateDelay(null);

    mockData[index] = {
      ...mockData[index],
      ...updated,
      file: updated.file ? await fileToBase64(updated.file) : mockData[index].file,
      fileName: updated.file ? updated.file.name : mockData[index].fileName,
    };

    saveToLocalStorage();
    return simulateDelay(mockData[index]);
  },
  deleteRecord: async (id: number): Promise<void> => {
    mockData = mockData.filter((r) => r.id !== id);
    saveToLocalStorage();
    return simulateDelay(undefined);
  },
};