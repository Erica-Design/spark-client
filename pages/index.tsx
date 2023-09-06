import type { NextPage } from "next";
import useMobile from "@hooks/useMobile";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getCategory from "@services/category/get/getCategory";
import getPosting from "@services/posting/get/getPosting";
import getBestPosting from "@services/posting/get/getBestPosting";
import MobileMainPage from "@components/mobile";
import { Post } from "@utils/types";

const Home: NextPage = () => {
  const isMobile = useMobile();
  const router = useRouter();
  const [choices, setChoices] = useState<string[]>([]);

  // hooks
  // useEffect(() => {
  //     const hasVisitedOnBoarding = localStorage.getItem('visitedOnBoarding');
  //
  //     if (!hasVisitedOnBoarding) {
  //         // 사용자가 onBoarding 페이지를 방문하지 않았다면, onBoarding 페이지로 이동
  //         router.push('/onBoarding');
  //     }
  // }, [router]);

  // functions
  const handleChoices = (category: string) => {
    if (choices.includes(category)) {
      setChoices(choices.filter((c) => c !== category));
    } else {
      setChoices([...choices, category]);
    }
  };

  // API requests
  const { isLoading: categoryLoading, data: categories } = useQuery<
    string[],
    Error,
    string[]
  >({
    queryFn: () => getCategory(),
    queryKey: ["category"],
  });

  const { isLoading: postsLoading, data: posts } = useQuery<
    Post[],
    Error,
    Post[]
  >({
    queryKey: ["main", "posts"],
    queryFn: () => getPosting(choices),
    select: (posts) => {
      if (choices.length === 0) return posts;
      return posts.filter((post) =>
        post.categories.some((category) => choices.includes(category)),
      );
    },
  });

  const { isLoading: bestPostLoading, data: sparkPosts } = useQuery<
    Post[],
    Error,
    Post[]
  >({
    queryFn: getBestPosting,
    queryKey: ["spark", "posts"],
  });

  if (categoryLoading || postsLoading || bestPostLoading)
    return <div>Loading...</div>;

  if (isMobile)
    return (
      <MobileMainPage
        posts={posts}
        categories={categories}
        sparkPosts={sparkPosts}
        choices={choices}
        handleChoices={handleChoices}
      />
    );
  // return (
  //     <DesktopMainPage posts={posts} categories={categories} sparkPosts={sparkPosts} choices={choices}
  //                      handleChoices={handleChoices}/>
  // );
};

export default Home;
