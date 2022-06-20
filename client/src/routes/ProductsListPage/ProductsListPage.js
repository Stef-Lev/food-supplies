import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import Fuse from "fuse.js";
import ProductItem from "../../components/ProductItem/ProductItem";
import AddIconButton from "../../components/AddIconButton/AddIconButton";
import ScrollTopButton from "../../components/ScrollTopButton/ScrollTopButton";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import ItemsFilter from "../../components/ItemsFilter/ItemsFilter";
import { fetchMethod } from "../../utils/fetchMethod";
import soundfile from "../../sounds/blip.mp3";
import { UserContext } from "../../context/UserContext";
import { MessageContext } from "../../context/MessageContext";
import { FormattedMessage } from "react-intl";
import styles from "./ProductsListPage.module.css";

function ProductsListPage() {
  const { user } = useContext(UserContext);
  const { showMessage } = useContext(MessageContext);
  const { listid } = useParams();
  const audio = new Audio(soundfile);
  const [modalOpen, setModalOpen] = useState(false);
  const [scannerOn, setScannerOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    barcode: "",
    expires: new Date(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [userList, setUserList] = useState([]);

  const fuse = new Fuse(userList, {
    keys: ["product.title"],
    includeScore: true,
  });

  const results = fuse.search(searchTerm);

  const byNameResults = searchTerm
    ? results.filter((item) => item.score < 0.5).map((item) => item.item)
    : userList;

  const getProductList = useCallback(
    (arr) => {
      if (arr.length > 0) {
        const foundList = arr.find((item) => item._id === listid);
        return foundList.items;
      }
      return [];
    },
    [listid]
  );

  const getListName = (lists) => {
    return lists.find((list) => list._id === listid).listName;
  };

  useEffect(() => {
    let mounted = true;
    fetchMethod("get", `/api/user/${user._id}`)
      .then((data) => {
        if (mounted) {
          setUserList(getProductList(data.user.lists));
          setLoading(false);
        }
      })
      .catch(() => {
        setUserList([]);
        setLoading(false);
      });
    return () => (mounted = true);
  }, [user._id, getProductList]);

  useEffect(() => {
    if (product.barcode) {
      setScannerOn(false);
    } else {
      setScannerOn(true);
    }
  }, [product, setScannerOn]);

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
    fetchMethod("post", `/api/user/${user._id}/addproduct/${listid}`, product)
      .then(() => {
        handleModalClose();
        fetchMethod("get", `/api/user/${user._id}`).then((data) =>
          setUserList(getProductList(data.user.lists))
        );
      })
      .catch(() => {
        showMessage(
          "error",
          <FormattedMessage
            id="generic.error"
            defaultMessage="Something went wrong. Please try again later."
          />
        );
      });
  };

  const removeProductFromList = (itemId, productId) => {
    showMessage(
      "warning",
      <FormattedMessage
        id="snackbar.message.deleteProduct"
        defaultMessage="Delete product?"
      />,
      () => {
        fetchMethod(
          "delete",
          `/api/user/${user._id}/list/${listid}/item/${itemId}/product/${productId}`
        ).then(() => {
          fetchMethod("get", `/api/user/${user._id}`).then((data) =>
            setUserList(getProductList(data.user.lists))
          );
        });
      }
    );
  };

  console.log(userList);

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
        {!loading && (
          <h2 className={styles.list_title}>{getListName(user?.lists)}</h2>
        )}
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
        {!byNameResults.length && !loading && (
          <p>
            <FormattedMessage
              id="error.list.noProducts"
              defaultMessage="No products added yet"
            />
          </p>
        )}
        {loading && <AnimatedLoader />}
      </div>
      <AddIconButton handleClick={handleModalOpen} />
      <ScrollTopButton />
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
