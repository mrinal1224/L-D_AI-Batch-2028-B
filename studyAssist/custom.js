// Custom tools




import express from "express";
import { llm } from "./04_Langchain.js";
import * as z from "zod"




import {createAgent , tool} from 'langchain'

const app = express();

app.use(express.json());


const products = [
  {
    id: "prod_101",
    title: "Noise-Canceling Wireless Over-Ear Headphones",
    brand: "SoundPulse",
    category: "Electronics",
    price: 149.99,
    currency: "USD",
    rating: 4.6,
    reviewCount: 342,
    inStock: true,
    stockCount: 28,
    imageUrl: "https://example.com/images/headphones-wireless.jpg",
    tags: ["audio", "wireless", "anc", "headphones"]
  },
  {
    id: "prod_102",
    title: "Ceramic Pour-Over Coffee Dripper Set",
    brand: "Hearth & Bean",
    category: "Kitchen & Dining",
    price: 34.50,
    currency: "USD",
    rating: 4.8,
    reviewCount: 189,
    inStock: true,
    stockCount: 64,
    imageUrl: "https://example.com/images/coffee-dripper.jpg",
    tags: ["coffee", "pour-over", "ceramic", "kitchen"]
  },
  {
    id: "prod_103",
    title: "Men's Lightweight Trail Running Shoes",
    brand: "ApexStride",
    category: "Footwear",
    price: 119.00,
    currency: "USD",
    rating: 4.4,
    reviewCount: 512,
    inStock: true,
    stockCount: 19,
    imageUrl: "https://example.com/images/trail-shoes.jpg",
    tags: ["running", "outdoors", "shoes", "athletic"]
  },
  {
    id: "prod_104",
    title: "Ergonomic Aluminum Laptop Stand",
    brand: "DeskCraft",
    category: "Office & Workspace",
    price: 45.00,
    currency: "USD",
    rating: 4.7,
    reviewCount: 276,
    inStock: true,
    stockCount: 83,
    imageUrl: "https://example.com/images/laptop-stand.jpg",
    tags: ["desk", "ergonomic", "laptop", "workspace"]
  },
  {
    id: "prod_105",
    title: "Organic Cotton Waffle Throw Blanket",
    brand: "Loom & Meadow",
    category: "Home & Living",
    price: 58.00,
    currency: "USD",
    rating: 4.9,
    reviewCount: 94,
    inStock: false,
    stockCount: 0,
    imageUrl: "https://example.com/images/waffle-blanket.jpg",
    tags: ["home", "blanket", "cotton", "cozy"]
  },
  {
    id: "prod_106",
    title: "Smart Fitness Tracker Band",
    brand: "PulseTrack",
    category: "Wearables",
    price: 79.99,
    currency: "USD",
    rating: 4.2,
    reviewCount: 630,
    inStock: true,
    stockCount: 47,
    imageUrl: "https://example.com/images/fitness-band.jpg",
    tags: ["fitness", "wearable", "health", "tracker"]
  },
  {
    id: "prod_107",
    title: "Insulated Stainless Steel Water Bottle (32 oz)",
    brand: "HydroPeak",
    category: "Outdoors & Fitness",
    price: 29.95,
    currency: "USD",
    rating: 4.8,
    reviewCount: 815,
    inStock: true,
    stockCount: 120,
    imageUrl: "https://example.com/images/water-bottle.jpg",
    tags: ["hydration", "insulated", "stainless-steel", "gym"]
  },
  {
    id: "prod_108",
    title: "Mechanical TKL Gaming Keyboard (Brown Switches)",
    brand: "KeyForge",
    category: "Electronics",
    price: 109.99,
    currency: "USD",
    rating: 4.7,
    reviewCount: 408,
    inStock: true,
    stockCount: 35,
    imageUrl: "https://example.com/images/mechanical-keyboard.jpg",
    tags: ["keyboard", "mechanical", "gaming", "typing"]
  },
  {
    id: "prod_109",
    title: "Hydrating Hyaluronic Acid & Niacinamide Serum",
    brand: "DermaPure",
    category: "Beauty & Skincare",
    price: 24.00,
    currency: "USD",
    rating: 4.5,
    reviewCount: 221,
    inStock: true,
    stockCount: 52,
    imageUrl: "https://example.com/images/skincare-serum.jpg",
    tags: ["skincare", "serum", "hydration", "beauty"]
  },
  {
    id: "prod_110",
    title: "Waterproof Roll-Top Commuter Backpack (22L)",
    brand: "UrbanTrek",
    category: "Bags & Luggage",
    price: 89.50,
    currency: "USD",
    rating: 4.6,
    reviewCount: 163,
    inStock: true,
    stockCount: 14,
    imageUrl: "https://example.com/images/commuter-backpack.jpg",
    tags: ["backpack", "commute", "waterproof", "travel"]
  }
];


 function searchProduct(productName) {
  const product = products.find(
    (p) => p.name.toLowerCase() === productName.trim().toLowerCase()
  );

  return product || { error: "Product not found" };
}

const productTool = tool(
  async ({ productName }) => {

    console.log("Custom Tool Called:", productName);

    const result = searchProduct(productName);

    return JSON.stringify(result);
  },
  {
    name: "search_product",

    description: `
      Search for a product in our store.
      Returns its price and available stock.
      All prices are in USD.
    `,

    schema: z.object({
      productName: z.string().describe("Name of the product"),
    }),
  }
);



const agent = createAgent({
    model : llm,
    tools : [productTool]
});



// STEP 1 — Create the same endpoint.
app.post("/chat", async (req, res) => {
  const { prompt } = req.body ?? {};

  // STEP 2 — Validate user input.
  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({
      error: "A non-empty prompt is required",
    });
  }

  try {
    // STEP 3 — Call Gemini through LangChain.
    const result = await agent.invoke({
      messages : [
        {
          role : 'user',
          content: prompt
        }
      ]

    });

    // STEP 4 — Extract generated text.
    const response = result.messages.at(-1).content

    // STEP 5 — Return the same JSON contract.
    return res.json({
      response
    });

  
  } catch (error) {
    console.error("LangChain call failed:", error);

    return res.status(502).json({
      error: "AI service failed",
    });
  }
});

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`LangChain chatbot running on port ${PORT}`);
});