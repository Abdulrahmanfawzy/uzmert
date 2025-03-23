"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category";
import { extractDataFromPagination } from "@/utils/extract-data";
import { useSearchParams } from "next/navigation";
import useSettingsStore from "@/global-store/settings";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Paginate } from "@/types/global";
import { Category } from "@/types/category";
import { MegaMenu } from "../mega-menu";
import { Button } from "@/components/button";
import MenuIcon from "@/assets/icons/menu";
import { Translate } from "@/components/translate";

export const CategoriesSwiper = ({ categories }: { categories?: Paginate<Category> }) => {
  const language = useSettingsStore((state) => state.selectedLanguage);
  const searchParams = useSearchParams();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["categories", "sub_main", searchParams.get("category_id"), language?.locale],
    ({ pageParam }) =>
      categoryService.getAll({
        lang: language?.locale,
        type: "main",
        page: pageParam,
        parent_id: searchParams.get("category_id"),
      }),
    {
      getNextPageParam: (lastPage) => lastPage.links.next && lastPage.meta.current_page + 1,
    }
  );
  const categoryList = extractDataFromPagination(data?.pages);
  if (categoryList && categoryList.length === 0) {
    return null;
  }
  const actualCategoryList = isLoading ? categories?.data : categoryList;
  return ( 
 
    <div className="xl:container ps-40 mb-2 parentMega dark:bg-darkBgUi3">
      <MegaMenu 
        container
        button={
          <Button leftIcon={<MenuIcon />} className="px-0 ps-2" size="small" color="black">
            <Translate value="Categories" />
          </Button>
        }/>

      <Swiper 
        className="swip-links"
        slidesPerView="auto"
        spaceBetween={30}
        onReachEnd={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}>
          
        {actualCategoryList?.map((category) => (
          <SwiperSlide key={category.id} className="max-w-max !hidden md:!block">
            <Link
              className="lg:text-base text-sm hover:text-primary transition-all"
              href={`/main?type=categories&category_id=${category.id}`}
            >
              {category.translation?.title}
            </Link>
          </SwiperSlide> 
        ))}
      </Swiper>

    </div>
  );
};
