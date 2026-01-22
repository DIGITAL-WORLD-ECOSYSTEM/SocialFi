'use client';

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { usePopover } from 'src/components/custom-popover/hooks';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  sort: string;
  onSort: (newValue: string) => void;
  sortOptions: { value: string; label: string }[];
};

export function PostSort({ sort, onSort, sortOptions, sx, ...other }: Props) {
  const popover = usePopover();

  // Agora buscamos a opção selecionada dentro da lista dinâmica recebida via props
  const selectedOption = sortOptions.find((option) => option.value === sort);

  return (
    <>
      <Box sx={sx} {...other}>
        <Button
          disableRipple
          color="inherit"
          onClick={popover.onOpen}
          endIcon={
            <Iconify
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          }
          sx={{ fontWeight: 'fontWeightSemiBold', textTransform: 'capitalize' }}
        >
          Sort by:
          <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold' }}>
            {selectedOption?.label}
          </Box>
        </Button>
      </Box>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        sx={{ width: 140 }}
      >
        <MenuList>
          {sortOptions.map((option) => (
            <MenuItem
              key={option.value}
              selected={sort === option.value}
              onClick={() => {
                popover.onClose();
                onSort(option.value);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}