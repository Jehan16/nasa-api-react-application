export default function Main(props) {
    const { data } = props

    return (
        <div className="imgContainer">
            <iframe src={data.url} alt={data.title || "background-image"} className="bgImage" />
        </div>
    )
}