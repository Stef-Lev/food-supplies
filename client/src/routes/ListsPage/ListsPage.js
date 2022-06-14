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
import EditListModal from "../../components/EditListModal/EditListModal";
import { FormattedMessage } from "react-intl";
import styles from "./ListsPage.module.css";

function ListsPage() {
  const { user } = useContext(UserContext);
  const { showMessage, handleCloseMessage } = useContext(MessageContext);
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newList, setNewList] = useState({ listName: "", items: [] });
  const [editedList, setEditedList] = useState({});

  useEffect(() => {
    fetchMethod("get", `/api/user/${user._id}`).then((item) => {
      setLists(item.user.lists);
      setLoading(false);
    });
  }, [user._id]);

  const handleModalOpen = (type) => {
    switch (type) {
      case "add":
        setModalAddOpen(true);
        break;
      case "edit":
        setModalEditOpen(true);
        break;
      default:
        return;
    }
  };

  const handleModalClose = (type) => {
    switch (type) {
      case "add":
        setModalAddOpen(false);
        setNewList({ listName: "", items: [] });
        handleCloseMessage();
        break;
      case "edit":
        setModalEditOpen(false);
        handleCloseMessage();
        break;
      default:
        return;
    }
  };

  const handleInputChange = (event, field) => {
    setNewList({ ...newList, [field]: event.target.value });
  };

  const handleUpdatedListName = (event) => {
    const currentList = editedList;
    setEditedList({ ...currentList, listName: event.target.value });
  };

  const goToList = (id) => {
    navigate(`/user/list/${id}`);
  };

  const addList = () => {
    fetchMethod("post", `/api/user/${user._id}/addlist`, newList).then(() => {
      handleModalClose("add");
      fetchMethod("get", `/api/user/${user._id}`).then((item) =>
        setLists(item.user.lists)
      );
    });
  };

  const removeList = (id) => {
    showMessage(
      "warning",
      <FormattedMessage
        id="snackbar.message.deleteList"
        defaultMessage="Delete List?"
      />,
      () => {
        fetchMethod("delete", `/api/user/${user._id}/deletelist/${id}`).then(
          () => {
            fetchMethod("get", `/api/user/${user._id}`).then((item) => {
              setLists(item.user.lists);
              setIsEditMode(false);
              handleModalClose("edit");
            });
          }
        );
      }
    );
  };

  const openEditModal = (id) => {
    if (isEditMode) {
      const foundList = lists.find((item) => item._id === id);
      setEditedList(foundList);
      handleModalOpen("edit");
    }
  };

  const editList = (id) => {
    console.log(id);
    fetchMethod(
      "update",
      `/api/user/${user._id}/editlist/${id}`,
      editedList
    ).then(() => {
      fetchMethod("get", `/api/user/${user._id}`).then((item) => {
        setLists(item.user.lists);
        setIsEditMode(false);
        handleModalClose("edit");
      });
    });
  };

  return (
    <>
      <div className={styles.column}>
        <h2 className={styles.title}>
          <FormattedMessage
            id="lists.page.button.title"
            defaultMessage="Lists"
          />
        </h2>
        <div className={styles.edit_container}>
          <Button
            variant="contained"
            color="primary"
            style={{
              ...brandBtnStyle,
              background: "#57CFCB",
              visibility: isEditMode ? "hidden" : "visible",
            }}
            onClick={() => handleModalOpen("add")}
          >
            <FormattedMessage
              id="lists.page.button.add"
              defaultMessage="Add new list"
            />
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
                isEditMode ? openEditModal(item._id) : goToList(item._id)
              }
              isEdited={isEditMode}
            />
          ))}
        {!lists.length && !loading && (
          <p>
            <FormattedMessage
              id="reports.page.noLists"
              defaultMessage="No lists added yet"
            />
          </p>
        )}
        <AddListModal
          isOpen={modalAddOpen}
          onClose={() => handleModalClose("add")}
          list={newList}
          onInputChange={handleInputChange}
          addList={addList}
        />
        <EditListModal
          isOpen={modalEditOpen}
          onClose={() => handleModalClose("edit")}
          onInputChange={handleUpdatedListName}
          list={editedList}
          onRemoveList={removeList}
          onSave={editList}
        />
      </div>
    </>
  );
}

export default ListsPage;
