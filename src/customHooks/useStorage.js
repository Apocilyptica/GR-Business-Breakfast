import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storage, firestore, timestamp } from "../firebase/utils";
import { v4 as uuidv4 } from "uuid";

const mapState = ({ user }) => ({
  userId: user.currentUser.id,
});

const useStorageAdd = (file) => {
  const { userId } = useSelector(mapState);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const uuid = uuidv4();
    const filePath = "users/" + userId + "/" + uuid;
    const storageRef = storage.ref(filePath);
    const collectionRef = firestore.collection(`users/${userId}/images`);

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt, uuid });
        setUrl(url);
      }
    );
  }, [file, userId]);

  return { progress, url, error };
};

const useStorageDelete = (id, uuid) => {
  const { userId } = useSelector(mapState);

  useEffect(() => {
    const filePath = "users/" + userId + "/" + uuid;
    const storageRef = storage.ref(filePath);
    const collectionRef = firestore.collection(`users/${userId}/images`);

    collectionRef.doc(id).delete();
    storageRef.delete();
  }, [id, userId, uuid]);
};

export { useStorageAdd, useStorageDelete };
