import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAllProducts } from "@/lib/getAllProducts";
import { formatCurrency } from "@/lib/formatCurrecny";
import { handleCheckout } from "@/lib/handleCheckout";
import { useContext, useState, useEffect } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import supabase from "@/lib/supabase";

interface ProductPageProps {
  product: {
    id: string;
    name: string;
    image: string;
    priceId: string;
    price: {
      amount: number;
      currency: string;
      recurring: string | null;
    };
    features: string[];
  };
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {

  const [interval, setInterval] = useState<string | null>(null);
  const { userInfo } = useContext(UserInfoContext);

  const onCheckout = () => {
    if (!userInfo) {
      alert("Please log in to continue.");
      return;
    }

    handleCheckout({
      priceId: product.priceId,
      userId: userInfo.id!,
      email: userInfo.email!,
    });
  };

  useEffect(() => {
    const fetchInterval = async () => {
      if (!userInfo) return;

      const { data } = await supabase
        .from("profile")
        .select("interval")
        .eq("id", userInfo.id)
        .single();
      
        setInterval(data?.interval ?? null);
    }
    fetchInterval();
  },[]) 

  return (
    <div className="max-w-4xl mx-auto p-6 text-blue-500">
      <div className="border border-gray-200 rounded-lg shadow p-6 bg-white text-center">
        <img src={product.image} alt={product.name} className="h-24 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-3xl font-semibold mb-2">
          {formatCurrency(product.price.amount, product.price.currency)}
        </p>
        <p className="mb-6">
          {product.price.recurring ? `per ${product.price.recurring}` : "One-time payment"}
        </p>

        <ul className="text-left mb-6">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start mb-2">
              <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <button
          disabled={interval !== null}
          onClick={onCheckout}
          className={`px-6 py-3 rounded ${interval === null ? "text-white bg-blue-400 hover:bg-blue-200" : "text-gray-400 bg-gray-200 cursor-not-allowed"}`}
        >
          {interval === null ? "Purchase" : "Already have access"}
        </button>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();

   const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await getAllProducts();
  const product = products.find((p) => p.id === context.params?.id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
    revalidate: 6000,
  };
};

export default ProductPage;
