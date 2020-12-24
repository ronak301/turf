import { Flex } from '@chakra-ui/core';
import styled from '@emotion/styled';
import {
  color,
  ColorProps,
  flex,
  JustifyContentProps,
  space,
  SpaceProps
} from 'styled-system';

import theme from 'theme';

const primary = theme.colors.tableRowPrimary;
const secondary = theme.colors.tableRowSecondary;

export const StyledTable = styled.div<SpaceProps & { emptyRowsCount?: number }>`
  ${space};
  flex: 1;
  width: 100%;
  display: flex;
  max-width: 100%;
  border-radius: 4px;
  flex-direction: column;
  box-sizing: border-box;
`;

export const StyledTableRowContainer = styled.div<
  SpaceProps & { emptyRowsCount?: number }
>`
  min-height: ${({ emptyRowsCount = 0 }) => emptyRowsCount * 35}px;
  position: before;
  pointer-event: none;
  background: linear-gradient(
    0deg,
    ${primary} 50%,
    ${primary} 50%,
    ${secondary} 50%,
    ${secondary}
  );
  background-size: 35px 70px;
  background-repeat: repeat;
  height: 100%;
  width: 100%;
`;

export const TableHead = styled.div<SpaceProps>`
  ${space};
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: #003238;

  height: 40px;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const TableCell = styled<
  'div',
  SpaceProps &
    ColorProps &
    JustifyContentProps & { isRowSelectionCell: boolean }
>('div')`
  ${space};
  ${color};
  ${(props) => {
    if (props.isRowSelectionCell) {
      return 'flex: 0 0 30px; justify-content: center;';
    }

    return `flex: ${props.width || 1}`;
  }};

  margin-left: 10px;
  margin-right: 10px;
  min-height: 30px;

  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableRow = styled(Flex)<{ clickable: boolean }>`
  ${flex};

  height: 35px;
  font-family: Averta, serif;
  display: flex;
  flex: 1;

  &:hover {
    background-color: #5d8180;

    ${(props) => (props.clickable ? 'cursor: pointer;' : '')}
  }
`;

export const NoContent = styled(Flex)`
  display: flex;
  padding: 5px;
  justify-content: center;
  position: absolute;
  width: 100%;
  text-align: center;
`;
