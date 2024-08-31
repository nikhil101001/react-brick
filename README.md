# react-brick

A React component for creating a masonry grid layout.

## Demo

## Installation

```bash
npm install react-brick
```

## Usage

```jsx
import React from "react";
import { BrickGrid } from "react-brick";

const data = [
  {
    id: 1,
    title: "Title 1",
    description: "Description 1",
  },
  {
    id: 2,
    title: "Title 2",
    description: "Description 2",
  },
  {
    id: 3,
    title: "Title 3",
    description: "Description 3",
  },
    ...
];

const App = () => {
  return (
    <BrickGrid data={data} title="My Grid" />
  );
};

export default App;
```

## Props

- `data`: An array of objects representing the data to be displayed in the grid.
- `title`: (Optional) A string to be displayed as the title of the grid.

## License

MIT
