<script setup>
  import { defineProps } from "vue";
  import OverflowTooltip from "@/components/OverflowTooltip/OverflowTooltip.vue";

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <div class="product-card" @click="$emit('click', product)">
    <div class="product-image">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="product-info">
      <h3>{{ product.title }}</h3>
      <p class="product-category">{{ product.category }}</p>

      <OverflowTooltip :text="product.description" />

      <div class="product-price">¥{{ product.price }}</div>
    </div>
  </div>
</template>

<style scoped>
  .product-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .product-image {
    width: 100%;
    height: 240px;
    overflow: hidden;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .product-card:hover .product-image img {
    transform: scale(1.05);
  }

  .product-info {
    padding: 15px;
  }

  .product-info h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .product-category {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }

  .product-price {
    font-size: 20px;
    color: #ff4d4f;
    font-weight: bold;
  }
</style>
