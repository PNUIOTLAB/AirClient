import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


export default function BasicButtons() {
  return (
      <FormGroup 
        row 
        sx={{ml:10}}
      >
        <FormControlLabel control={<Switch defaultChecked />} label="에어컨" sx={{color : 'text.primary'}}/>
        <FormControlLabel control={<Switch defaultChecked />} label="보일러" sx={{color : 'text.primary'}}/>
        <FormControlLabel control={<Switch defaultChecked />} label="가습기" sx={{color : 'text.primary'}}/>
        <FormControlLabel control={<Switch defaultChecked />} label="제습기" sx={{color : 'text.primary'}}/>
        <FormControlLabel control={<Switch defaultChecked />} label="공기청정기" sx={{color : 'text.primary'}}/>
        <FormControlLabel control={<Switch defaultChecked />} label="실외기" sx={{color : 'text.primary'}}/>
      </FormGroup>
  );
}