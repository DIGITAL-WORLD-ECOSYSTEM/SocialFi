import { styled, alpha } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';

export const StyledMuiOtpInput = styled(MuiOtpInput);

export const StyledCodeInput = styled(OutlinedInput)(({ theme }) => ({
  width: 40,
  height: 56,
  padding: 0,
  margin: theme.spacing(0, 0.5),
  '& input': {
    textAlign: 'center',
    padding: 0,
  },
}));
