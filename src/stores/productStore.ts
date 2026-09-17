import { defineStore } from 'pinia';

interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
}

export const useProductListStore = defineStore('productList', {
  state: () => ({
    products: [] as Product[],
    selectedProduct: null as Product | null,
  }),

  getters: {
    getProducts(state): Product[] {
      return state.products;
    },
    getSelectedProduct(state): Product | null {
      return state.selectedProduct;
    },
    productCount(state): number {
      return state.products.length;
    },
    getProductById(state): (id: string) => Product | undefined {
      return (id: string) => state.products.find(p => p.id === id);
    },
  },

  actions: {
    setProducts(productArray: Product[]) {
      if (Array.isArray(productArray)) {
        this.products = productArray;
      } else {
        this.products = [];
      }
      console.log("設定商品列表：", this.products);
    },

    addProduct(product: Product) {
      this.products.push(product);
      console.log("新增商品：", product);
    },

    updateProduct(productId: string, updatedFields: Partial<Product>) {
      const index = this.products.findIndex(p => p.id === productId);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedFields };
        console.log("更新商品：", this.products[index]);
      }
    },

    removeProductById(productId: string) {
      this.products = this.products.filter(p => p.id !== productId);
      console.log("移除商品 ID：", productId);
    },

    clearProducts() {
      this.products = [];
      console.log("商品清單已清空");
    },

    selectProduct(product: Product | null) {
      this.selectedProduct = product;
      console.log("選擇商品：", product);
    },

    clearSelectedProduct() {
      this.selectedProduct = null;
      console.log("清除選擇的商品");
    },

    /**
     * 開發測試用：設定一組假商品清單
     */
    setFakeProducts() {
      const fakeProducts: Product[] = [
        {
          id: '1',
          name: '假商品 A',
          description: '這是商品 A 的描述',
          fullDescription: '商品 A 摘要',
          image1: 'https://via.placeholder.com/150?text=A1',
          image2: '',
          image3: '',
          image4: '',
          image5: '',
        },
        {
          id: '2',
          name: '假商品 B',
          description: '這是商品 B 的描述',
          fullDescription: '商品 B 摘要',
          image1: 'https://via.placeholder.com/150?text=B1',
          image2: '',
          image3: '',
          image4: '',
          image5: '',
        },
      ];
      this.setProducts(fakeProducts);
      console.log("已設定假商品清單");
    },
  },
});
