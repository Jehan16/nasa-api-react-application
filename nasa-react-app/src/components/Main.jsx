export default function Main(props) {
  const { data } = props;

  return (
    <div className="imgContainer">
      {data.media_type === "image" ? (
        <img
          src={data.url}
          alt={data.title || "background-image"}
          className="bgImage"
        />
      ) : (
        <iframe
          src={data.url}
          title={data.title || "background-video"}
          className="bgImage"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ width: "100%", height: "500px" }}
        />
      )}
    </div>
  );
}
