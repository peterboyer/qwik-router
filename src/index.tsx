import {
  useStore,
  component$,
  Host,
  Slot,
  createContext,
  useContextProvider,
  useContext,
} from "@builder.io/qwik";

export interface RouterContext {
  path: string;
}

export const RouterContext = createContext<RouterContext>("router");

export const Router = component$(() => {
  const context = useStore<RouterContext>({
    path: window.location.pathname,
  });
  useContextProvider(RouterContext, context);
  return (
    <Host>
      <Slot />
    </Host>
  );
});

export const useRouterContext = (): RouterContext => {
  const context = useContext(RouterContext);
  return context;
};

export const Link = component$(
  (props: { to: string }) => {
    const context = useRouterContext();
    return (
      <Host
        {...// prettier-ignore
        {} /*
          // @ts-expect-error qwik: Host doesn't support generic type parameter for HTMLAnchorElement instead. */}
        href={props.to}
        preventdefault:click
        onClick$={(event) => {
          let href: string | undefined = undefined;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const path = (event as any).path as (
            | HTMLElement
            | HTMLAnchorElement
          )[];
          for (const element of path) {
            if ("href" in element) {
              href = element.href;
              break;
            }
          }
          if (!href) {
            throw new TypeError(
              'NO_HREF: Unable to find ancestor <a> with "href" property.'
            );
          }
          const url = new URL(href);
          context.path = url.pathname;
          window.history.pushState({}, "", url.toString());
        }}
      >
        <Slot />
      </Host>
    );
  },
  {
    tagName: "a",
  }
);

export const useRouterPath = (): string => {
  const context = useContext(RouterContext);
  return context.path;
};
