const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
});

export default async function handler(req, res) {
  const responseData = {
    success: false,
    products: [],
  };
  
  try {
    const { data } = await api.get("products", {
      per_page: 50,
    });

    responseData.success = true;
    responseData.products = data;
    res.json(responseData);
    console.log(responseData.products[0].slug);
  } catch (error) {
    responseData.error = error.message;
    res.status(500).json(responseData);
  }
}