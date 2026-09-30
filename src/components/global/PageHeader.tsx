import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import DsTypography from '../desine.system/DsTypography';
import DsButton from '../desine.system/DsButton';


type PageHeaderProps = {
    title: string;
    back?: boolean;
};

const PageHeader = ({
    title,
    back = false,
}: PageHeaderProps) => {
    const navigate = useNavigate();

    return (
        <Stack 
        direction= "row"
            sx={{
                mb: 3,
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <DsTypography
                variant="h4"
                element="h1"
               sx={{
                 fontWeight:700
               }}
            >
                {title}
            </DsTypography>

            {back && (
                <DsButton
                    variant="outlined"
                    onClick={() => navigate(-1)}
                >
                    Back
                </DsButton>
            )}
        </Stack>
    );
};

export default PageHeader;