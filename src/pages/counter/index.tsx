import { Box } from "@mui/material";
import DsButton from "../../components/desine.system/DsButton";
import PageHeader from "../../components/global/PageHeader";
import { useCounterStore } from "../../store/counter.store";
import Parent from "./components/Parent";


const Counter = () => {
    const{increment,decrement}=useCounterStore();
    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <PageHeader
                title="Counter with Zustand"
            />
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    my: 2,
                    flexWrap: "wrap",
                }}
            >
                <DsButton
                    color="primary"
                    size="medium"
                    onClick={increment}
                >
                    Increment
                </DsButton>
                <DsButton
                    color="error"
                    size="medium"
                    onClick={decrement}
                >
                    Decrement
                </DsButton>

            </Box>
            <Parent />

        </Box>
    );
}
export default Counter;