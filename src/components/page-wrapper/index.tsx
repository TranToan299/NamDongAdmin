import { Box } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';

type PageWrapperProps = {
  children: React.ReactNode;
  meta?: string;
  title: string;
};

const PageWrapper = ({ children, title, meta, ...other }: PageWrapperProps) => {
  return (
    <>
      <Helmet>
        <title> {title} | Nam Dong</title>
        {meta}
      </Helmet>

      <Box {...other}>{children}</Box>
    </>
  );
};

export default PageWrapper;
