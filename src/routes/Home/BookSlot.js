import { Box, Input, Text } from "@chakra-ui/core";
import React from "react";
import theme from "theme";

export default function BookSlot() {
  const GenericFormProps = {
    fontSize: 16,
    fontFamily: "Averta",
    color: "white",
    borderColor: "transparent",
    backgroundColor: theme.colors.lightBackground,
    height: "32px",
    mb: 0,

    _placeholder: {
      color: "rgba(249, 249, 249, 0.8)",
    },

    _focus: {
      borderColor: "white",
    },
    height: "32px",
  };
  return (
    <Box
      flex={1}
      d="flex"
      flexDirection="column"
      background={theme.colors.darkColor}
      h={100}
      alignItems="center"
      justifyContent="center"
    >
      <Text>BOOK A SLOT</Text>
      <Box
        backgroundColor={theme.colors.semiDarkBackground}
        borderRadius={4}
        width="100%"
      >
        <Input
          autoComplete="no"
          spellCheck="false"
          borderRadius={4}
          focusBorderColor="white"
          onChange={(event) => {
            event.persist();
            // onChange?.(event?.target?.value);
          }}
          width="100%"
          autoCorrect="off"
          placeholder={"Select date"}
          borderWidth={1}
          {...GenericFormProps}
          mb={0}
        />
      </Box>
    </Box>
  );
}
