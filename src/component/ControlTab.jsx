import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtons() {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button variant="contained">에어컨</Button>
      <Button variant="contained">보일러</Button>
      <Button variant="contained">제습기</Button>
      <Button variant="contained">가습기</Button>
      <Button variant="contained">공기청정기</Button>
      <Button variant="contained">실외기</Button>
    </ButtonGroup>
  );
}