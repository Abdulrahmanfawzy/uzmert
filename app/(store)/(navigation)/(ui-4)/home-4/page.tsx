import fetcher from "@/lib/fetcher";
import { Paginate } from "@/types/global";
import { Banner } from "@/types/banner";
import { buildUrlQueryParams } from "@/utils/build-url-query-params";
import { cookies } from "next/headers";
import { SlidableProductList } from "@/app/(store)/components/slidable-product-list";
import dynamic from "next/dynamic";
import React from "react";
import img1 from "../../../../../assets/img/img1.webp";
import img2 from "../../../../../assets/img/img2.webp";
import img3 from "../../../../../assets/img/img3.webp";
import { Banners } from "./components/banners";
import { ProductList } from "./components/products-list-with-looks";
import { Categories } from "./components/categories";
import Image from "next/image";

const BrandList = dynamic(() => import("./components/brand-list"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-12 justify-between overflow-x-hidden">
      {Array.from(Array(6).keys()).map((item) => (
        <div key={item} className="bg-gray-300 w-28 h-24 rounded-xl" />
      ))}
    </div>
  ),
});

const Ads = dynamic(() =>
  import("./components/ads").then((component) => ({ default: component.Ads }))
);

const NewProductsList = dynamic(() =>
  import("./components/new-products-list").then((component) => ({ default: component.NewProducts }))
);

const SearchField = dynamic(() =>
  import("@/components/search-field").then((component) => ({ default: component.SearchField }))
);

const HomeUi3 = async () => {
  const lang = cookies().get("lang")?.value;
  const currencyId = cookies().get("currency_id")?.value;
  const countryId = cookies().get("country_id")?.value;
  const cityId = cookies().get("city_id")?.value;
  const banners = await fetcher<Paginate<Banner>>(
    buildUrlQueryParams("v1/rest/banners/paginate", { lang }),
    {
      cache: "no-cache",
    }
  );

  return (
    <section className="">
      <div className="md:hidden">
        <SearchField visibleOnMobile withButton rounded={false} isInHeader={false} />
      </div>
      <Banners banners={banners} />

      <div className="px-4 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <Image src={img1} alt="Description" className="w-full h-auto lg:h-36 rounded-md" />
        </div>
        <div>
          <Image src={img3} alt="Description" className="w-full h-auto lg:h-36 rounded-md" />
        </div>
        <div>
          <Image src={img2} alt="Description" className="w-full h-auto lg:h-36 rounded-md" />
        </div>
      </div> 


      </div>

      {/* <div className="md:hidden">
        <SearchField visibleOnMobile withButton rounded={false} isInHeader={false} />
      </div> */}
      <div className="px-4 lg:px-20 md:py-7 py-4 rounded-lg">
        <SlidableProductList
          title="Recommended For You"
          link="/products"
          visibleListCount={5}
          roundedColors
          productVariant="6"
          params={{
            column: "od_count",
            sort: "desc",
            lang,
            currency_id: currencyId,
            country_id: countryId,
            city_id: cityId,
          }}
        />
      </div>
      <Categories />
      <Ads />
      <NewProductsList />
      <BrandList />
      <ProductList canFetchNextPage initialPage={1} />
    </section>
  );
};

export default HomeUi3;
