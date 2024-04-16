import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

export default function Alerts({types,msg,status}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    status(false);
  };

  setTimeout(handleClose,5000)
  return (
    <Stack sx={{ width: '95%' }} spacing={2}>
      {open && (
        <Alert severity={types} onClose={handleClose}>
          {msg}
        </Alert>
      )}
    </Stack>
  );
}
