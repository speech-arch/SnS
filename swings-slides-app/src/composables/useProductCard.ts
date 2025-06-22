import { computed } from 'vue';

export interface ProductCardOptions {
  formattedPriceFn?: (price: number) => string;
  scrollToMarkerFn?: () => void;
}

export function useProductCard(props: any, emit: any, options: ProductCardOptions = {}) {
  const formattedPrice = computed(() => {
    if (options.formattedPriceFn) {
      return options.formattedPriceFn(props.item.price);
    }
    if (typeof props.item.price === 'number') {
      return `$${props.item.price.toFixed(2)}`;
    }
    return props.item.price;
  });

  const scrollToMarker = options.scrollToMarkerFn || (() => {
    emit('scroll-to-marker', props.item.id);
  });

  return {
    formattedPrice,
    scrollToMarker
  };
}
