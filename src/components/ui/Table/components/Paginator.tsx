import { Box, Text } from '@chakra-ui/core';
import React from 'react';

import SelectBox from '../../forms/Select';
import { DownIcon, UpIcon } from 'assets/icons';
import theme from 'theme';

const defaultSizes = [10, 20, 50, 100, 250, 500];

type PaginationProps = {
  setPageSize: (size: number) => void;
  gotoPage: (index: number) => void;

  canNextPage: boolean;
  canPrevPage: boolean;

  page: number;
  pageSize: number;
  pageCount: number;

  sizes?: number[];
};

export default function Paginator({
  gotoPage,
  pageSize,
  setPageSize,
  page,
  pageCount,
  canNextPage,
  canPrevPage,
  sizes = defaultSizes
}: PaginationProps) {
  return (
    <Box mt={5} d="flex" alignItems="center" justifyContent="center">
      <Box
        d="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Text px={3}>Page</Text>
        <Counter
          label={page + 1}
          onClickUp={() => canNextPage && gotoPage(page + 1)}
          onClickDown={() => canPrevPage && gotoPage(page - 1)}
        />
        <Text px={3}>of {pageCount}</Text>
        <SelectBox
          boxProps={{
            ml: 10,
            mb: 0
          }}
          label=""
          height={36}
          width={150}
          letterSpacing={null}
          options={sizes.map((s) => ({ id: s, label: `${s} rows` }))}
          value={pageSize.toString()}
          onChange={(value: any) => {
            setPageSize(parseInt(value, 10));
          }}
        />
      </Box>
    </Box>
  );
}

type CounterProps = {
  label?: string | number;
  onClickUp: () => void;
  onClickDown: () => void;
};

const Counter = ({ label, onClickUp, onClickDown }: CounterProps) => (
  <Box
    backgroundColor={theme.colors.lightBackground}
    borderRadius={5}
    d="flex"
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
  >
    <Text width={10} textAlign="center">
      {label}
    </Text>
    <Box py="4px">
      <Box
        onClick={onClickUp}
        backgroundColor="#075E69"
        borderTopLeftRadius={5}
        borderTopRightRadius={5}
        px={1}
        py="2px"
      >
        <UpIcon width={8} height={8} />
      </Box>
      <Box
        onClick={onClickDown}
        backgroundColor="#075E69"
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        px={1}
        py="2px"
        mt="2px"
      >
        <DownIcon width={8} height={8} />
      </Box>
    </Box>
  </Box>
);
