'use client';

import { useEffect, useState } from 'react';
import {
        collection,
        addDoc,
        getDocs,
        updateDoc,
        deleteDoc,
        doc,
         } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function FirestoreCrudExample() {
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({ name: '', age: '' });
  const usersRef = collection(db, 'users');
  const fetchUsers = async () => {
    const snapshot = await getDocs(usersRef);
    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(docs);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async () => {
    await addDoc(usersRef, {
      name: newUser.name,
      age: Number(newUser.age),
    });
    setNewUser({ name: '', age: '' });
    fetchUsers();
  };

  const handleUpdate = async (id: string) => {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, { name: 'Updated Name' });
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Firestore User List</h2>

      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-1"
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
          className="border p-1"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-2 py-1 rounded">
          Add Use123123123
        </button>
      </div>

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded">
            <div>
              <strong>{user.name}</strong> – Age: {user.age}
            </div>
            <button onClick={() => handleUpdate(user.id)} className="text-sm text-green-600 mr-2">
              Update
            </button>
            <button onClick={() => handleDelete(user.id)} className="text-sm text-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
