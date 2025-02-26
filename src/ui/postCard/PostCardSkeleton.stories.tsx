import type { Meta, StoryObj } from '@storybook/react';

import PostCardSkeleton from './PostCardSkeleton';

const meta = {
  component: PostCardSkeleton,
} satisfies Meta<typeof PostCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};