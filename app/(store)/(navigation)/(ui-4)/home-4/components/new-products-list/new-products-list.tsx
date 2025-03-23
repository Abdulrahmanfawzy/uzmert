"use client";

import useSettingsStore from "@/global-store/settings";
import useAddressStore from "@/global-store/address";
import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services/product";
import clsx from "clsx";
import { ProductCard } from "@/components/product-card";
import React from "react";
import { extractDataFromPagination } from "@/utils/extract-data";
import { ListHeader } from "@/components/list-header/list-header";
import { useTranslation } from "react-i18next";
import { ProductCardUi7Loading } from "@/components/product-card/product-card-ui-7";
import { SlidableProductList } from "@/app/(store)/components/slidable-product-list";
import img1 from "../../../../../../../assets/img/plus.svg";
import imgPre from "../../../../../../../assets/img/pre.png";
import task from "../../../../../../../assets/img/task.png";
import discover from "../../../../../../../assets/img/discover.png";
import Image from "next/image";
import { Categories } from "../categories";
import Link from "next/link";


export const NewProducts = () => {
  const language = useSettingsStore((state) => state.selectedLanguage);
  const currency = useSettingsStore((state) => state.selectedCurrency);
  const country = useAddressStore((state) => state.country);
  const city = useAddressStore((state) => state.city);
  const { t } = useTranslation();
  const params = {
    lang: language?.locale,
    currency_id: currency?.id,
    country_id: country?.id,
    region_id: country?.region_id,
    city_id: city?.id,
    column: "id",
    sort: "desc",
  };

  const { data: products, isLoading } = useInfiniteQuery(
    ["products", params],
    ({ pageParam = 1 }) =>
      productService.getAll({
        ...params,
        page: pageParam,
        perPage: 9,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.links.next && lastPage.meta.current_page + 1,
    }
  );

  const productList = extractDataFromPagination(products?.pages);

  return (
    <div className="lg:mb-7 mb-4">
      <div className="md:py-7 py-4 rounded-lg">

        <div className="md:py-7 py-4 px-4 lg:px-20 rounded-lg">
                <SlidableProductList
                  title="Best Selling Games"
                  link="/products"
                  visibleListCount={5}
                  roundedColors
                  productVariant="6"
                  // params={{
                  //   column: "od_count",
                  //   sort: "desc",
                  //   lang,
                  //   currency_id: currencyId,
                  //   country_id: countryId,
                  //   city_id: cityId,
                  // }}
                />
        </div>

        <div className="relative mb-10">
          <Image src={task || ""} className="w-full" alt="task image" />
          <div className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="hidden lg:block">
                <h2 className="text-3xl font-bold capitalize">Best deals of the week</h2>
                <section className="text-gray-400 my-3 mb-7">
                  Do not miss the best offer of the week. Great discounts, nice prices and nice bonuses
                </section>
              </div>
              <Link href="/products" className="bg-[#4AD847] px-7 py-3">
                See All Products
              </Link>
          </div>
        </div>

        <div className="my-5 overflow-hidden flex flex-wrap relative bg-[#171717]">
          <div className="absolute -top-16">
            <Image 
              src={img1 || ""}
              alt="plus image"
              width={250}
            />
          </div>
          <div className="w-full lg:w-1/2 px-4 lg:px-20 lg:py-28 py-28">
              <h2 className="text-4xl font-extrabold">Get extra discounts with <br /> Univert <span className="text-[#9C60EA]">Plus</span></h2>
              <a className="bg-[#9C60EA] py-3 px-10 rounded-md mt-5 inline-block" href="#">Join Now</a>
          </div>
          <div className="w-full lg:w-1/2 px-4 lg:px-20 lg:py-28 py-28 bg-gradient-to-r from-[#802CEC] to-[#A866FB]">
              <h2 className="text-4xl font-extrabold">Perks of Univert Plus</h2>
              <div className="font-bold mt-5 mb-1">
                <i className="fa-solid fa-check text-[#fff] me-2 rounded-full"></i> Up to 10% OFF on Games, Gift Cards, DLCs and more
              </div>
              <div className="font-bold mb-1">
                <i className="fa-solid fa-check text-[#fff] me-2 rounded-full"></i> Access to exclusive sale events and promotions
              </div>
              <div className="font-bold mb-1">
                <i className="fa-solid fa-check text-[#fff] me-2 rounded-full"></i> Priority pre-order fulfillment
              </div>
              <div className="font-bold mb-1">
                <i className="fa-solid fa-check text-[#fff] me-2 rounded-full"></i> Priority support
              </div>
          </div>
        </div>

        <div className="md:py-7 py-4 px-4 lg:px-20 rounded-lg">
                <SlidableProductList
                  title="Best Selling Gift Cards"
                  link="/products"
                  visibleListCount={5}
                  roundedColors
                  productVariant="6"
                  // params={{
                  //   column: "od_count",
                  //   sort: "desc",
                  //   lang,
                  //   currency_id: currencyId,
                  //   country_id: countryId,
                  //   city_id: cityId,
                  // }}
                />

        </div>
        
        <Categories />

        <div className="my-5">
          <Image src={discover} alt="discover image" />
        </div>
      
        <div className="md:py-7 py-4 px-4 lg:px-20 rounded-lg">
                <SlidableProductList
                  title="Best Selling Gamepoints"
                  link="/products"
                  visibleListCount={5}
                  roundedColors
                  productVariant="6"
                  // params={{
                  //   column: "od_count",
                  //   sort: "desc",
                  //   lang,
                  //   currency_id: currencyId,
                  //   country_id: countryId,
                  //   city_id: cityId,
                  // }}
                />

        </div>

      </div>


      <div className="px-4 lg:px-20 flex flex-wrap items-center py-16 bg-[#131B25]">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-extrabold">
              Subscribe to our newsletter and get updates on best deals!
            </h2>
            
            <div className="flex mt-5 gap-2">
              <input type="text" className="bg-white rounded-md w-full py-2 px-3" placeholder="Enter your email"/>
              <button className="bg-[#4885FF] cursor-pointer rounded-md text-white px-5 py-3">Subscribe</button>
            </div>
            <p className="text-[#8F8F8F] text-sm mt-3">
               By subscribing, you agree to receive commercial communications from driffle.com via email, including personalized updates about products and services offered on the Driffle Marketplace.
            </p>
          </div>

          <div className="w-full lg:w-1/2 text-center"> 
            <Image src={imgPre} className="mx-auto w-full lg:w-1/2" alt="pre image"/> 
          </div>

      </div>

    </div>
  );
};
