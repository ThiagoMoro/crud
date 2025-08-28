import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Record } from "../services/api";
import Alert from "../components/Alert";

export default function ViewRecords() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    const data = await api.getRecords();
    setRecords(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    await api.deleteRecord(id);
    setRecords(prev => prev.filter(r => r.id !== id));
    setAlert({ type: "success", message: "Record deleted successfully!" });
  };

  const startEdit = (record: Record) => {
    setEditingId(record.id);
    setEditName(record.name);
    setEditEmail(record.email);
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    const updated = await api.updateRecord(editingId, { name: editName, email: editEmail });
    if (updated) {
      setRecords(prev => prev.map(r => r.id === updated.id ? updated : r));
      setEditingId(null);
      setAlert({ type: "success", message: "Record updated successfully!" });
    } else {
      setAlert({ type: "error", message: "Error updating record." });
    }
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">View Records</h2>
      {alert && <Alert type={alert.type} message={alert.message} />}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : records.length === 0 ? (
        <p className="text-gray-500 mt-4">No records found.</p>
      ) : (
        <ul className="space-y-3">
          {records.map(record => (
            <li key={record.id} className="flex justify-between items-center p-3 bg-gray-100 rounded shadow">
              {editingId === record.id ? (
                <div className="flex flex-col flex-1 mr-4 space-y-2">
                  <input
                    className="p-1 border rounded"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />
                  <input
                    className="p-1 border rounded"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                  />
                </div>
              ) : (
                <span>{record.name} — {record.email}</span>
              )}

              <div className="flex space-x-2">
                {editingId === record.id ? (
                  <>
                    <button onClick={saveEdit} className="text-green-600 hover:underline">Save</button>
                    <button onClick={cancelEdit} className="text-gray-600 hover:underline">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(record)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(record.id)} className="text-red-600 hover:underline">Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
