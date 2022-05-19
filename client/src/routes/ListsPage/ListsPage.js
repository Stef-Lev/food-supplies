import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../../components/ListItem/ListItem";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
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
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newList, setNewList] = useState({ listName: "", items: [] });

  useEffect(() => {
    fetchMethod("get", `/api/user/${user._id}`).then((item) => {
      setLists(item.user.lists);
      setLoading(false);
    });
  }, [user._id]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewList({ listName: "", items: [] });
  };

  const handleInputChange = (event, field) => {
    setNewList({ ...newList, [field]: event.target.value });
  };

  const goToList = (id) => {
    navigate(`/user/list/${id}`);
  };

  const addList = () => {
    fetchMethod("post", `/api/user/${user._id}/addlist`, newList).then(() => {
      handleModalClose();
      fetchMethod("get", `/api/user/${user._id}`).then((item) =>
        setLists(item.user.lists)
      );
    });
  };

  const removeList = (id) => {
    showMessage("warning", "Delete list?", () => {
      fetchMethod("delete", `/api/user/${user._id}/deletelist/${id}`).then(
        () => {
          fetchMethod("get", `/api/user/${user._id}`).then((item) => {
            setLists(item.user.lists);
            setIsEditMode(false);
          });
        }
      );
    });
  };

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
        {loading && <AnimatedLoader />}
        {lists.length > 0 &&
          lists.map((item, index) => (
            <ListItem
              key={index + 1}
              item={item}
              onClick={() =>
                isEditMode ? removeList(item._id) : goToList(item._id)
              }
              isEdited={isEditMode}
            />
          ))}
        {!lists.length && !loading && <p>No lists added yet.</p>}
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
