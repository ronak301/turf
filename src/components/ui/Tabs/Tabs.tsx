/**
 * wrapper of https://chakra-ui.com/docs/components/tabs
 */
import React from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as TabsCore,
  TabsProps as TabsCoreProps
} from '@chakra-ui/core';

import theme from 'theme';
import Typography from '../Typography';

type TabType = { id: string; label: string };
type TabsProps = Omit<Partial<TabsCoreProps>, 'onChange'> & {
  items: TabType[];
  onChange: (tab: TabType) => any;
  children?: typeof TabPanel[];
};

const TAB_FOCUS_BOX_SHADOW = { boxShadow: 'none' };
const TAB_ITEM_HORIZONTAL_SPACING = 8;
const TAB_ITEM_CONTENT_SPACING = 6;

const TabItem: React.FC<
  React.ComponentProps<typeof Tab> & { isSelected?: boolean }
> = React.forwardRef((props, ref) => {
  const color = theme.colors.primary;
  const decorationProps = props.isSelected
    ? {
        borderBottomWidth: 2,
        borderBottomColor: color,
        color
      }
    : {
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        color: theme.colors.text
      };

  return (
    <Tab
      ref={ref}
      paddingX={0}
      marginRight={TAB_ITEM_HORIZONTAL_SPACING}
      _focus={TAB_FOCUS_BOX_SHADOW}
      {...props}
      {...decorationProps}
    >
      <Typography variant="tabs" color={decorationProps.color}>
        {props.children}
      </Typography>
    </Tab>
  );
});

const Tabs: React.FC<TabsProps> & {
  Item: typeof Tab;
  Panel: typeof TabPanel;
} = ({ children, items, onChange, ...props }) => {
  const onTabChange = React.useCallback(
    (index) => {
      return onChange(items[index]);
    },
    [items, onChange]
  );

  return (
    <TabsCore
      variant="unstyled"
      fontFamily={theme.fonts.heading}
      color={theme.colors.text}
      onChange={onTabChange}
      {...props}
    >
      <TabList marginBottom={TAB_ITEM_CONTENT_SPACING}>
        {items.map(({ id, label }) => (
          <TabItem id={id} key={id}>
            {label}
          </TabItem>
        ))}
      </TabList>

      <TabPanels>{children}</TabPanels>
    </TabsCore>
  );
};

Tabs.Item = TabItem;
Tabs.Panel = TabPanel;

export default Tabs;
