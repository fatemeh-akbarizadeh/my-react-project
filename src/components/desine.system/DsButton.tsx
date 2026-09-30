import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";

import type { ButtonProps } from "@mui/material/Button";
import type { ReactNode } from "react";

type PropTypes = ButtonProps & {
  tooltip?: string;
  loading?: boolean;
  children?: ReactNode;
};

const DsButton = ({
  tooltip = "",
  variant = "contained",
  size = "large",
  loading = false,
  disabled = false,
  children,
  ...props
}: PropTypes) => {
  return (
    <Tooltip title={tooltip}>
      <span>
        <Button
          {...props}
          variant={variant}
          size={size}
          disabled={disabled || loading}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            ...props.sx,
          }}
        >
          {loading && (
            <CircularProgress
              size={18}
              color="inherit"
              sx={{ mr: 1 }}
            />
          )}

          {children}
        </Button>
      </span>
    </Tooltip>
  );
};

export default DsButton;