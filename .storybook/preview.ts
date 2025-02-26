import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import type { Preview } from '@storybook/react'
import React from "react";

const preview: Preview = {
  decorators: [
    (Story) => (
      React.createElement(ChakraProvider, {
        children: React.createElement(Story),
        value: defaultSystem
      })
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;