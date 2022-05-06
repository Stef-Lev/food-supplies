import React, { useState, useEffect, useContext } from "react";
import Fuse from "fuse.js";
import ProductItem from "../../components/ProductItem/ProductItem";
import AddIconButton from "../../components/AddIconButton/AddIconButton";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import ItemsFilter from "../../components/ItemsFilter/ItemsFilter";
import { fetchMethod } from "../../utils/fetchMethod";
import soundfile from "../../sounds/blip.mp3";
import { UserContext } from "../../context/UserContext";
import { MessageContext } from "../../context/MessageContext";
import styles from "./ProductsListPage.module.css";

function ProductsListPage() {
  const { user } = useContext(UserContext);
  const { showMessage } = useContext(MessageContext);
  const audio = new Audio(soundfile);
  const [modalOpen, setModalOpen] = useState(false);
  const [scannerOn, setScannerOn] = useState(false);
  const [product, setProduct] = useState({
    barcode: "",
    expires: new Date(),
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

  const handleExpirationDateChange = (date) => {
    setProduct({ ...product, expires: date });
  };

  const handleModalOpen = () => {
    setScannerOn(true);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setProduct({
      barcode: "",
      expires: new Date(),
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
    showMessage("warning", "Delete?", () => {
      fetchMethod("delete", `/api/user/${user._id}/deleteproduct/${id}`).then(
        () => {
          fetchMethod("get", `/api/user/${user._id}`).then((item) =>
            setUserList(item.user.list)
          );
        }
      );
    });
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
        {byNameResults.length > 0 &&
          byNameResults
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
        {!byNameResults && <p>No products added</p>}
      </div>
      <AddIconButton handleClick={handleModalOpen} />
      <AddProductModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        product={product}
        scannerOn={scannerOn}
        onScan={handleScannedResult}
        onInputChange={handleInputChange}
        onDateChange={handleExpirationDateChange}
        addProductToList={addProductToList}
      />
    </>
  );
}

export default ProductsListPage;
