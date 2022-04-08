import React, { useState, useContext } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import AddIconButton from "../../components/AddIconButton/AddIconButton";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import { fetchMethod } from "../../utils/fetchMethod";
import soundfile from "../../sounds/blip.mp3";
import { UserContext } from "../../context/UserContext";
import styles from "./ProductsListPage.module.css";

function ProductsListPage() {
  const { user } = useContext(UserContext);
  const audio = new Audio(soundfile);
  const [modalOpen, setModalOpen] = useState(false);
  const [scannerOn, setScannerOn] = useState(false);
  const [product, setProduct] = useState({
    barcode: "",
    expires: "",
  });

  const handleScannedResult = (error, result) => {
    if (result) {
      setProduct({ ...product, barcode: result.text });
      audio.play();
      window.navigator.vibrate(100);
      setScannerOn(false);
    }
  };

  const handleInputChange = (event, field) => {
    setProduct({ ...product, [field]: event.target.value });
  };

  const handleModalOpen = () => {
    setScannerOn(true);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setProduct({
      barcode: "",
      expires: "",
    });
  };

  const addProductToList = () => {
    fetchMethod("post", `/api/user/${user._id}/addproduct`, product).then(
      (res) => console.log(res)
    );
  };

  return (
    <>
      <div className={styles.column}>
        {user?.list.map((item, index) => (
          <ProductItem key={index + 1} item={item} />
        ))}
      </div>
      <AddIconButton handleClick={handleModalOpen} />
      <AddProductModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        product={product}
        scannerOn={scannerOn}
        onScan={handleScannedResult}
        onInputChange={handleInputChange}
        addProductToList={addProductToList}
      />
    </>
  );
}

export default ProductsListPage;
