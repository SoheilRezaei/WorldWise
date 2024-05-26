import Button from "./Button.tsx";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <Button type="back" onClick={(e)=> {
            e.preventDefault();
            navigate(-1);
        }}>&larr; Back</Button>
    )
}