import { ProductCreateForm } from "@/components/product-form";

export default function RegisterPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Create products
        </h1>
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <ProductCreateForm />
      </div>
    </>
  );
}
