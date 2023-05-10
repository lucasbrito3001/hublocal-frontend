import { Button } from "@mui/material";
import { EmptyView } from "./styled";

export default function EmptyListView({ text, textButton, onClick }) {
    return (
        <EmptyView>
            <h1>{text}</h1>
            <Button variant="contained" color="primary" onClick={onClick}>{textButton}</Button>
        </EmptyView>
    )
}