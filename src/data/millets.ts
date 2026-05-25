import ragiImg from "@/assets/ragi.jpg";
import jowarImg from "@/assets/jowar.jpg";
import bajraImg from "@/assets/bajra.jpg";
import foxtailImg from "@/assets/foxtail.jpg";
import littleMilletImg from "@/assets/little-millet.jpg";
import kodoImg from "@/assets/kodo.jpg";

export interface MilletDetail {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  benefits: string[];
  longDescription: string;
  nutritionPer100g: { label: string; value: string }[];
  howToUse: string[];
  history: string;
}

export const millets: MilletDetail[] = [
  {
    id: "ragi",
    name: "Ragi",
    subtitle: "Finger Millet",
    image: ragiImg,
    description: "Rich in calcium & iron, perfect for bone health",
    benefits: ["Strengthens bones", "Controls diabetes", "Aids weight loss"],
    longDescription: "Ragi (Eleusine coracana), also known as Finger Millet, is one of the oldest cultivated grains in India, dating back over 4,000 years. It is the richest source of calcium among all cereals, making it essential for bone health. Ragi is a staple in South Indian cuisine, used in porridge (ragi mudde), dosa, and roti. Its high fiber content helps control blood sugar levels, making it ideal for diabetics. The amino acid methionine in ragi makes it invaluable for vegetarian diets.",
    nutritionPer100g: [
      { label: "Calories", value: "328 kcal" },
      { label: "Protein", value: "7.3 g" },
      { label: "Calcium", value: "344 mg" },
      { label: "Iron", value: "3.9 mg" },
      { label: "Fiber", value: "11.5 g" },
      { label: "Carbs", value: "72 g" },
    ],
    howToUse: ["Ragi Mudde (balls)", "Ragi Dosa", "Ragi Porridge", "Ragi Cookies", "Ragi Malt Drink"],
    history: "Ragi has been cultivated in the highlands of East Africa and India for thousands of years. It was a staple food of the Indus Valley civilization and remains central to the cuisine of Karnataka, Tamil Nadu, and Andhra Pradesh.",
  },
  {
    id: "jowar",
    name: "Jowar",
    subtitle: "Sorghum",
    image: jowarImg,
    description: "Gluten-free powerhouse with antioxidants",
    benefits: ["Gluten-free", "Rich in antioxidants", "Heart-healthy"],
    longDescription: "Jowar (Sorghum bicolor) is the fifth most important cereal crop globally and a powerhouse of nutrition. Being naturally gluten-free, it's an excellent choice for those with celiac disease or gluten sensitivity. Jowar is rich in antioxidants called 3-Deoxyanthoxyanins, which have shown anti-cancer properties. It contains high levels of policosanols that help lower cholesterol, promoting cardiovascular health.",
    nutritionPer100g: [
      { label: "Calories", value: "329 kcal" },
      { label: "Protein", value: "10.4 g" },
      { label: "Calcium", value: "25 mg" },
      { label: "Iron", value: "4.1 mg" },
      { label: "Fiber", value: "6.7 g" },
      { label: "Carbs", value: "72.6 g" },
    ],
    howToUse: ["Jowar Roti / Bhakri", "Jowar Upma", "Jowar Puffs", "Jowar Porridge", "Jowar Flour Dosa"],
    history: "Jowar originated in Africa around 8,000 years ago and spread to India through trade routes. It's now the primary food grain in Maharashtra and parts of Karnataka.",
  },
  {
    id: "bajra",
    name: "Bajra",
    subtitle: "Pearl Millet",
    image: bajraImg,
    description: "Iron-rich millet, combats anemia naturally",
    benefits: ["Combats anemia", "Rich in zinc", "Boosts immunity"],
    longDescription: "Bajra (Pennisetum glaucum) or Pearl Millet is the most widely grown millet in India and the sixth most important cereal globally. It has the highest iron content among all millets, making it a natural remedy for anemia. Bajra is rich in zinc, magnesium, and B-vitamins. It generates heat in the body, making it traditionally consumed during winters in Rajasthan and Gujarat as bajra roti with ghee.",
    nutritionPer100g: [
      { label: "Calories", value: "361 kcal" },
      { label: "Protein", value: "11.6 g" },
      { label: "Calcium", value: "42 mg" },
      { label: "Iron", value: "8.0 mg" },
      { label: "Fiber", value: "1.2 g" },
      { label: "Carbs", value: "67.5 g" },
    ],
    howToUse: ["Bajra Roti", "Bajra Khichdi", "Bajra Porridge", "Bajra Ladoo", "Bajra Puff Snacks"],
    history: "Bajra was domesticated in the Sahel region of West Africa about 5,000 years ago. It arrived in India roughly 3,000 years ago and became the primary crop in arid regions of Rajasthan, Gujarat, and Haryana.",
  },
  {
    id: "foxtail",
    name: "Foxtail Millet",
    subtitle: "Kangni / Kakum",
    image: foxtailImg,
    description: "Low GI superfood, ideal for diabetics",
    benefits: ["Diabetes-friendly", "Strengthens immunity", "Rich in minerals"],
    longDescription: "Foxtail Millet (Setaria italica) is one of the oldest cultivated millets, particularly important in Asian cuisine. It has a very low Glycemic Index (GI), making it the ideal grain for people with Type 2 diabetes. Rich in iron and calcium, foxtail millet supports blood formation and bone health.",
    nutritionPer100g: [
      { label: "Calories", value: "331 kcal" },
      { label: "Protein", value: "12.3 g" },
      { label: "Calcium", value: "31 mg" },
      { label: "Iron", value: "2.8 mg" },
      { label: "Fiber", value: "8.0 g" },
      { label: "Carbs", value: "60.9 g" },
    ],
    howToUse: ["Foxtail Millet Rice", "Foxtail Upma", "Foxtail Kheer", "Foxtail Pulao", "Foxtail Pongal"],
    history: "Foxtail millet was domesticated in northern China around 8,000 years ago, making it one of the oldest cultivated crops in the world.",
  },
  {
    id: "little",
    name: "Little Millet",
    subtitle: "Kutki / Samai",
    image: littleMilletImg,
    description: "Fiber-rich & easy to digest",
    benefits: ["High in fiber", "Easy to digest", "Rich in B vitamins"],
    longDescription: "Little Millet (Panicum sumatrense) is a small-grained millet prized for its high fiber content and easy digestibility. It's an excellent source of B-complex vitamins, essential for metabolism and energy production.",
    nutritionPer100g: [
      { label: "Calories", value: "329 kcal" },
      { label: "Protein", value: "7.7 g" },
      { label: "Calcium", value: "17 mg" },
      { label: "Iron", value: "9.3 mg" },
      { label: "Fiber", value: "7.6 g" },
      { label: "Carbs", value: "67 g" },
    ],
    howToUse: ["Little Millet Rice", "Little Millet Upma", "Little Millet Pongal", "Little Millet Khichdi", "Little Millet Biryani"],
    history: "Little Millet is indigenous to the Indian subcontinent and has been cultivated since antiquity.",
  },
  {
    id: "kodo",
    name: "Kodo Millet",
    subtitle: "Kodra / Varagu",
    image: kodoImg,
    description: "Antioxidant-rich ancient grain",
    benefits: ["High antioxidants", "Diabetes management", "Weight management"],
    longDescription: "Kodo Millet (Paspalum scrobiculatum) is renowned for its exceptionally high antioxidant content, surpassing many other millets. It has a very high fiber-to-carbohydrate ratio, making it excellent for weight management and diabetes control.",
    nutritionPer100g: [
      { label: "Calories", value: "309 kcal" },
      { label: "Protein", value: "8.3 g" },
      { label: "Calcium", value: "27 mg" },
      { label: "Iron", value: "0.5 mg" },
      { label: "Fiber", value: "9.0 g" },
      { label: "Carbs", value: "65.9 g" },
    ],
    howToUse: ["Kodo Millet Rice", "Kodo Millet Pulao", "Kodo Payasam", "Kodo Millet Upma", "Kodo Millet Idli"],
    history: "Kodo Millet was domesticated in India approximately 3,000 years ago. It is one of the most drought-resistant crops known.",
  },
];
