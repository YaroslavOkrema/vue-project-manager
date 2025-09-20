import { ref, Ref, watch } from "vue";

export function useDraggable<T>(source: Ref<T[]>) {
  const draggable = ref<T[]>([...source.value]);

  watch(source, (newVal) => {
    draggable.value = [...newVal];
  });

  return draggable;
}
