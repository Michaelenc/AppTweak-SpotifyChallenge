import { useDispatch } from "react-redux";
import { back } from "./song/songSlice";

export default function BackButton({
  backDirection,
  backId
}: {
  backDirection: string;
  backId: string;
}) {
  const dispatch = useDispatch();
  return (
    <button
      id="backButton"
      className="button"
      onClick={() => dispatch(back({ backDirection: backDirection, backId: backId }))}
    >
      Go back
    </button>
  );
}
