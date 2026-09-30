import Box from '@mui/material/Box';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';

import DsButton from './DsButton';
import DsTypography from './DsTypography';

type DsButtonGroupProps = {
    id: number;
    count: number;
    increase: (id: number) => void;
    decrease: (id: number) => void;
    removeCart: (id: number) => void;
};

const DsButtonGroup = ({
    id,
    count,
    increase,
    decrease,
    removeCart,
}: DsButtonGroupProps) => {
    return (

        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 2,
            }}
        >
            {count > 1 ? (
                <DsButton
                    type="button"
                    size="small"
                    onClick={() => decrease(id)}
                    sx={{
                        minWidth: 36,
                        height: 36,
                        p: 0,
                    }}
                >
                    -
                </DsButton>
            ) : (
                <DsButton
                    type="button"
                    size="small"
                    onClick={() => removeCart(id)}
                    aria-label="Remove item"
                    sx={{
                        minWidth: 36,
                        height: 36,
                        p: 0,
                    }}
                >
                    <DeleteOutlineRounded fontSize="small" />
                </DsButton>
            )}

            <DsTypography
                element="span"
                sx={{
                    minWidth: 30,
                    textAlign: 'center',
                    fontWeight: 600,
                }}
            >
                {count}
            </DsTypography>

            <DsButton
                type="button"
                size="small"
                onClick={() => increase(id)}
                sx={{
                    minWidth: 36,
                    height: 36,
                    p: 0,
                }}
            >
                +
            </DsButton>
        </Box>
    );
};

export default DsButtonGroup;