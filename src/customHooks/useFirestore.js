import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../firebase/utils";

const mapState = ({ user }) => ({
  userId: user.currentUser.id,
});

export const useFirestore = (collection) => {
  const { userId } = useSelector(mapState);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = firestore
      .collection("users/" + userId + "/" + collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [collection, userId]);
  return { docs };
};
