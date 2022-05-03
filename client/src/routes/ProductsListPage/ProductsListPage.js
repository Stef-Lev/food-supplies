import React, { useState, useEffect, useContext } from "react";
import Fuse from "fuse.js";
import ProductItem from "../../components/ProductItem/ProductItem";
import AddIconButton from "../../components/AddIconButton/AddIconButton";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import ItemsFilter from "../../components/ItemsFilter/ItemsFilter";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [userList, setUserList] = useState(user.list);

  const fuse = new Fuse(userList, {
    keys: ["product.title"],
    includeScore: true,
  });

  const results = fuse.search(searchTerm);

  const byNameResults = searchTerm
    ? results.filter((item) => item.score < 0.5).map((item) => item.item)
    : userList;

  useEffect(() => {
    fetchMethod("get", `/api/user/${user._id}`).then((item) =>
      setUserList(item.user.list)
    );
  }, [user._id]);

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
      () => {
        handleModalClose();
        fetchMethod("get", `/api/user/${user._id}`).then((item) =>
          setUserList(item.user.list)
        );
      }
    );
  };

  const removeProductFromList = (id) => {
    fetchMethod("delete", `/api/user/${user._id}/deleteproduct/${id}`).then(
      () => {
        fetchMethod("get", `/api/user/${user._id}`).then((item) =>
          setUserList(item.user.list)
        );
      }
    );
  };

  return (
    <>
      <ItemsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        userList={userList}
        setUserList={setUserList}
      />
      <div className={styles.column}>
        {byNameResults
          .sort((a, b) => {
            switch (filter) {
              case "name":
                return a.product.title.localeCompare(b.product.title);
              case "exp":
                return a.expires.localeCompare(b.expires);
              default:
                return a._id.localeCompare(b._id);
            }
          })
          .map((item, index) => (
            <ProductItem
              key={index + 1}
              item={item}
              onClick={removeProductFromList}
            />
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
