const ImageModal = ({ Image, Toggle, setToggle }) => {
  return (
    <div className="d-none d-sm-block ">
      {/***************** modal *****************/}
      <div
        hidden={Toggle}
        className="  p-5  text-center w-100 position-absolute top-0 start-0 h-100 "
        style={{ zIndex: 5, background: "#00000090" }}
      >
        <button
          className="btn position-absolute text-warning "
          onClick={(e) => {
            e.preventDefault();
            setToggle(true);
          }}
        >
          <h3>X</h3>
        </button>
        <img
          className="rounded "
          src={Image}
          style={{ height: "100%", zIndex: 2, opacity: 100 }}
        />
      </div>
      {/***************** end modal *****************/}
    </div>
  );
};

export default ImageModal;
