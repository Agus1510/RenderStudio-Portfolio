import React from "react";
import style from "./addRoom.module.css";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setAddRoom } from "../../../../redux/reducer";
import { createRoom, getAllRooms } from "../../../../redux/actions";

function AddRoom() {
  const [input, setInput] = useState({});
  const [logError, setLogError] = useState({});
  const dispatch = useDispatch();
  const [images, setImages] = React.useState([]);
  const { addRoom } = useSelector((state) => state.reducerCompleto);
  const handleAdd = () => {
    dispatch(setAddRoom(false));
    dispatch(getAllRooms());
  };
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const token = useSelector((state) => state.reducerCompleto.authToken);

  const workOnChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const dis = await dispatch(
      createRoom({
        productData: {
          name: input.name,
          image: images,
        },
        token,
      })
    );

    var response = dis.payload;
    if (response.success === true) {
      setLogError({});
      navigateTo("/admin");
    } else {
      setLogError({ err: response.info });
    }
  };
  return (
    <div className={style.container}>
      <div className={style.flexContainer}>
        <button className={style.close} onClick={() => handleAdd()}>
          X
        </button>
        <h1> Add Room</h1>
        <span></span>
        <form
          className={style.form}
          onChange={(e) => workOnChange(e)}
          onSubmit={(e) => handleSubmit(e)}
          autoComplete="off"
        >
          <label className={style.title}>Project name</label>
          <div className={style.input}>
            <input type="text" placeholder="Room name" name="name" />
          </div>
          <label className={style.title}>Image</label>
          <div className={style.inputImage}>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <button
                    type="button"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>
                  &nbsp;
                  <button onClick={onImageRemoveAll}>Remove all images</button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button
                          type="button"
                          onClick={() => onImageUpdate(index)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => onImageRemove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>
          <button type="submit" className={style.button2}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
