import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import type { ReactNode, ElementType } from 'react';

type PropTypes = TypographyProps & {
  element?: ElementType;
  children?: ReactNode;
};

const DsTypography = ({
  element = 'span',
  children,
  ...props
}: PropTypes) => {
  return (
    <Typography
      {...props}
      component={element}
    >
      {children}
    </Typography>
  );
};

export default DsTypography;