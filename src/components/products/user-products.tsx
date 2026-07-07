'use client';
import Link from "next/link";

import { useActionState, useState, useEffect, useRef } from "react";
import { addToCart } from "@/actions/cart";
import { type ActionState } from "@/actions/cart";
import DetailProduct from "@/components/products/detailproduct";
import { MessageSquareText, HeartPlus, Search } from "lucide-react";
import ProductDropdown from "../productdropdown";
import AmountSlider from "../slider";
import { ProductCard } from "./cardshopimage";
import Pagination from "../pagination";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { searchProducts, SearchState } from "@/actions/products";
import { useDebouncedCallback } from "use-debounce";


// 1. Define the shape of a single product
type Product = {
  id: string;
  name: string;
  property: string;
  utility: string | null;
  price: number;
};

// 2. Define the props object structure
interface ProductListProps {
  products: Product[];
}

const initialstate: ActionState = {
  success: false,
  message: ""
}

const initialDetailState : Product={
    id: "",
    name: "",
    property: "",
    utility: null,
    price: 0
}
const addToCartAction = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const result = await addToCart(prevState, formData);
  return result ?? prevState;
};

const initialSearchState : SearchState = {
  results: [],
  currentPage: 1,
  totalPages: 1,
}  

export default function UserProductsPage({ products }: ProductListProps) {

  const [state, formAction, ispending] = useActionState(addToCartAction, initialstate);
  const [detail, setDetail] = useState<Product>(initialDetailState);
  const [option, setOption] = useState("");
  const [value, setValue] = useState(500);  

  const handleSelectProduct = (product: Product) => {
    setDetail({
      id: product.id,
      name: product.name,
      property: product.property,
      utility: product.utility,
      price: product.price,
    });
  };
  
  const handleDropDownChange = (type:string) => {
    setOption(type);
    if(type==="All"){
      setOption("");
    }
  }

  const handlePriceChange = (value: number) => {
    setValue(value)
  }
  
  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const [ searchedItems, searchProductsAction, isPending] = useActionState(searchProducts, initialSearchState);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const formRef = useRef<HTMLFormElement>(null);

  const debouncedSubmit = useDebouncedCallback(() => {
    setPage(1);
    if(formRef.current){
      formRef.current.requestSubmit();
    }
  }, 300)

  useEffect(() => {
    if(formRef.current){
      formRef.current.requestSubmit();
    }
  }, [page]);

  const optionSearchProducts =  searchedItems.results.filter((product) => product.property.toLowerCase().includes(option.toLowerCase()));

  const maxPriceProducts =  optionSearchProducts.filter((product) => product.price < value);


  // console.log(searchedItems.results);
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Products list
        </h1>
          {searchedItems.results &&
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {searchedItems.results.length} registered {maxPriceProducts.length === 1 ? "product" : "products"}
            </p>
          }
      </div>
      <div className="flex gap-3">
        <div className="flex border border-gray-200 p-2 rounded-lg max-w-[250px] hover:border-green-500">
          <Search className="w-4 h-4 mt-1 mr-1 text-gray-500"/>
          <form ref={formRef} action={searchProductsAction}>
            <input type="hidden" name="page" value={page} />
            <input
              name="search"
              type="text"
              placeholder="Search Product Names  ..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); debouncedSubmit()}}
              className="focus-visible focus:outline-none"
            />
          </form>
          {/* <input
              type="text"
              placeholder="Search Product Names  ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="focus-visible focus:outline-none"
            /> */}
        </div>
        <div className="flex max-w-[250px]">
          <ProductDropdown onSelectProduct={handleDropDownChange} />
        </div>
        <div className="flex max-w-[500px]">
          <AmountSlider onChange={handlePriceChange}/>
        </div>
        <div className="flex gap-3">
          {searchedItems.results.length > 0 && (
            <>
            <div className="flex justify-center items-center">Product NO: {searchedItems.currentPage} of {searchedItems.totalPages}</div>
              <div>
                <button 
                  className={`w-full flex justify-between items-center px-4 py-3 bg-white border p-2 rounded-lg border-gray-300 rounded-md text-[15px] text-left cursor-pointer transition-all duration-200 outline-non ${page ===1 ? 'cursor-not-allowed text-gray-500' : 'hover:border-green-500'}`}
                  onClick={() => setPage((prev) => prev-1)}
                  disabled={searchedItems.currentPage <= 1 || isPending}
                  type="button"
                  >
                  <ChevronLeft className="w-5 h-5 text-gray-700"/>
                </button>
              </div>
              {/* <div>
                <Pagination onChange={handlePageChange}/>
              </div> */}
              <div>
                <button 
                  className={`w-full flex justify-between items-center px-4 py-3 bg-white border p-2 rounded-lg border-gray-300 rounded-md text-[15px] text-left cursor-pointer transition-all duration-200 outline-non ${page ===5 ? 'cursor-not-allowed text-gray-500' : 'hover:border-green-500'}`}
                  onClick={() => setPage(page+1)}
                  disabled={page === 5}
                  type="button"
                  >
                  <ChevronRight className="w-5 h-5"/>
                </button>
              </div>
            </>
        )}
      </div>
      </div>
      <div className="mt-8 z-50"> 
        {detail.utility ? ( 
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setDetail(initialDetailState)}>
            <div className="relative z-50 w-full max-w-[900px] max-h-[600px]" onClick={(e) => e.stopPropagation()}>
              <DetailProduct detail={detail} /> 
            </div>
          </div>
        ) : null} 
      </div>
      <div className="rounded-xl bg-white shadow-sm dark:bg-white/5">
        <div className="grid lg:grid-cols-5 space-y-5 gap-10 md:grid-cols-3">
          {maxPriceProducts.map((product) => (
              <article
                key={product.id}
                className="w-[250px] flex flex-row items-stretch overflow-hidden border border-black/10 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-3 hover:shadow-md lg:flex-col"
              >
                <button type="button" onClick={() => handleSelectProduct(product)} key={product.id}>
                <div className="relative min-w-0 max-lg:w-[40%] max-lg:max-w-[11.5rem] max-lg:shrink-0 max-lg:aspect-[7/11] max-lg:overflow-hidden lg:max-w-none lg:aspect-[16/11]">
                    {/* <ProductCard fileId={product.id} /> */}
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
                  <div>
                    <p className="pl-5 font-spartan text-2xl font-bold text-blue-600">
                      ${product.price}
                    </p>
                    <p className="pl-5 text-md text-neutral-500">
                      ·{product.property}
                    </p>
                  </div>
                  <h3 className="pl-5 truncate text-2xl font-bold leading-snug text-onyx">
                      {product.name}
                  </h3>
                  <div className="pl-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600 h-[50px] overflow-hidden">
                    <span className="inline-flex items-center gap-1">
                      {product.utility}
                    </span>
                  </div>
                </div>
                </button>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
                  <div className="flex justify-center items-center gap-3">
                    <Link
                      href={`products/comment/${product.id}`}
                      className="flex items-center rounded-md bg-gray-900 px-2 py-1 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                      <MessageSquareText className="w-4 h-4 mr-1" />
                      comment
                    </Link>
                    <form action={formAction} >
                      <input type="hidden" name="productId" value={product.id}/>
                      <button
                      type="submit"
                      disabled={ispending}
                      className="flex items-center rounded-md bg-gray-900 px-2 py-1 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                      >
                      <HeartPlus className="w-4 h-4 mr-1" />
                      favourite
                      </button>
                    </form>
                  </div>
                </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
