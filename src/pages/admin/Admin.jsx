import { useRef, useState } from "react";
import "./Admin.css";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Admin = () => {
  const brandRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const imgRef = useRef();
  const rateRef = useRef();
  const [img, setImg] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();
    const brand = brandRef.current.value;
    const price = +priceRef.current.value;
    const name = nameRef.current.value;
    const description = descRef.current.value;
    const ratings = +rateRef.current.value;

    const uploadFile = async (file) => {
      if (!file) return;
      const storageRef = ref(storage, `${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => setImg(url))
        .catch((e) => console.log(e.message));
    };
    try {
      const image = await uploadFile(e.target[0].files[0]);
      const docRef = await addDoc(collection(db, "products"), {
        brand: brand,
        name: name,
        description: description,
        price: price,
        ratings: ratings,
        imgUrl: img,
      });
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <form onSubmit={addProduct} className="admin-form">
      <input type="file" placeholder="image" ref={imgRef} />
      <input type="text" placeholder="Brand" ref={brandRef} />
      <input type="text" placeholder="Description" ref={descRef} />
      <input type="text" placeholder="price" ref={priceRef} />
      <input type="text" placeholder="name" ref={nameRef} />
      <input type="text" placeholder="ratings" ref={rateRef} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default Admin;
