# Qwik Router

A super minimal, zero-dependency, router component for Qwik webapps.

# Install

```shell
$ npm i qwik-router     # with npm
$ yarn add qwik-router  # with yarn
```

# Overview

- `<Router> ... </Router>`, wrap your app to create a router context.
- `const path = useRouterPath()`, hook to access the current path to conditionally show components.
- `<Link href="/my-page">My Page</Link>`, to create a router aware `<a>` tag to navigate around.

# Usage

Wrap your app with a Router component that creates a RouterContext.

```tsx
// root.tsx

import { component$ } from "@builder.io/qwik";
import { Router } from "qwik-router";
import { App } from "./app";

export const Root = component$(() => {
  return (
    <Router>
      <App />
    </Router>
  )
});
```

Then conditionally render components based on the current path from the RouterContext.

```tsx
// app.tsx

import { component$ } from "@builder.io/qwik";
import { useRouterPath } from "qwik-router";

export const App = component$(() => {
  const path = useRouterPath();

  if (path === "/") {
    return <div>Home Route</div>;
  } else if (path === "/about") {
    return <div>About Route</div>;
  } else if (path === "/posts") {
    return <div>Posts Route</div>;
  } else {
    return <div>404: Not Found</div>;
  }
});
```

And to navigate between your routes use the Link component which is RouterContext aware.

```tsx
// any-route.tsx

import { component$ } from "@builder.io/qwik";
import { Link } from "qwik-router";

export const AnyRoute = component$(() => {
  return (
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/about">About</Link></li>
      <li><Link href="/posts">Posts</Link></li>
    </div>
  )
});
```

# Contributing

Issues and Pull Requests (PRs) are welcome!
