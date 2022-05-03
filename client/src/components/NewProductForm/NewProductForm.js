import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function NewProductForm({ product, setProduct, onSubmit }) {
  const { title, barcode, imageUrl } = product;

  const handleInputChange = (event, field) => {
    setProduct({ ...product, [field]: event.target.value });
  };

  return (
    <div>
      <form>
        <TextField
          id="new-prd-title"
          label="Title"
          variant="outlined"
          autoComplete="off"
          value={title}
          onChange={(e) => handleInputChange(e, "title")}
          fullWidth
        />
        <TextField
          id="new-prd-barcode"
          label="Barcode"
          variant="outlined"
          autoComplete="off"
          value={barcode}
          fullWidth
        />
        <TextField
          id="new-prd-imageUrl"
          label="Image Url (Optional)"
          variant="outlined"
          autoComplete="off"
          value={imageUrl}
          onChange={(e) => handleInputChange(e, "imageUrl")}
          fullWidth
        />
        <Button type="submit" fullWidth className="auth-btn" onClick={onSubmit}>
          ADD PRODUCT
        </Button>
      </form>
    </div>
  );
}

export default NewProductForm;
