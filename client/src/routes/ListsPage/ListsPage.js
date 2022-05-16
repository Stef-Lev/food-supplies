import React, { useState, useEffect, useContext } from "react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import ListItem from "../../components/ListItem/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import brandBtnStyle from "../../utils/brandBtnStyle";
import { fetchMethod } from "../../utils/fetchMethod";
import { UserContext } from "../../context/UserContext";
import { MessageContext } from "../../context/MessageContext";
import AddListModal from "../../components/AddListModal/AddListModal";
import styles from "./ListsPage.module.css";

function ListsPage() {
  const { user } = useContext(UserContext);
  const { showMessage } = useContext(MessageContext);
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lists, setLists] = useState([
    { id: "0123", name: "Drawer", contains: 12 },
    { id: "0456", name: "Emergency", contains: 34 },
    { id: "0789", name: "Fridge", contains: 0 },
  ]);

  const [newList, setNewList] = useState({ listName: "", id: "", items: [] });

  useEffect(() => {
    // fetchMethod("get", `/api/user/${user._id}`).then((item) =>
    //   setUserList(item.user.list)
    // );
  }, [user._id]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewList({ listName: "", id: "", items: [] });
  };

  const handleInputChange = (event, field) => {
    setNewList({ ...newList, [field]: event.target.value });
  };

  const goToList = (id) => {
    navigate(`/user/list/${id}`);
    // fetchMethod("post", `/api/user/${user._id}/addproduct`, product).then(
    //   () => {
    //     handleModalClose();
    //     fetchMethod("get", `/api/user/${user._id}`).then((item) =>
    //       setUserList(item.user.list)
    //     );
    //   }
    // );
  };

  const addList = () => {
    // fetchMethod("post", `/api/user/${user._id}/addproduct`, product).then(
    //   () => {
    //     handleModalClose();
    //     fetchMethod("get", `/api/user/${user._id}`).then((item) =>
    //       setUserList(item.user.list)
    //     );
    //   }
    // );
  };

  const removeList = (id) => {
    // showMessage("warning", "Delete?", () => {
    //   fetchMethod("delete", `/api/user/${user._id}/deleteproduct/${id}`).then(
    //     () => {
    //       fetchMethod("get", `/api/user/${user._id}`).then((item) =>
    //         setUserList(item.user.list)
    //       );
    //     }
    //   );
    // });
  };

  console.log(newList);

  return (
    <>
      <div className={styles.column}>
        <h2>List</h2>
        <div className={styles.edit_container}>
          <Button
            variant="contained"
            color="primary"
            style={{
              ...brandBtnStyle,
              background: "#57CFCB",
              visibility: isEditMode ? "hidden" : "visible",
            }}
            onClick={handleModalOpen}
          >
            Add new list
          </Button>
          <IconButton
            aria-label="edit"
            className={styles.edit_btn}
            onClick={() => setIsEditMode(!isEditMode)}
            style={{
              border: isEditMode ? "2px solid rgb(237, 95, 95)" : "none",
              boxShadow: isEditMode
                ? "none"
                : "0px 6px 5px -5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <EditIcon style={{ color: isEditMode ? "rgb(237, 95, 95)" : "" }} />
          </IconButton>
        </div>
        {lists.length > 0 &&
          lists.map((item, index) => (
            <ListItem
              key={index + 1}
              item={item}
              onClick={() => (isEditMode ? removeList() : goToList(item.id))}
              isEdited={isEditMode}
            />
          ))}
        {!lists.length && <p>No products added yet.</p>}
        <AddListModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          list={newList}
          onInputChange={handleInputChange}
          addList={addList}
        />
      </div>
    </>
  );
}

export default ListsPage;
