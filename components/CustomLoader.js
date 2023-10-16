import { PropagateLoader } from "react-spinners"
export default function CustomLoader() {
    return (
        <div className="backDropMain w-screen h-screen scroll flex justify-center items-center">
            <PropagateLoader color="#793FDF" size={20} />
        </div>
    )
}