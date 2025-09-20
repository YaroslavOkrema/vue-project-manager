import { Store } from "vuex";
import { RootState } from "@/store/types";

export function localStoragePlugin(store: Store<RootState>) {
  const savedState = localStorage.getItem("vuex");
  if (savedState) {
    store.replaceState({
      ...store.state,
      ...JSON.parse(savedState),
    });
  }

  store.subscribe((_mutation, state) => {
    localStorage.setItem("vuex", JSON.stringify(state));
  });
}
